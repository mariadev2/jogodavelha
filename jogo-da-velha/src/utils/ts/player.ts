import { getAvaliableMoves, isTerminal } from "./board";
import { BoardState } from "./board-types";

export const getBestMove = (state: BoardState, maximizing: boolean, depth = 0, maxDeph = -1): number =>{
    const childValues: {[key: string]: string} = {}
    const getBestMoveRecursive = (state: BoardState, maximizing: boolean, depth = 0, maxDeph = -1): number =>{
        const terminalObject = isTerminal(state);
    
        if (terminalObject || depth === maxDeph) {
            if (terminalObject && terminalObject.winner === 'x') {
                return 100 - depth;
            }else if (terminalObject && terminalObject.winner === 'o') {
                return -100 + depth;
            }
            return 0;
        }

        if (maximizing) {
            let best = -100;
            getAvaliableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = 'x';
                const childValue = getBestMoveRecursive(child, false, depth + 1, maxDeph);
                best = Math.max(best, childValue)
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue] ? `${childValues[childValue]}, ${index}` : `${index}`;
                }
            });

            if (depth === 0) {
                const arr = childValues[best].split(",")
                const rand = Math.floor(Math.random() * arr.length);
                return parseInt(arr[rand]);
            }

            return best;
        } else {
            let best = 100;
            getAvaliableMoves(state).forEach(index => {
                const child: BoardState = [...state];
                child[index] = 'o';
                const childValue = getBestMoveRecursive(child, true, depth + 1, maxDeph);
                best = Math.min(best, childValue)
                if (depth === 0) {
                    childValues[childValue] = childValues[childValue] ? `${childValues[childValue]}, ${index}` : `${index}`;
                }
            });

            return best;
        }
    }

    return getBestMoveRecursive(state, maximizing, depth, maxDeph);
}