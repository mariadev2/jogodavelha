import React, { ReactElement, useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import styles from "./single-player-game.styles";
import { BackgroundPage, Button } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Board } from '../../components'
import {getBestMove, isEmpy,isTerminal,getAvailableMoves, BoardState, Cell} from '../../utils'
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import useSound from "../../utils/useSound";



export default function SinglePlayerGame() : ReactElement{

    const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null
    ]);

    const [turn,setTurn] = useState <"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const playSound = useSound();
    
    const gameResult = isTerminal(state);

    const insertCell = (cell: number, symbol:"x" | "o" ) : void => 
    {
            const stateCopy: BoardState = [...state];
            if (stateCopy[cell] || isTerminal(stateCopy))
            return;
            stateCopy[cell] = symbol;
            setState(stateCopy);

            try {
                symbol === "x" 
                playSound("pop2");
            } catch(error){
                console.log(error);
            }
    };


    const handleOnCellPressed = (cell: number): void => {
        console.log(cell)
        if(turn !== "HUMAN") return;
        insertCell(cell,isHumanMaximizing ? "x" : "o");
        setTurn("BOT");
    };

    const getWinner = (winnerSymbol : Cell): "HUMAN" | "BOT" | "DRAW" => {
        if(winnerSymbol === "x"){
            return isHumanMaximizing ? "HUMAN" : "BOT";
        }
        if(winnerSymbol === "o"){
            return isHumanMaximizing ? "BOT" : "HUMAN";
        }
        return "DRAW";
    };
        useEffect(() => {
            if(gameResult){
                const winner = getWinner(gameResult.winner);
                if(winner === "HUMAN"){
                    playSound("win");
                    setTimeout(() => {
                        alert('Você venceu!')
        
                    }, 200);                }
                if(winner === "BOT"){
                    playSound("lost")
                    setTimeout(() => {
                        alert('Você perdeu!')
            
                    }, 200);
                }
                if(winner === "DRAW"){
                    playSound("draw")

                    setTimeout(() => {
                        alert('Empate!')
                    }, 200);
                }


            }else{
                if(turn === "BOT"){
                    if(isEmpy(state)){
                        const centerAndCorners = [0,2,6,8,4];
                        const firstMove = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
                        insertCell(firstMove, "x");
                        setIsHumanMaximizing(false);
                        setTurn("HUMAN");


                    }else {
                        const best = getBestMove(
                            state, 
                            !isHumanMaximizing,
                            0,
                            2);

                        insertCell(best, isHumanMaximizing ? "o" : "x");
                        setTurn("HUMAN");

                    }
                }
            }
        }, [state, turn]);
    
    
    return(
        <BackgroundPage>
            <SafeAreaView style= {styles.container}>
                

                <Board 
                    disabled = {Boolean(isTerminal(state)) || turn !== "HUMAN" }
                    onCellPressed = {cell => {
                        console.log(cell)
                        handleOnCellPressed(cell);
                }} 
                
                state= {state}
                gameResult= {gameResult}
                size={400}
                />
                <Button style={styles.button} onPress= {() => alert(true)} title="NOVO JOGO"/>
                
            </SafeAreaView>
        </BackgroundPage>
    )

}