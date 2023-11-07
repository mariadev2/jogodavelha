export type Cell = 'x' | 'o' | null;
export type BoardState = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export type Moves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardResult = {
    winner: Cell;
    direction? : 'V'| 'D' | 'H';
    column? : 1 | 2 | 3;
    row? : 1 | 2 | 3;
    diagonal?: 'main' | 'counter'
}
