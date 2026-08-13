// fiddle-0025-Jumpman — a 2.5D three.js tribute to the 1983 platformer Jumpman
// (Randy Glover / EPYX), adapted from the public-domain 8086 disassembly by
// jeff leyda. Original code, original art — only the mechanics are borrowed:
// run the girders, climb the ropes, collect every bomb, don't fall too far.
//
// Coordinate system: the game is played on the z=0 plane (classic side-view
// platformer). +x right, +y up. World units are "cells" — the level is laid out
// on an integer-ish grid so girders/ropes/bombs line up crisply. The camera sits
// in front and slightly above, giving the flat action real depth + shadow.

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'

// ── Physics ──────────────────────────────────────────────────────────────────
// Faithful to the disassembly: the jump is a FIXED, TABLE-DRIVEN ARC with no
// air steering — direction is locked at takeoff and the hop truncates the moment
// Jumpman lands. The original's per-frame vertical deltas (px, y-down) were
// [-4,-4,-2,-2,0,0,+2,+2,+4,+4,+4,+4,+4] over 13 frames, apex 12px up. We negate
// (our y is up) and scale to cells; one tier here is 3 cells, and the apex lands
// at ~1.5 — so you can hop across a gap but must take a rope to climb a tier,
// exactly as the original demands. Walking/climbing/falling are steady-velocity
// (the 1983 fall had no gravity accel; we use a gentle one purely so a misstep
// reads as a fall rather than a teleport).
const WALK_SPEED   = 7.2    // cells / second
const CLIMB_SPEED  = 5.0    // vertical cells / second on a rope
const GRAVITY      = 42     // cells / second^2 (free-fall after a missed ledge)
const TERMINAL_VY  = 30     // fall-speed cap
const FATAL_FALL   = 3.6    // cells of unbroken fall → death (~one tier; the original is unforgiving about falls)
const GROUND_SNAP  = 0.34   // feet-to-girder tolerance for "standing on"
const ROPE_GRAB    = 0.42   // |x - rope.x| to grab a rope
const JM_HALF_W    = 0.42   // half the figure's collision width
const JM_HEIGHT    = 1.5    // feet-to-head height

// The original jump arc — per-frame vertical deltas (original px, y-down).
const JUMP_DY_PX = [-4, -4, -2, -2, 0, 0, 2, 2, 4, 4, 4, 4, 4]
const JUMP_SCALE = 0.125    // px → cells (12px apex → 1.5 cells)
const JUMP_FPS   = 18       // arc advances at a fixed cadence, framerate-independent
const JUMP_HSTEP = 0.19     // horizontal cells per arc frame (dir locked at takeoff)

// ── The level: "Easy Does It" (Jumpman's first board) ────────────────────────
// Girders are horizontal runs {x1,x2,y}; ropes are vertical climbs {x,y1,y2};
// bombs sit on girders {x,y}. Laid out as a faithful-in-spirit tiered board:
// a full floor, three mid tiers stitched by ropes, a top ledge — eight bombs
// spread so every one demands a climb or a hop, none a leap of faith.
const LEVEL = {
  name: 'Easy Does It',
  bonus: 2000,
  start: { x: 1.5, y: 1 },
  girders: [
    { x1: -0.5, x2: 15.5, y: 1 },    // ground floor
    { x1: 2,    x2: 8,    y: 4 },    // tier 1 left
    { x1: 10,   x2: 15,   y: 4 },    // tier 1 right
    { x1: -0.5, x2: 6,    y: 7 },    // tier 2 left
    { x1: 9,    x2: 15.5, y: 7 },    // tier 2 right
    { x1: 3,    x2: 12,   y: 10 },   // tier 3 centre
    { x1: 6,    x2: 9,    y: 13 },   // top ledge
  ],
  ropes: [
    { x: 4,  y1: 1,  y2: 4 },
    { x: 12, y1: 1,  y2: 4 },
    { x: 3,  y1: 4,  y2: 7 },
    { x: 13, y1: 4,  y2: 7 },
    { x: 5,  y1: 7,  y2: 10 },
    { x: 11, y1: 7,  y2: 10 },
    { x: 7.5, y1: 10, y2: 13 },
  ],
  bombs: [
    { x: 6,   y: 1 }, { x: 14, y: 1 },
    { x: 3,   y: 4 }, { x: 13, y: 4 },
    { x: 1,   y: 7 }, { x: 14.5, y: 7 },
    { x: 5,   y: 10 },
    { x: 7.5, y: 13 },
  ],
}

// ── Palette (neon phosphor on near-black) ────────────────────────────────────
const COL = {
  girder: 0x18e0c8, girderEdge: 0x7dffea,
  rope:   0xffe45c,
  bomb:   0xff6a3d, bombCore: 0xffd07a,
  jm:     0xff5db1, jmDark: 0xb83b86, jmVisor: 0x8be9ff,
  bg1:    0x0a0b16, bg2:    0x05060a,
}

// ── Renderer / scene / camera ────────────────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.Fog(COL.bg2, 22, 46)

const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 200)
// Frame the whole board; the target sits at the board's rough centre.
const BOARD_MID = new THREE.Vector3(7.5, 6.5, 0)
camera.position.set(7.5, 7.6, 24)
camera.lookAt(BOARD_MID)

// ── Lighting ─────────────────────────────────────────────────────────────────
scene.add(new THREE.HemisphereLight(0x445588, 0x0a0a12, 0.7))
const key = new THREE.DirectionalLight(0xbfe9ff, 1.15)
key.position.set(8, 22, 14)
key.castShadow = true
key.shadow.mapSize.set(2048, 2048)
key.shadow.camera.left = -20; key.shadow.camera.right = 20
key.shadow.camera.top = 26; key.shadow.camera.bottom = -6
key.shadow.camera.near = 1; key.shadow.camera.far = 60
key.shadow.bias = -0.0006
scene.add(key)
const rim = new THREE.DirectionalLight(0xff5db1, 0.5)
rim.position.set(-10, 6, 8)
scene.add(rim)

// ── Backdrop: a receding neon grid + drifting starfield ──────────────────────
;(function backdrop () {
  const grid = new THREE.GridHelper(80, 40, 0x1b2b4a, 0x121a30)
  grid.position.set(7.5, -0.02, -6)
  grid.material.transparent = true
  grid.material.opacity = 0.5
  scene.add(grid)

  const N = 380, pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.sin(i * 12.9898) * 43758.5453 % 1) * 70 - 27
    pos[i * 3 + 1] = (Math.sin(i * 78.233)  * 43758.5453 % 1) * 40 - 4
    pos[i * 3 + 2] = -8 - (Math.sin(i * 3.17) * 43758.5453 % 1) * 34
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9fd0ff, size: 0.09, transparent: true, opacity: 0.8 }))
  scene.add(stars)
})()

// ── Level geometry ───────────────────────────────────────────────────────────
const levelGroup = new THREE.Group()
scene.add(levelGroup)

function buildGirder (g) {
  const len = g.x2 - g.x1
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(len, 0.34, 1.1),
    new THREE.MeshStandardMaterial({ color: COL.girder, emissive: COL.girder, emissiveIntensity: 0.35, metalness: 0.5, roughness: 0.35 })
  )
  mesh.position.set((g.x1 + g.x2) / 2, g.y - 0.17, 0)
  mesh.castShadow = true; mesh.receiveShadow = true
  levelGroup.add(mesh)
  // bright top edge line for the "drawn girder" read
  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(len, 0.06, 1.16),
    new THREE.MeshBasicMaterial({ color: COL.girderEdge })
  )
  edge.position.set((g.x1 + g.x2) / 2, g.y + 0.02, 0)
  levelGroup.add(edge)
}

function buildRope (r) {
  const h = r.y2 - r.y1
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, h, 6),
    new THREE.MeshStandardMaterial({ color: COL.rope, emissive: COL.rope, emissiveIntensity: 0.55, roughness: 0.6 })
  )
  rope.position.set(r.x, (r.y1 + r.y2) / 2, 0)
  rope.castShadow = true
  levelGroup.add(rope)
}

LEVEL.girders.forEach(buildGirder)
LEVEL.ropes.forEach(buildRope)

// Bombs
const bombGeo = new THREE.IcosahedronGeometry(0.28, 0)
const bombs = LEVEL.bombs.map((b) => {
  const grp = new THREE.Group()
  const shell = new THREE.Mesh(bombGeo, new THREE.MeshStandardMaterial({
    color: COL.bomb, emissive: COL.bomb, emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.35,
  }))
  shell.castShadow = true
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 12, 12),
    new THREE.MeshBasicMaterial({ color: COL.bombCore })
  )
  grp.add(shell, core)
  grp.position.set(b.x, b.y + 0.42, 0)
  grp.userData = { collected: false, base: b.y + 0.42, phase: Math.random() * 6.28 }
  levelGroup.add(grp)
  return grp
})

// ── Jumpman: a chunky voxel figure with a two-frame run + climb pose ──────────
function buildJumpman () {
  const grp = new THREE.Group()
  const body = new THREE.MeshStandardMaterial({ color: COL.jm, emissive: COL.jm, emissiveIntensity: 0.4, roughness: 0.4, metalness: 0.2 })
  const dark = new THREE.MeshStandardMaterial({ color: COL.jmDark, emissive: COL.jmDark, emissiveIntensity: 0.3, roughness: 0.5 })
  const visor = new THREE.MeshStandardMaterial({ color: COL.jmVisor, emissive: COL.jmVisor, emissiveIntensity: 0.8, roughness: 0.3 })

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.66, 0.5), body)
  torso.position.y = 0.86; torso.castShadow = true
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.46), body)
  head.position.y = 1.36; head.castShadow = true
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.02), visor)
  face.position.set(0, 1.38, 0.24)
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5, 0.16), dark)
  const armR = armL.clone()
  armL.position.set(-0.4, 0.9, 0); armR.position.set(0.4, 0.9, 0)
  armL.castShadow = armR.castShadow = true
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.56, 0.22), dark)
  const legR = legL.clone()
  legL.position.set(-0.17, 0.3, 0); legR.position.set(0.17, 0.3, 0)
  legL.castShadow = legR.castShadow = true

  grp.add(torso, head, face, armL, armR, legL, legR)
  grp.userData = { legL, legR, armL, armR, torso, head }
  return grp
}
const jm = buildJumpman()
scene.add(jm)

// ── Player state ─────────────────────────────────────────────────────────────
const player = {
  x: LEVEL.start.x, y: LEVEL.start.y, vy: 0,
  onGround: true, onRope: null, facing: 1,
  fellFrom: LEVEL.start.y, runPhase: 0, alive: true,
  // fixed-arc jump state
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

// ── Game state machine ───────────────────────────────────────────────────────
const STATE = { TITLE: 'title', PLAY: 'play', DYING: 'dying', WON: 'won', OVER: 'over' }
const game = { state: STATE.TITLE, score: 0, lives: 7, collected: 0, dieT: 0, wonT: 0 }

const el = (id) => document.getElementById(id)
const hud = { bombs: el('bombs'), score: el('score'), lives: el('lives') }
const banner = el('banner'), bannerSub = el('bannerSub'), bannerGo = el('bannerGo')
function syncHud () {
  hud.bombs.textContent = `${game.collected}/${bombs.length}`
  hud.score.textContent = game.score
  hud.lives.textContent = game.lives
}
syncHud()

function onSpace () {
  if (game.state === STATE.TITLE) { game.state = STATE.PLAY; banner.classList.add('hide'); return }
  if (game.state === STATE.OVER || game.state === STATE.WON) { resetGame(); return }
  if (game.state === STATE.PLAY && (player.onGround || player.onRope)) {
    // Launch the fixed arc. Direction is locked NOW (no air steering), taken
    // from whatever way you're leaning at takeoff.
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
  game.score = 0; game.lives = 7; game.collected = 0; game.state = STATE.PLAY
  bombs.forEach((b) => { b.userData.collected = false; b.visible = true })
  respawn(); banner.classList.add('hide'); syncHud()
}

function respawn () {
  player.x = LEVEL.start.x; player.y = LEVEL.start.y
  player.vy = 0; player.onGround = true; player.onRope = null
  player.fellFrom = player.y; player.alive = true
}

// ── Collision helpers ────────────────────────────────────────────────────────
function girderUnder (x, y) {
  // the highest girder-top at or just below the feet within reach
  let best = null
  for (const g of LEVEL.girders) {
    if (x < g.x1 - JM_HALF_W || x > g.x2 + JM_HALF_W) continue
    if (g.y <= y + GROUND_SNAP && (best === null || g.y > best)) best = g.y
  }
  return best
}
function girderTopAt (x) {
  // any girder top strictly above the feet (for landing while falling)
  const tops = []
  for (const g of LEVEL.girders) {
    if (x < g.x1 - JM_HALF_W || x > g.x2 + JM_HALF_W) continue
    tops.push(g.y)
  }
  return tops
}
function ropeAt (x, y) {
  for (const r of LEVEL.ropes) {
    if (Math.abs(x - r.x) <= ROPE_GRAB && y >= r.y1 - 0.5 && y <= r.y2 + 0.5) return r
  }
  return null
}
const LEVEL_MINX = -0.5, LEVEL_MAXX = 15.5

// ── Simulation ───────────────────────────────────────────────────────────────
function updatePlay (dt) {
  const left = keys.ArrowLeft, right = keys.ArrowRight
  const up = keys.ArrowUp, down = keys.ArrowDown

  // Rope grab: press up/down while overlapping a rope → attach
  if (!player.onRope && (up || down)) {
    const r = ropeAt(player.x, player.y)
    if (r) { player.onRope = r; player.x = r.x; player.vy = 0; player.onGround = false }
  }

  if (player.onRope) {
    const r = player.onRope
    if (up)   player.y += CLIMB_SPEED * dt
    if (down) player.y -= CLIMB_SPEED * dt
    // small horizontal nudge lets you step off onto a girder
    if (left)  { player.x -= WALK_SPEED * 0.5 * dt; player.facing = -1 }
    if (right) { player.x += WALK_SPEED * 0.5 * dt; player.facing = 1 }
    player.y = Math.max(r.y1, Math.min(r.y2, player.y))
    // leave the rope if you've stepped off its x, or reached a girder to stand on
    if (Math.abs(player.x - r.x) > ROPE_GRAB + 0.05) player.onRope = null
    else {
      const g = girderUnder(player.x, player.y)
      if (g !== null && Math.abs(player.y - g) < 0.05 && down) { player.onRope = null; player.y = g; player.onGround = true }
      if (player.y >= r.y2) { const g2 = girderUnder(player.x, player.y); if (g2 !== null) { player.onRope = null } }
    }
    player.runPhase += (up || down ? 8 : 0) * dt
  } else if (player.jumping) {
    // ── Fixed-arc jump: step the lookup table at a constant cadence so the hop
    //    is identical regardless of framerate. No air steering; lands on contact.
    player.jumpAccum += dt
    const step = 1 / JUMP_FPS
    while (player.jumping && player.jumpAccum >= step) {
      player.jumpAccum -= step
      const f = player.jumpFrame++
      if (f >= JUMP_DY_PX.length) {           // arc exhausted with no ground → free fall
        player.jumping = false; player.vy = 0; break
      }
      const dy = -JUMP_DY_PX[f] * JUMP_SCALE  // negate: original y-down → our y-up
      player.y += dy
      player.x = Math.max(LEVEL_MINX, Math.min(LEVEL_MAXX, player.x + player.jumpDir * JUMP_HSTEP))
      // land only on the way down (f>=6), when feet cross a girder top
      if (f >= 6) {
        for (const top of girderTopAt(player.x)) {
          if (player.y <= top + GROUND_SNAP && player.y >= top - 0.4) {
            player.y = top; player.jumping = false; player.onGround = true
            player.fellFrom = top; break
          }
        }
      }
    }
    player.runPhase += 6 * dt
    if (!player.jumping && !player.onGround) player.fellFrom = player.y // arc ended midair → begin fall
  } else {
    // horizontal running (only when grounded/falling — never mid-arc)
    let vx = 0
    if (left)  { vx = -WALK_SPEED; player.facing = -1 }
    if (right) { vx =  WALK_SPEED; player.facing = 1 }
    player.x += vx * dt
    player.x = Math.max(LEVEL_MINX, Math.min(LEVEL_MAXX, player.x))
    player.runPhase += Math.abs(vx) * 0.5 * dt

    // gravity / ground
    const prevY = player.y
    player.vy -= GRAVITY * dt
    player.vy = Math.max(-TERMINAL_VY, player.vy)
    player.y += player.vy * dt

    if (player.vy <= 0) {
      // landing: scan girders we crossed this frame
      for (const top of girderTopAt(player.x)) {
        if (prevY + 0.001 >= top && player.y <= top + GROUND_SNAP) {
          const fell = player.fellFrom - top
          player.y = top; player.vy = 0
          if (!player.onGround && fell > FATAL_FALL) return die()
          player.onGround = true
          break
        }
      }
    }
    // still standing?
    if (player.onGround) {
      const g = girderUnder(player.x, player.y)
      if (g === null || Math.abs(player.y - g) > GROUND_SNAP) { player.onGround = false; player.fellFrom = player.y }
      else player.y = g
    }
    if (!player.onGround) player.fellFrom = Math.max(player.fellFrom, player.y)
    // fell off the bottom of the world
    if (player.y < -3) return die()
  }

  // bomb pickup
  for (const b of bombs) {
    if (b.userData.collected) continue
    const dx = b.position.x - player.x
    const dy = (b.position.y) - (player.y + JM_HEIGHT * 0.5)
    if (dx * dx + dy * dy < 0.55 * 0.55) {
      b.userData.collected = true; b.visible = false
      game.collected++; game.score += 100; syncHud()
      if (game.collected === bombs.length) return winLevel()
    }
  }
}

function die () {
  game.state = STATE.DYING; game.dieT = 0; player.alive = false
}
function winLevel () {
  game.state = STATE.WON; game.wonT = 0
  game.score += LEVEL.bonus
  syncHud()
  showBanner('LEVEL CLEAR', `${LEVEL.name}  ·  bonus +${LEVEL.bonus}`, 'press SPACE to play again')
}

// ── Presentation: place + animate the figure from player state ───────────────
function poseJumpman (t) {
  jm.position.set(player.x, player.y, 0)
  jm.rotation.y = player.facing === 1 ? 0.35 : -0.35
  const { legL, legR, armL, armR, torso } = jm.userData
  if (player.onRope) {
    const c = Math.sin(player.runPhase * 2) * 0.5
    armL.rotation.x = -1.4 + c; armR.rotation.x = -1.4 - c
    legL.rotation.x = 0.2 - c; legR.rotation.x = 0.2 + c
    torso.rotation.z = 0
  } else if (!player.onGround) {
    legL.rotation.x = -0.5; legR.rotation.x = 0.4
    armL.rotation.x = -0.9; armR.rotation.x = -0.9
    torso.rotation.z = 0
  } else {
    const s = Math.sin(player.runPhase * 3)
    const moving = keys.ArrowLeft || keys.ArrowRight
    legL.rotation.x = moving ? s * 0.9 : 0
    legR.rotation.x = moving ? -s * 0.9 : 0
    armL.rotation.x = moving ? -s * 0.7 : 0
    armR.rotation.x = moving ? s * 0.7 : 0
    torso.rotation.z = moving ? Math.sin(player.runPhase * 6) * 0.04 : 0
  }
}

function updateDying (dt) {
  game.dieT += dt
  // spin + sink, then respawn or game over
  jm.rotation.z += dt * 10
  jm.position.y = player.y - game.dieT * 3
  jm.scale.setScalar(Math.max(0.01, 1 - game.dieT * 1.1))
  if (game.dieT > 0.9) {
    jm.scale.setScalar(1); jm.rotation.z = 0
    game.lives--; syncHud()
    if (game.lives <= 0) {
      game.state = STATE.OVER
      showBanner('GAME OVER', `score ${game.score}`, 'press SPACE to try again')
    } else {
      respawn(); game.state = STATE.PLAY
    }
  }
}

// ── Camera drift — a gentle parallax so the flat board breathes ──────────────
function updateCamera (t) {
  const tx = 7.5 + Math.sin(t * 0.12) * 0.6
  const ty = 7.6 + Math.cos(t * 0.1) * 0.4 + (player.y - 6.5) * 0.12
  camera.position.x += (tx - camera.position.x) * 0.04
  camera.position.y += (ty - camera.position.y) * 0.04
  camera.lookAt(BOARD_MID.x, BOARD_MID.y + (player.y - 6.5) * 0.06, 0)
}

// ── Post-processing: bloom for the phosphor glow ─────────────────────────────
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene, camera))
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.9, 0.7, 0.2)
composer.addPass(bloom)

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
  composer.setSize(innerWidth, innerHeight)
})

// ── Main loop ────────────────────────────────────────────────────────────────
let last = performance.now()
renderer.setAnimationLoop((now) => {
  const t = now / 1000
  let dt = (now - last) / 1000; last = now
  dt = Math.min(dt, 0.05) // clamp big frame gaps (tab switches)

  if (game.state === STATE.PLAY) updatePlay(dt)
  if (game.state === STATE.DYING) updateDying(dt)

  if (game.state !== STATE.DYING) poseJumpman(t)

  // bombs bob + spin
  for (const b of bombs) {
    if (!b.visible) continue
    b.rotation.y += dt * 1.6
    b.position.y = b.userData.base + Math.sin(t * 2 + b.userData.phase) * 0.08
  }

  updateCamera(t)
  composer.render()
})

// Dev hook — lets tinkerers (and the headless playtest) inspect live state from
// the console: __jm.player, __jm.game. Read-only convenience, no game logic.
window.__jm = { player, game, bombs }
