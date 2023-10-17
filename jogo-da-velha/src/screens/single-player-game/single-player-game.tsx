import React, { ReactElement, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "./single-player-game.styles";
import { BackgroundPage } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Board } from '../../components'
import {getBestMove,printFormateBoard, isEmpy,isFull,isTerminal,getAvailableMoves, BoardState} from '../../utils'


export default function SinglePlayerGame() : ReactElement{

    const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null
    ]);

    const [turn,setTurn] = useState <"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    
    const gameResult = isTerminal(state);

    const insertCell = (cell: number, symbol:"x" | "o" ) : void => 
    {
            const stateCopy: BoardState = [...state];
            if (stateCopy[cell] || isTerminal(stateCopy))
            return;
            stateCopy[cell] = symbol;
            setState(stateCopy);
    }


    const handleOnCellPressed = (cell: number): void => {
        if(turn !== "HUMAN") return;
        insertCell(cell,isHumanMaximizing ? "x" : "o");
        setTurn("BOT");
    };
        useEffect(() => {
            if(gameResult){
                alert("Game over");
            }else{
                if(turn === "BOT"){
                    if(isEmpy(state)){
                        const centerAndCorners = [0,2,6,8,4];
                        const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)]
                        insertCell(firstMove, "x");
                        setIsHumanMaximizing(false);
                        setTurn("HUMAN");


                    }else {
                        const best = getBestMove(state, !isHumanMaximizing,0,-1);

                        insertCell(best, isHumanMaximizing ? "o" : "x");
                        setTurn("HUMAN");

                    }
                }
            }
        }, [state, turn])

    return(
        <BackgroundPage>
            <SafeAreaView style= {styles.container}>
                
                <Board 
                    disabled = {Boolean(isTerminal(state)) || turn !== "HUMAN" }
                    onCellPressed = {(cell) => {
                        handleOnCellPressed(cell)
                }} 
                
                state= {state}
                size={400}
                />

                
            </SafeAreaView>
        </BackgroundPage>
    )

}