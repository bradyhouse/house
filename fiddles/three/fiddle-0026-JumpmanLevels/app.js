// fiddle-0026-JumpmanLevels — a 2.5D three.js Jumpman that plays FIVE real boards
// decoded straight from the public-domain level-editor sources (level01..05).
// Forked from fiddle-0025-Jumpman: same faithful mechanics (fixed-arc jump, rope
// climb, bomb collection) but now with authentic level data, ladders rendered as
// actual ladders (rails + rungs, distinct from ropes), per-board camera framing,
// scoring + bonus, lives, death, and level-to-level progression through all five.
//
// Coordinate system: play is on the z=0 plane. +x right, +y up. 1 world unit = 1
// original 8px tile, y flipped to point up, floor near y≈1 (see levels.js).

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { LEVELS } from './levels.js'

// ── Physics ──────────────────────────────────────────────────────────────────
// Faithful to the disassembly: the jump is a FIXED, TABLE-DRIVEN ARC with no air
// steering — direction locks at takeoff and the hop truncates the moment Jumpman
// lands. Original per-frame vertical deltas (px, y-down) [-4,-4,-2,-2,0,0,+2,+2,
// +4,+4,+4,+4,+4], apex 12px up. One unit = one 8px tile, so apex = 1.5 units —
// you can hop a gap but must climb a rope/ladder to gain a tier, as in 1983.
const WALK_SPEED  = 7.0    // units / second
const CLIMB_SPEED = 5.2    // vertical units / second on a rope or ladder
const GRAVITY     = 40     // units / second^2 (free-fall after a missed ledge)
const TERMINAL_VY = 30     // fall-speed cap
const FATAL_FALL  = 5.0    // units of unbroken fall → death
const GROUND_SNAP = 0.36   // feet-to-girder tolerance for "standing on"
const CLIMB_GRAB  = 0.55   // |x - climbable.x| to grab a rope/ladder
const JM_HALF_W   = 0.5    // half the figure's collision width
const JM_HEIGHT   = 1.5    // feet-to-head height

const JUMP_DY_PX = [-4, -4, -2, -2, 0, 0, 2, 2, 4, 4, 4, 4, 4] // the source's arc
const JUMP_SCALE = 0.125   // px → units (12px apex → 1.5 units)
const JUMP_FPS   = 18      // arc advances at a fixed cadence, framerate-independent
const JUMP_HSTEP = 0.2     // horizontal units per arc frame (dir locked at takeoff)

// ── Palette (neon phosphor on near-black) ────────────────────────────────────
// Per-board accent hue so the five levels don't blur together.
const COL = {
  girderEdge: 0x7dffea,
  ladder: 0xff9e3d, ladderRung: 0xffcf8a, // ladders read as rungs, warm amber
  rope:   0xffe45c,                        // ropes read as a thin bright line
  bomb:   0xff6a3d, bombCore: 0xffd07a,
  jm:     0xff5db1, jmDark: 0xb83b86, jmVisor: 0x8be9ff,
  bg2:    0x05060a,
}
const LEVEL_HUES = [0x18e0c8, 0x4f8bff, 0x9d6bff, 0x2ecf7b, 0xff5db1] // girder tint per level

// ── Renderer / scene / camera ────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.Fog(COL.bg2, 34, 78)

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 400)

// ── Lighting ─────────────────────────────────────────────────────────────────
scene.add(new THREE.HemisphereLight(0x445588, 0x0a0a12, 0.7))
const key = new THREE.DirectionalLight(0xbfe9ff, 1.2)
key.castShadow = true
key.shadow.mapSize.set(2048, 2048)
key.shadow.camera.near = 1; key.shadow.camera.far = 120
key.shadow.bias = -0.0006
scene.add(key); scene.add(key.target)
const rim = new THREE.DirectionalLight(0xff5db1, 0.45)
rim.position.set(-14, 8, 10)
scene.add(rim)

// ── Backdrop: a receding neon grid + drifting starfield ──────────────────────
const starfield = (function backdrop () {
  const grid = new THREE.GridHelper(160, 80, 0x1b2b4a, 0x121a30)
  grid.position.set(20, -0.02, -8)
  grid.material.transparent = true; grid.material.opacity = 0.4
  scene.add(grid)
  const N = 520, pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.sin(i * 12.9898) * 43758.5453 % 1) * 120 - 40
    pos[i * 3 + 1] = (Math.sin(i * 78.233)  * 43758.5453 % 1) * 60 - 6
    pos[i * 3 + 2] = -10 - (Math.sin(i * 3.17) * 43758.5453 % 1) * 44
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9fd0ff, size: 0.12, transparent: true, opacity: 0.8 }))
  scene.add(stars)
  return grid
})()

// ── Level container (rebuilt each board) ─────────────────────────────────────
const levelGroup = new THREE.Group()
scene.add(levelGroup)
let bombs = []          // per-level bomb meshes
let LEVEL = null        // active board (normalized copy of a LEVELS entry)
let levelIdx = 0

function disposeLevel () {
  levelGroup.traverse((o) => {
    if (o.geometry) o.geometry.dispose()
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
  })
  levelGroup.clear()
  bombs = []
}

function buildGirder (g, hue) {
  const len = Math.max(0.3, g.x2 - g.x1)
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(len, 0.34, 1.1),
    new THREE.MeshStandardMaterial({ color: hue, emissive: hue, emissiveIntensity: 0.32, metalness: 0.5, roughness: 0.35 })
  )
  mesh.position.set((g.x1 + g.x2) / 2, g.y - 0.17, 0)
  mesh.castShadow = true; mesh.receiveShadow = true
  levelGroup.add(mesh)
  const edge = new THREE.Mesh(new THREE.BoxGeometry(len, 0.06, 1.16), new THREE.MeshBasicMaterial({ color: COL.girderEdge }))
  edge.position.set((g.x1 + g.x2) / 2, g.y + 0.02, 0)
  levelGroup.add(edge)
}

// Ropes: a single thin bright strand — reads as a line you shimmy up, NOT a pole.
function buildRope (r) {
  const h = Math.max(0.2, r.y2 - r.y1)
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, h, 5),
    new THREE.MeshStandardMaterial({ color: COL.rope, emissive: COL.rope, emissiveIntensity: 0.7, roughness: 0.6 })
  )
  rope.position.set(r.x, (r.y1 + r.y2) / 2, 0)
  levelGroup.add(rope)
}

// Ladders: two rails + evenly-spaced rungs — unmistakably a ladder, not a pole.
function buildLadder (l) {
  const h = Math.max(0.3, l.y2 - l.y1), cy = (l.y1 + l.y2) / 2
  const mat = new THREE.MeshStandardMaterial({ color: COL.ladder, emissive: COL.ladder, emissiveIntensity: 0.4, metalness: 0.4, roughness: 0.4 })
  const rungMat = new THREE.MeshStandardMaterial({ color: COL.ladderRung, emissive: COL.ladderRung, emissiveIntensity: 0.5, roughness: 0.5 })
  const railGeo = new THREE.BoxGeometry(0.07, h, 0.14)
  const railL = new THREE.Mesh(railGeo, mat); railL.position.set(l.x - 0.2, cy, 0); railL.castShadow = true
  const railR = new THREE.Mesh(railGeo, mat); railR.position.set(l.x + 0.2, cy, 0); railR.castShadow = true
  levelGroup.add(railL, railR)
  const rungGeo = new THREE.BoxGeometry(0.55, 0.06, 0.06)
  for (let y = l.y1 + 0.35; y < l.y2 - 0.05; y += 0.55) {
    const rung = new THREE.Mesh(rungGeo, rungMat); rung.position.set(l.x, y, 0)
    levelGroup.add(rung)
  }
}

const bombGeo = new THREE.IcosahedronGeometry(0.3, 0)
function buildBomb (b) {
  const grp = new THREE.Group()
  const shell = new THREE.Mesh(bombGeo, new THREE.MeshStandardMaterial({ color: COL.bomb, emissive: COL.bomb, emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.35 }))
  shell.castShadow = true
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: COL.bombCore }))
  grp.add(shell, core)
  grp.position.set(b.x, b.y + 0.45, 0)
  grp.userData = { collected: false, base: b.y + 0.45, phase: (b.x * 1.7 + b.y * 0.9) % 6.28 }
  levelGroup.add(grp); bombs.push(grp)
}

function boundsOf (L) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  const ext = (x, y) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y) }
  L.girders.forEach((g) => { ext(g.x1, g.y); ext(g.x2, g.y) })
  ;[...L.ropes, ...L.ladders].forEach((r) => { ext(r.x, r.y1); ext(r.x, r.y2) })
  L.bombs.forEach((b) => ext(b.x, b.y))
  ext(L.start.x, L.start.y)
  return { minX, maxX, minY, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY }
}

// Camera framing for the active board (recomputed on resize too).
let camTarget = new THREE.Vector3(20, 11, 0)
let camDist = 40
function frameCamera () {
  const b = LEVEL._bounds
  const vFOV = THREE.MathUtils.degToRad(camera.fov)
  const fitH = (b.h / 2 + 2) / Math.tan(vFOV / 2)
  const fitW = (b.w / 2 + 2) / Math.tan(vFOV / 2) / camera.aspect
  camDist = Math.max(fitH, fitW) * 1.06 + 3
  camTarget.set(b.cx, b.cy, 0)
  // park the shadow + key light over the board
  key.position.set(b.cx + 6, b.maxY + 14, 16)
  key.target.position.set(b.cx, b.cy, 0)
  const s = key.shadow.camera
  s.left = -b.w; s.right = b.w; s.top = b.h + 6; s.bottom = -6
  s.updateProjectionMatrix()
}

function loadLevel (i) {
  disposeLevel()
  levelIdx = ((i % LEVELS.length) + LEVELS.length) % LEVELS.length
  const src = LEVELS[levelIdx]
  LEVEL = { ...src, bombs: src.bombs.map((b) => ({ ...b })) }
  LEVEL._climb = [
    ...src.ropes.map((r) => ({ ...r, kind: 'rope' })),
    ...src.ladders.map((l) => ({ ...l, kind: 'ladder' })),
  ]
  LEVEL._bounds = boundsOf(src)
  LEVEL._minX = LEVEL._bounds.minX - 0.5
  LEVEL._maxX = LEVEL._bounds.maxX + 0.5
  LEVEL._fatalFloor = LEVEL._bounds.minY - 2.5

  const hue = LEVEL_HUES[levelIdx % LEVEL_HUES.length]
  src.girders.forEach((g) => buildGirder(g, hue))
  src.ropes.forEach(buildRope)
  src.ladders.forEach(buildLadder)
  src.bombs.forEach(buildBomb)
  starfield.position.set(LEVEL._bounds.cx, -0.02, -8)

  frameCamera()
  // snap the camera straight to the board on a fresh load (no drift-in)
  camera.position.set(camTarget.x, camTarget.y + 1.5, camDist)
  camera.lookAt(camTarget)

  game.collected = 0
  respawn()
  updateHud()
}

// ── Jumpman ──────────────────────────────────────────────────────────────────
function buildJumpman () {
  const grp = new THREE.Group()
  const body = new THREE.MeshStandardMaterial({ color: COL.jm, emissive: COL.jm, emissiveIntensity: 0.4, roughness: 0.4, metalness: 0.2 })
  const dark = new THREE.MeshStandardMaterial({ color: COL.jmDark, emissive: COL.jmDark, emissiveIntensity: 0.3, roughness: 0.5 })
  const visor = new THREE.MeshStandardMaterial({ color: COL.jmVisor, emissive: COL.jmVisor, emissiveIntensity: 0.8, roughness: 0.3 })
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.66, 0.5), body); torso.position.y = 0.86; torso.castShadow = true
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.46), body); head.position.y = 1.36; head.castShadow = true
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.02), visor); face.position.set(0, 1.38, 0.24)
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5, 0.16), dark); const armR = armL.clone()
  armL.position.set(-0.4, 0.9, 0); armR.position.set(0.4, 0.9, 0); armL.castShadow = armR.castShadow = true
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.56, 0.22), dark); const legR = legL.clone()
  legL.position.set(-0.17, 0.3, 0); legR.position.set(0.17, 0.3, 0); legL.castShadow = legR.castShadow = true
  grp.add(torso, head, face, armL, armR, legL, legR)
  grp.userData = { legL, legR, armL, armR, torso, head }
  return grp
}
const jm = buildJumpman()
scene.add(jm)

// ── Player state ─────────────────────────────────────────────────────────────
const player = {
  x: 0, y: 0, vy: 0, onGround: true, onRope: null, facing: 1,
  fellFrom: 0, runPhase: 0, alive: true,
  jumping: false, jumpFrame: 0, jumpDir: 0, jumpAccum: 0,
}

// ── Input ────────────────────────────────────────────────────────────────────
const keys = Object.create(null)
addEventListener('keydown', (e) => {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) e.preventDefault()
  keys[e.code] = true
  if (e.code === 'Space') onSpace()
})
addEventListener('keyup', (e) => { keys[e.code] = false })

// ── Game state ───────────────────────────────────────────────────────────────
const STATE = { TITLE: 'title', PLAY: 'play', DYING: 'dying', CLEARED: 'cleared', WON: 'won', OVER: 'over' }
const game = { state: STATE.TITLE, score: 0, lives: 7, collected: 0, dieT: 0, nextLife: 10000 }

const el = (id) => document.getElementById(id)
const hud = { bombs: el('bombs'), score: el('score'), lives: el('lives'), level: el('level'), bonus: el('bonus') }
const banner = el('banner'), bannerSub = el('bannerSub'), bannerGo = el('bannerGo')
function updateHud () {
  hud.bombs.textContent = `${game.collected}/${bombs.length}`
  hud.score.textContent = game.score
  hud.lives.textContent = game.lives
  hud.level.textContent = `${levelIdx + 1}. ${LEVEL.display}`
  hud.bonus.textContent = LEVEL.bonus * 100
}
function addScore (n) {
  game.score += n
  if (game.score >= game.nextLife) { game.lives++; game.nextLife += 10000 } // extra life / 10k (faithful)
}

function onSpace () {
  if (game.state === STATE.TITLE) { game.state = STATE.PLAY; banner.classList.add('hide'); return }
  if (game.state === STATE.OVER || game.state === STATE.WON) { resetGame(); return }
  if (game.state === STATE.CLEARED) { loadLevel(levelIdx + 1); game.state = STATE.PLAY; banner.classList.add('hide'); return }
  if (game.state === STATE.PLAY && (player.onGround || player.onRope)) {
    player.jumping = true; player.jumpFrame = 0; player.jumpAccum = 0
    player.jumpDir = keys.ArrowLeft ? -1 : keys.ArrowRight ? 1 : 0
    if (player.jumpDir) player.facing = player.jumpDir
    player.onGround = false; player.onRope = null; player.vy = 0
    player.fellFrom = player.y
  }
}

function showBanner (title, sub, go) {
  banner.classList.remove('hide')
  banner.querySelector('.title').textContent = title
  bannerSub.textContent = sub
  bannerGo.textContent = go
}

function resetGame () {
  game.score = 0; game.lives = 7; game.nextLife = 10000
  loadLevel(0); game.state = STATE.PLAY; banner.classList.add('hide')
}
function respawn () {
  player.x = LEVEL.start.x; player.y = LEVEL.start.y
  player.vy = 0; player.onGround = true; player.onRope = null
  player.jumping = false; player.fellFrom = player.y; player.alive = true
}

// ── Collision helpers (operate on the ACTIVE level) ──────────────────────────
function girderUnder (x, y) {
  let best = null
  for (const g of LEVEL.girders) {
    if (x < g.x1 - JM_HALF_W || x > g.x2 + JM_HALF_W) continue
    if (g.y <= y + GROUND_SNAP && (best === null || g.y > best)) best = g.y
  }
  return best
}
function girderTopAt (x) {
  const tops = []
  for (const g of LEVEL.girders) {
    if (x < g.x1 - JM_HALF_W || x > g.x2 + JM_HALF_W) continue
    tops.push(g.y)
  }
  return tops
}
function climbableAt (x, y) {
  let best = null, bestDx = CLIMB_GRAB + 1
  for (const r of LEVEL._climb) {
    const dx = Math.abs(x - r.x)
    if (dx <= CLIMB_GRAB && y >= r.y1 - 0.6 && y <= r.y2 + 0.6 && dx < bestDx) { best = r; bestDx = dx }
  }
  return best
}

// ── Simulation ───────────────────────────────────────────────────────────────
function updatePlay (dt) {
  const left = keys.ArrowLeft, right = keys.ArrowRight
  const up = keys.ArrowUp, down = keys.ArrowDown

  if (!player.onRope && (up || down)) {
    const r = climbableAt(player.x, player.y)
    if (r) { player.onRope = r; player.x = r.x; player.vy = 0; player.onGround = false; player.jumping = false }
  }

  if (player.onRope) {
    const r = player.onRope
    if (up)   player.y += CLIMB_SPEED * dt
    if (down) player.y -= CLIMB_SPEED * dt
    if (left)  { player.x -= WALK_SPEED * 0.5 * dt; player.facing = -1 }
    if (right) { player.x += WALK_SPEED * 0.5 * dt; player.facing = 1 }
    player.y = Math.max(r.y1, Math.min(r.y2, player.y))
    if (Math.abs(player.x - r.x) > CLIMB_GRAB + 0.05) player.onRope = null
    else {
      const g = girderUnder(player.x, player.y)
      if (g !== null && Math.abs(player.y - g) < 0.06 && down) { player.onRope = null; player.y = g; player.onGround = true }
    }
    player.runPhase += (up || down ? 8 : 0) * dt
  } else if (player.jumping) {
    player.jumpAccum += dt
    const step = 1 / JUMP_FPS
    while (player.jumping && player.jumpAccum >= step) {
      player.jumpAccum -= step
      const f = player.jumpFrame++
      if (f >= JUMP_DY_PX.length) { player.jumping = false; player.vy = 0; break }
      player.y += -JUMP_DY_PX[f] * JUMP_SCALE
      player.x = Math.max(LEVEL._minX, Math.min(LEVEL._maxX, player.x + player.jumpDir * JUMP_HSTEP))
      if (f >= 6) {
        for (const top of girderTopAt(player.x)) {
          if (player.y <= top + GROUND_SNAP && player.y >= top - 0.4) {
            player.y = top; player.jumping = false; player.onGround = true; player.fellFrom = top; break
          }
        }
      }
    }
    player.runPhase += 6 * dt
    if (!player.jumping && !player.onGround) player.fellFrom = player.y
  } else {
    let vx = 0
    if (left)  { vx = -WALK_SPEED; player.facing = -1 }
    if (right) { vx =  WALK_SPEED; player.facing = 1 }
    player.x = Math.max(LEVEL._minX, Math.min(LEVEL._maxX, player.x + vx * dt))
    player.runPhase += Math.abs(vx) * 0.5 * dt

    const prevY = player.y
    player.vy = Math.max(-TERMINAL_VY, player.vy - GRAVITY * dt)
    player.y += player.vy * dt

    if (player.vy <= 0) {
      for (const top of girderTopAt(player.x)) {
        if (prevY + 0.001 >= top && player.y <= top + GROUND_SNAP) {
          const fell = player.fellFrom - top
          player.y = top; player.vy = 0
          if (!player.onGround && fell > FATAL_FALL) return die()
          player.onGround = true; break
        }
      }
    }
    if (player.onGround) {
      const g = girderUnder(player.x, player.y)
      if (g === null || Math.abs(player.y - g) > GROUND_SNAP) { player.onGround = false; player.fellFrom = player.y }
      else player.y = g
    }
    if (!player.onGround) player.fellFrom = Math.max(player.fellFrom, player.y)
    if (player.y < LEVEL._fatalFloor) return die()
  }

  for (const b of bombs) {
    if (b.userData.collected) continue
    const dx = b.position.x - player.x
    const dy = b.position.y - (player.y + JM_HEIGHT * 0.5)
    if (dx * dx + dy * dy < 0.7 * 0.7) {
      b.userData.collected = true; b.visible = false
      game.collected++; addScore(100); updateHud()
      if (game.collected === bombs.length) return clearLevel()
    }
  }
}

function die () { game.state = STATE.DYING; game.dieT = 0; player.alive = false }

function clearLevel () {
  addScore(LEVEL.bonus * 100)
  updateHud()
  const last = levelIdx === LEVELS.length - 1
  if (last) {
    game.state = STATE.WON
    showBanner('YOU WIN', `all ${LEVELS.length} boards cleared · score ${game.score}`, 'press SPACE to play again')
  } else {
    game.state = STATE.CLEARED
    showBanner('BOARD CLEAR', `${LEVEL.display} · bonus +${LEVEL.bonus * 100}`, 'press SPACE for the next board')
  }
}

// ── Presentation ─────────────────────────────────────────────────────────────
function poseJumpman () {
  jm.position.set(player.x, player.y, 0)
  jm.rotation.y = player.facing === 1 ? 0.35 : -0.35
  const { legL, legR, armL, armR, torso } = jm.userData
  if (player.onRope) {
    const c = Math.sin(player.runPhase * 2) * 0.5
    armL.rotation.x = -1.4 + c; armR.rotation.x = -1.4 - c
    legL.rotation.x = 0.2 - c; legR.rotation.x = 0.2 + c; torso.rotation.z = 0
  } else if (!player.onGround) {
    legL.rotation.x = -0.5; legR.rotation.x = 0.4
    armL.rotation.x = -0.9; armR.rotation.x = -0.9; torso.rotation.z = 0
  } else {
    const s = Math.sin(player.runPhase * 3)
    const moving = keys.ArrowLeft || keys.ArrowRight
    legL.rotation.x = moving ? s * 0.9 : 0; legR.rotation.x = moving ? -s * 0.9 : 0
    armL.rotation.x = moving ? -s * 0.7 : 0; armR.rotation.x = moving ? s * 0.7 : 0
    torso.rotation.z = moving ? Math.sin(player.runPhase * 6) * 0.04 : 0
  }
}

function updateDying (dt) {
  game.dieT += dt
  jm.rotation.z += dt * 10
  jm.position.y = player.y - game.dieT * 3
  jm.scale.setScalar(Math.max(0.01, 1 - game.dieT * 1.1))
  if (game.dieT > 0.9) {
    jm.scale.setScalar(1); jm.rotation.z = 0
    game.lives--; updateHud()
    if (game.lives <= 0) {
      game.state = STATE.OVER
      showBanner('GAME OVER', `score ${game.score}`, 'press SPACE to try again')
    } else { respawn(); game.state = STATE.PLAY }
  }
}

// Camera: settle to the framed board, then follow the player gently within it.
function updateCamera (t) {
  const b = LEVEL._bounds
  const followY = THREE.MathUtils.clamp(player.y, b.minY + 2, b.maxY - 2)
  const tx = b.cx + Math.sin(t * 0.1) * 0.5
  const ty = camTarget.y * 0.7 + followY * 0.3 + 1.0 + Math.cos(t * 0.09) * 0.3
  camera.position.x += (tx - camera.position.x) * 0.05
  camera.position.y += (ty - camera.position.y) * 0.05
  camera.position.z += (camDist - camera.position.z) * 0.05
  camera.lookAt(b.cx, b.cy * 0.6 + followY * 0.4, 0)
}

// ── Post-processing: bloom for the phosphor glow ─────────────────────────────
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.85, 0.7, 0.2)
composer.addPass(bloom)

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
  composer.setSize(innerWidth, innerHeight)
  if (LEVEL) frameCamera()
})

// ── Boot ─────────────────────────────────────────────────────────────────────
loadLevel(0)
showBanner('JUMPMAN', `5 real boards · ${LEVEL.display} first`, 'press SPACE to start')

let lastT = performance.now()
renderer.setAnimationLoop((now) => {
  const t = now / 1000
  let dt = (now - lastT) / 1000; lastT = now
  dt = Math.min(dt, 0.05)

  if (game.state === STATE.PLAY) updatePlay(dt)
  if (game.state === STATE.DYING) updateDying(dt)
  if (game.state !== STATE.DYING) poseJumpman()

  for (const b of bombs) {
    if (!b.visible) continue
    b.rotation.y += dt * 1.6
    b.position.y = b.userData.base + Math.sin(t * 2 + b.userData.phase) * 0.08
  }

  updateCamera(t)
  composer.render()
})

// Dev hook — read-only live state for tinkerers + the headless playtest.
window.__jm = { player, game, get bombs () { return bombs }, get level () { return LEVEL }, loadLevel }
