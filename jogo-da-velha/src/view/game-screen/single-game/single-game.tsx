import React, { ReactElement, useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, View, Dimensions, Image, Button} from 'react-native';
import BackgroundPage  from "../../../components/background-page/background-page";
import { Board, Text } from '../../../components';
import styles from './single-game-styles.styles';
import { BoardState, Cell, getBestMove, isEmpty, isTerminal, useSounds } from '../../../utils';
import { useSettings, difficulties } from '../../../contexts/settings-context';


const widthSreen = Dimensions.get("screen").width;


export default function SinglePlayerGame(): ReactElement{
    const [state, setState] = useState<BoardState>([
        null, null, null,
        null, null, null,
        null, null, null
    ]);
    const playSound = useSounds();
    const {settings} = useSettings();
    const [turn, setTurn] = useState<'human' | 'bot'>(Math.random() < 0.5 ? 'human' : 'bot');
    const [isHumanMaximizing, setIsHumanMaximizing] = useState<boolean>(true);
    const gameResult = isTerminal(state);
    const [gamesCount, setGamesCount] = useState({
        wins: 0,
        losses: 0,
        draws: 0
    });

    
   /**
    * The `insertCell` function updates the state of a board by inserting a symbol ("x" or "o") into a
    * specific cell, and plays a sound based on the symbol inserted.
    * @param {number} cell - The `cell` parameter represents the index of the cell in the `state` array
    * where the symbol will be inserted.
    * @param {"x" | "o"} symbol - The `symbol` parameter is a string that can only have two possible
    * values: "x" or "o". It represents the symbol that will be inserted into the cell.
    * @returns The function `insertCell` does not return anything. It has a return type of `void`,
    * which means it does not return any value.
    */
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

    /**
     * The function `getWinner` determines the winner of a game based on the symbol and whether the
     * human player is maximizing.
     * @param {Cell} winnerSymbol - The `winnerSymbol` parameter represents the symbol of the winning
     * player in a game. It can be either "x" or "o".
     * @returns The function `getWinner` returns one of three possible values: 'human', 'bot', or
     * 'draw'.
     */
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

    const newGame = () => {
        setState([null, null, null, null, null, null, null, null, null]);
        setTurn(Math.random() < 0.5 ? 'human' : 'bot');
    };

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is being used to update the game state and handle the game logic. */
    useEffect(() => {
        if (gameResult) {
            const winner = getWinner(gameResult.winner);
            if (winner === 'human') {
                playSound("win");
                setGamesCount({ ...gamesCount, wins: gamesCount.wins + 1 });
               
            }
            if (winner === 'bot') {
                playSound("loss");
                setGamesCount({ ...gamesCount, losses: gamesCount.losses + 1 });
            }
            if (winner === 'draw') {
                playSound("draw");
                setGamesCount({ ...gamesCount, draws: gamesCount.draws + 1 });
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
                        parseInt(settings ? settings.difficulty : '-1')
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
                        <Image style={styles.logo} source={require('../../../utils/assets/logo-app.png')} />
                        <View>
                            <Text style={styles.difficulty}>
                            Dificuldade: {settings ? difficulties[settings.difficulty] : "Impossivel"}
                            </Text>
                            <View style={styles.results}>
                                <View style={styles.resultsBox}>
                                    <Text style={styles.resultsTitle}>Vitórias</Text>
                                    <Text style={styles.resultsCount}>{gamesCount.wins}</Text>
                                </View>
                                <View style={styles.resultsBox}>
                                    <Text style={styles.resultsTitle}>Empates</Text>
                                    <Text style={styles.resultsCount}>{gamesCount.draws}</Text>
                                </View>
                                <View style={styles.resultsBox}>
                                    <Text style={styles.resultsTitle}>Derrotas</Text>
                                    <Text style={styles.resultsCount}>{gamesCount.losses}</Text>
                                </View>
                            </View>
                        </View>
                        <Board 
                            disabled = {Boolean(isTerminal(state)) || turn != 'human'}
                            
                            onCellPress={(index)=>{
                                handleOnCellPressed(index);
                            }}
                            gameResult = {gameResult}
                            state={state} size={widthSreen - 60 }
                        />
                    {gameResult && (
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>
                            {getWinner(gameResult.winner) === 'human' && "Você venceu 🎉"}
                            {getWinner(gameResult.winner) === 'bot' && "🤖 Você perdeu 😄 "}
                            {getWinner(gameResult.winner) === 'draw' && "Empate 😲"}
                                { }
                            
                            </Text>
                            <Button
                                onPress={() => {
                                    newGame();
                                }}
                                title="Jogar novamente"
                            />
                        </View>
                    )}
                    </View>
                </BackgroundPage>
            </ScrollView>
        </SafeAreaView>
    )
}