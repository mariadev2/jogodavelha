import React, { ReactElement, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "./single-player-game.styles";
import { BackgroundPage } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Board } from '../../components'
import {printFormateBoard, isEmpy,isFull,isTerminal,getAvailableMoves, BoardState} from '../../utils'


export default function SinglePlayerGame() : ReactElement{
    const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null

    ])
    ///printFormateBoard(b);
    //console.log(isTerminal(b));
    //console.log(isEmpy(b));
    //console.log(isFull(b));
    //console.log(getAvailableMoves(b));
    const handleOnCellPressed = (cell: number): void => {
        const stateCopy: BoardState = [...state];
        if (stateCopy[cell] || isTerminal(stateCopy))
        return;
        stateCopy[cell] = "x";
        setState(stateCopy);
    };
    return(
        <BackgroundPage>
            <SafeAreaView style= {styles.container}>
                
                <Board 
                    disabled = {Boolean(isTerminal(state))}
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