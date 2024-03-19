import { QUANTITY } from '../consts';

export const createNewBoard = () => {
  return Array.from({ length: QUANTITY }, () => Array(QUANTITY).fill(false))
}