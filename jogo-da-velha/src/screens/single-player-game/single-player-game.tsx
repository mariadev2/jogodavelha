import React, { ReactElement, useEffect, useState, useRef } from "react";
import { View, Text, Button } from "react-native";
import styles from "./single-player-game.styles";
import { BackgroundPage } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Board } from '../../components'
import {getBestMove, isEmpy,isFull,isTerminal,getAvailableMoves, BoardState, Cell} from '../../utils'
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';


export default function SinglePlayerGame() : ReactElement{

    const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null
    ]);

    const [turn,setTurn] = useState <"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);
    const lostSoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);

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
                ? popSoundRef.current?.replayAsync():
                 pop2SoundRef.current?.replayAsync();
                 drawSoundRef.current?.replayAsync();
                 winSoundRef.current?.replayAsync();
                 lostSoundRef.current?.replayAsync();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);


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
            return isHumanMaximizing ? "HUMAN" : "BOT";
        }
        return "DRAW";
    };
        useEffect(() => {
            if(gameResult){
                const winner = getWinner(gameResult.winner);
                if(winner === "HUMAN"){
                    try{
                    winSoundRef.current?.replayAsync();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    }catch (error){
                        console.log(error);
                    }
                    setTimeout(() => {
                        alert('Você venceu!')
        
                    }, 200);                }
                if(winner === "BOT"){
                    try{
                        lostSoundRef.current?.replayAsync();
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        }catch (error){
                            console.log(error);
                        }
                        setTimeout(() => {
                            alert('Você perdeu!')
            
                        }, 200);
                }
                if(winner === "DRAW"){
                    try{
                        drawSoundRef.current?.replayAsync();
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        }catch (error){
                            console.log(error);
                        }
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
                            -1);

                        insertCell(best, isHumanMaximizing ? "o" : "x");
                        setTurn("HUMAN");

                    }
                }
            }
        }, [state, turn]);
    
    useEffect(() => {
        
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();
        const lostSoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();

        const LoadSounds = async () => {

            await popSoundObject.loadAsync(require
            ('../../components/sons/click1.mp3'));
            popSoundRef.current = popSoundObject;

            await pop2SoundObject.loadAsync(require
                ('../../components/sons/click.mp3'));
                pop2SoundRef.current = pop2SoundObject;

            await drawSoundObject.loadAsync(require
                ('../../components/sons/draw.mp3'));
                drawSoundRef.current = drawSoundObject;

            await lostSoundObject.loadAsync(require
                ('../../components/sons/lost.mp3'));
                lostSoundRef.current = lostSoundObject;

            await winSoundObject.loadAsync(require
                ('../../components/sons/win.mp3'));
                winSoundRef.current = winSoundObject;
            

        };
        LoadSounds();

        return () => {
            pop2SoundObject && pop2SoundObject.unloadAsync();
            popSoundObject && popSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
            lostSoundObject && lostSoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();

        };

    }, []);
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
                size={400}
                />

                
            </SafeAreaView>
        </BackgroundPage>
    )

}