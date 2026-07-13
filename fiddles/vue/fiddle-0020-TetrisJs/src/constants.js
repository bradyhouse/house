export const INPUT = {
  KEY_LEFT: 'left',
  KEY_RIGHT: 'right',
  KEY_UP: 'up',
  KEY_DOWN: 'down',
  CMD_ROTATE: 'rotate',
  CMD_DROP: 'drop'
}

export const KEYS = {
  37: 'left',
  39: 'right',
  40: 'down',
  38: 'rotate',
  32: 'drop'
};

export const ROWS = 30

export const COLS = 50

export const SHAPES = [
  [1, 1, 1, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 1, 1],
  [0, 1, 1, 0, 1, 1],
  [0, 1, 0, 0, 1, 1, 1]
]

export const COLORS = ['cyan', 'orange', '#2323FF', '#FFD700', '#F72119', '#39ff14', 'purple'];

