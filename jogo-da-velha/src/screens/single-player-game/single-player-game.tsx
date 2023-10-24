import React, { ReactElement, useEffect, useState, useRef } from "react";
import styles from "./single-player-game.styles";
import { Dimensions, View } from "react-native";
import { BackgroundPage, Button } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Board } from '../../components'
import {getBestMove, isEmpy,isTerminal,getAvailableMoves, BoardState, Cell} from '../../utils'
import useSound from "../../utils/useSound";
import Text from "../../components/text/text";

const screen_width = Dimensions.get("screen").width;

export default function SinglePlayerGame() : ReactElement{

    const [state, setState] = useState<BoardState>([
        null,null,null,
        null,null,null,
        null,null,null
    ]);

    const [turn,setTurn] = useState <"HUMAN" | "BOT">(Math.random() < 0.5 ? "HUMAN" : "BOT");
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    useState<boolean>(true);
    const [gameCount, setGameCount] = useState({
        wins: 0,
        losts: 0,
        draws: 0

    });
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

    const newGme = () => {
        setState([null,null,null,null,null,null,null,null,null]);
        setTurn(Math.random() < 0.5 ? "HUMAN" : "BOT");
    }
        useEffect(() => {
            if(gameResult){
                const winner = getWinner(gameResult.winner);
                if(winner === "HUMAN"){
                    playSound("win");
                    setGameCount({...gameCount, wins: gameCount.wins + 1});
                    
                
                }

                if(winner === "BOT"){
                    playSound("lost")
                    setGameCount({...gameCount, losts: gameCount.losts + 1});

            
                }

                if(winner === "DRAW"){
                    playSound("draw")
                    setGameCount({...gameCount, draws: gameCount.draws + 1});

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
                <View>
                    <Text style={styles.dificuldade}>
                        Dificuldade: Hard
                    </Text>
                </View>

                <View style={styles.results}>
                    <View style={styles.resultsBox}>
                        <Text style={styles.resultTitles}>
                            Vitórias
                        </Text>
                        <Text style={styles.resultCount}>{gameCount.wins}
                        </Text>
                    </View>

                    <View style={styles.resultsBox}>
                        <Text style={styles.resultTitles}>
                            Empates
                        </Text>
                        <Text style={styles.resultCount}>{gameCount.draws}
                        </Text>
                    </View>

                    <View style={styles.resultsBox}>
                        <Text style={styles.resultTitles}>
                            Perdas
                        </Text>
                        <Text style={styles.resultCount}>{gameCount.losts}
                        </Text>
                        </View>
                </View>

                <Board 
                    disabled = {Boolean(isTerminal(state)) || turn !== "HUMAN" }
                    onCellPressed = {cell => {
                        console.log(cell)
                        handleOnCellPressed(cell);
                }} 
                
                state= {state}
                gameResult= {gameResult}
                size={screen_width - 800}

                />
                {gameResult && (
                <View style={styles.modal}>
                    <Text style={styles.modalText}>
                        {getWinner(gameResult.winner)===
                        "HUMAN" && "PARABÉNS!\nVOCÊ GANHOU!"}

                        {getWinner(gameResult.winner)===
                        "BOT" && "OH NO, VOCÊ PERDEU!"}

                        {getWinner(gameResult.winner)===
                        "DRAW" && "Empate!!"}
                    </Text>
                    <Button style={styles.button}
                    onPress = {() => 
                        {
                            newGme()
                        }}
                        title="Jogar Novamente"/>
                </View>
                )}
            </SafeAreaView>
        </BackgroundPage>
    )

}