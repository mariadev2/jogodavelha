import {  getAvailableMoves, isTerminal } from "./board";
import { BoardState } from "./board-types";

/**
 * The `getBestMove` function is a recursive algorithm that determines the best move for a player in a
 * game of Tic-Tac-Toe.
 * @param {BoardState} state - The `state` parameter represents the current state of the game board. It
 * is of type `BoardState`, which is an array of strings representing the cells of the board. Each
 * string can be either "x", "o", or an empty string "".
 * @param {boolean} maximizing - A boolean value indicating whether the current player is maximizing or
 * not. If it is true, it means it is the maximizing player's turn, otherwise it is the minimizing
 * player's turn.
 * @param [depth=0] - The `depth` parameter represents the current depth of the recursive function. It
 * is used to keep track of how deep the function has gone in the game tree.
 * @param maxDeph - The `maxDepth` parameter represents the maximum depth of the game tree that the
 * algorithm will search. It determines how many moves ahead the algorithm will consider when
 * evaluating the best move. If `maxDepth` is set to -1, it means that the algorithm will search the
 * entire game tree until a
 * @returns The function `getBestMove` returns the best move (index) to make based on the current state
 * of the board.
 */
export const getBestMove = (state: BoardState, maximizing: boolean, depth = 0, maxDeph = -1): number =>{
    const childValues: { [key: string]: string } = {};

    const getBestMoveRecursive = (
        state: BoardState,
        maximizing: boolean,
        depth = 0,
        maxDepth = -1
    ): number => {
        const terminalObject = isTerminal(state);
       /* The code block you provided is part of the `getBestMoveRecursive` function and is used to
       determine the value of a terminal state or a state at the maximum depth of the game tree. */
        if (terminalObject || depth === maxDepth) {
            if (terminalObject && terminalObject.winner === "x") {
                return 100 - depth;
            } else if (terminalObject && terminalObject.winner === "o") {
                return -100 + depth;
            }
            return 0;
        }

        /* The code block you provided is part of the `getBestMove` function and is responsible for
        determining the best move for the current player in a game of Tic-Tac-Toe. */
        if (maximizing) {
            let best = -100;
            getAvailableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "x";
                const childValue = getBestMoveRecursive(child, false, depth + 1, maxDepth);
                best = Math.max(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]? `${childValues[childValue]},${index}` : `${index}`;
                }
            });
            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }
            return best;
        } else {
            let best = 100;
            getAvailableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = "o";
                const childValue = getBestMoveRecursive(child, true, depth + 1, maxDepth);
                best = Math.min(best, childValue);
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue]? `${childValues[childValue]},${index}` : `${index}`;
                }
            });
            if (depth === 0) {
                const arr = childValues[best].split(",");
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }
            return best;
        }
    };
    return getBestMoveRecursive(state, maximizing, depth, maxDeph);
}