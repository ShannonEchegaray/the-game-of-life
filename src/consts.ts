export const STEP = 1;
export const QUANTITY = 60;
export const CELL_SIZE = 8;
export const BOARD_SIZE = QUANTITY * CELL_SIZE + (QUANTITY - 1) * STEP;
export const SIDES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]