import React, { ReactElement, useState, useEffect, useRef } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import BackgroundPage  from "../../../components/background-page/background-page";
import { Board } from '../../../components';
import styles from './single-game-styles.styles';
import { BoardState, Cell, getBestMove, isEmpty, isTerminal, useSounds } from '../../../utils';


export default function SinglePlayerGame(): ReactElement{
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null
    ]);
    const playSound = useSounds();
    const [turn, setTurn] = useState<'human' | 'bot'>(Math.random() < 0.5 ? 'human' : 'bot');
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const gameResult = isTerminal(state);

    
    const insertCell = (cell: number, symbol: "x" | "o"): void => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy)) return;
        stateCopy[cell] = symbol;
        setState(stateCopy);
       
        try {
            symbol === "x" ? playSound("pop1") : playSound("pop2");
        } catch (error) {
            console.log(error);
        }
    };

    const getWinner = (winnerSymbol: Cell): 'human' | 'bot' | 'draw' => {
        if (winnerSymbol === "x") {
            return isHumanMaximizing ? 'human' : 'bot';
        }
        if (winnerSymbol === "o") {
            return isHumanMaximizing ? 'bot' : 'human';
        }
        return 'draw';
    };

    const handleOnCellPressed = (cell: number): void => {
        if (turn !== 'human') return;
        insertCell(cell, isHumanMaximizing ? "x" : "o");
        setTurn('bot');
    };

    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);
            if (winner === 'human') {
                playSound("win");
               
            }
            if (winner === 'bot') {
                playSound("loss");
            }
            if (winner === 'draw') {
                playSound("draw");
            }
           
        } else{
            if (turn === 'bot') {
                if (isEmpty(state)) {
                    const centerAndCorners = [0, 2, 6, 8, 4];
                    const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                    insertCell(firstMove, "x");
                    setIsHumanMaximizing(false);
                    setTurn('human');
                } else{
                    const best = getBestMove(
                        state,
                        !isHumanMaximizing,
                        0,
                    );
                    insertCell(best, isHumanMaximizing ? "o" : "x");
                    setTurn('human');
                }
            }
        }
    }, [state, turn])
    
    return (
        <SafeAreaView>
            <ScrollView > 
                <BackgroundPage>
                    <View style={styles.container}>
                        <Board 
                            disabled = {Boolean(isTerminal(state)) || turn != 'human'}
                            onCellPress={(index)=>{
                                handleOnCellPressed(index);
                            }}
                            state={state} size={300}/>
                    </View>
                </BackgroundPage>
            </ScrollView>
        </SafeAreaView>
    )
}