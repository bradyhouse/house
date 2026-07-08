import { defineStore } from 'pinia'
import { INPUT, SHAPES, COLORS, COLS, ROWS, KEYS } from '../constants'

export const useGameStore = defineStore('useGameStore', {
  state: () => ({
    board: [],
    current: [],
    currentX: 0,
    currentY: 0,
    frozen: false,
    interval: null,
    intervalRender: null,
    lose: false,
    windowWidth: 0,
    windowHeight: 0,
    isPlay: false
  }),
  actions: {
    newShape: (store) => {
      let id = Math.floor(Math.random() * SHAPES.length)
      let shape = SHAPES[id] // maintain id for color filling

      store.current = []

      for (let y = 0; y < 4; ++y) {
        store.current[y] = []
        for (let x = 0; x < 4; ++x) {
          let i = 4 * y + x
          if (typeof shape[i] != 'undefined' && shape[i]) {
            store.current[y][x] = id + 1
          } else {
            store.current[y][x] = 0
          }
        }
      }

      store.frozen = false
      store.currentX = Math.floor(Math.random() * (COLS - 4))
      store.currentY = 0
    },

    init: (store) => {
      for (let y = 0; y < ROWS; ++y) {
        store.board[y] = []
        for (let x = 0; x < COLS; ++x) {
          store.board[y][x] = 0
        }
      }
    },
    valid: (store, offsetX, offsetY, newCurrent) => {
      offsetX = offsetX || 0
      offsetY = offsetY || 0
      offsetX = store.currentX + offsetX
      offsetY = store.currentY + offsetY
      newCurrent = newCurrent || store.current

      for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
          if (newCurrent[y][x]) {
            if (
              typeof store.board[y + offsetY] == 'undefined' ||
              typeof store.board[y + offsetY][x + offsetX] == 'undefined' ||
              store.board[y + offsetY][x + offsetX] ||
              x + offsetX < 0 ||
              y + offsetY >= ROWS ||
              x + offsetX >= COLS
            ) {
              if (offsetY == 1 && store.frozen) {
                store.lose = true
              }
              return false
            }
          }
        }
      }
      return true
    },
    freeze: (store) => {
      for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
          if (store.current[y][x]) {
            store.board[y + store.currentY][x + store.currentX] = store.current[y][x]
          }
        }
      }
      store.frozen = true
    },
    clearLines: (store) => {
      for (let y = ROWS - 1; y >= 0; --y) {
        let rowFilled = true
        for (let x = 0; x < COLS; ++x) {
          if (store.board[y][x] == 0) {
            rowFilled = false
            break
          }
        }
        if (rowFilled) {
          for (let yy = y; yy > 0; --yy) {
            for (let x = 0; x < COLS; ++x) {
              store.board[yy][x] = store.board[yy - 1][x]
            }
          }
          ++y
        }
      }
    },
    clearAllIntervals: (store) => {
      if (store.interval) {
        clearInterval(store.interval)
      }
      if (store.intervalRender) {
        clearInterval(store.intervalRender)
      }
    },
    moveLeft(store) {
      if (store.valid(store, -1)) {
        store.currentX = --store.currentX
      }
    },
    moveRight(store) {
      if (store.valid(store, 1)) {
        store.currentX = ++store.currentX
      }
    },
    moveDown(store) {
      if (store.valid(store, 0, 1)) {
        store.currentY = ++store.currentY
      }
    },
    moveUp(store) {
      const rotated = store.rotate(store.current)
      if (store.valid(store, 0, 0, rotated)) {
        store.current = rotated
      }
    },
    keyPress: (key, store) => {
      switch (key) {
        case INPUT.KEY_LEFT:
          store.moveLeft(store);
          break
        case INPUT.KEY_RIGHT:
          store.moveRight(store);
          break
        case INPUT.KEY_DOWN:
          store.moveDown(store);
          break
        case INPUT.CMD_ROTATE:
          store.moveUp(store);
          break
        case INPUT.CMD_DROP:
          while (store.valid(store, 0, 1)) {
            store.currentY = ++store.currentY
          }
          store.tick(store)
          break
      }
    },
    keyDown: (e, store, callback) => {
      if (typeof KEYS[e.keyCode] != 'undefined') {
        store.keyPress(KEYS[e.keyCode])
        callback()
      }
    },
    rotate: (current) => {
      let newCurrent = []
      for (let y = 0; y < 4; ++y) {
        newCurrent[y] = []
        for (let x = 0; x < 4; ++x) {
          newCurrent[y][x] = current[3 - x][y]
        }
      }

      return newCurrent
    },
    tick: (store, soundEl) => {
      if (store.valid(store, 0, 1)) {
        store.currentY = ++store.currentY
      } else {
        store.freeze(store)
        store.valid(store, 0, 1)
        store.clearLines(store)
        if (store.lose) {
          store.clearAllIntervals(store)
          return false
        }
        store.newShape(store)
      }
    }
  }
})
