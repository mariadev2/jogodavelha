import React, { ReactElement, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import  Text  from "../../components/text/text";
import { useAuth } from "../../contexts/auth-context";
import { PlayerGameType } from "./multiplayer-home.graphql";
import styles from "./multiplayer-home.styles";
import { API, graphqlOperation } from "aws-amplify";
import Observable from "zen-observable"
import colors from "../../utils/ts/colors";
import { onUpdateGameById } from "../../utils/ts/common.graphql";



type GameItemProps = {
    playerGame: PlayerGameType;
    onPress: () => void;
};

export default function GameItem({
    playerGame: playerGameProp,
    onPress 
}: GameItemProps): ReactElement | null {
    const [playerGame, setPlayerGame] = useState(playerGameProp);
    const { user } = useAuth();
    if (!user || !playerGame) return null;
    /**
     * The function `getResult` takes a `playerGame` object and returns the result of the game (win,
     * loss, draw) based on the game status and the username of the player.
     * @param {PlayerGameType} playerGame - The `playerGame` parameter is of type `PlayerGameType`. It
     * represents a game played by a player and contains information about the game, such as the
     * status, players, and winner.
     * @returns The function `getResult` returns one of the following values: "win", "loss", "draw", or
     * false.
     */
    const getResult = (playerGame: PlayerGameType): "win" | "loss" | "draw" | false => {
        if (!playerGame || !user) return false;

        const game = playerGame.game;
        if (game.status !== "FINISHED") return false;
        const opponent = game?.players?.items?.find(
            playerGame => playerGame?.player?.username !== user.username
        );
        if (game.winner === user.username) return "win";
        if (game.winner === opponent?.player?.username) return "loss";
        if (game.winner === null) return "draw";
        return false;
    };
    const game = playerGame?.game;
    const result = getResult(playerGame);

    const opponent = game?.players?.items?.find(
        playerGame => playerGame?.player?.username !== user.username
    );

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to subscribe to updates for a specific game. */
    useEffect(() => {
        
        if (game && (game.status === "REQUESTED" || game.status === "ACTIVE")) {
            const gameUpdates = (API.graphql(
                graphqlOperation(onUpdateGameById, {
                    id: game.id
                })
            ) as unknown) as Observable<{ [key: string]: any }>;
           

            const subscription = gameUpdates.subscribe({
                next: ({ value }) => {
                    const newGame = value.data.onUpdateGameById;
                    if (newGame) {
                        setPlayerGame({
                            ...playerGame,
                            ["game"]: { ...playerGame?.game, ...newGame }
                        });
                        if (newGame.status === "FINISHED") {
                            subscription.unsubscribe();
                        }
                    }
                }
            });

            return () =>{
                subscription.unsubscribe();
            }
        }
    }, []);
    

    return (
        <TouchableOpacity style={styles.cardHistory} onPress={onPress}>
            <Text style={styles.textHistory} >
                {opponent?.player.name} ({opponent?.player.username})
            </Text>
            {(game?.status === "REQUESTED" || game?.status === "ACTIVE") && (
                <Text style={{ color: "#000", textAlign: "center" }}>
                    {game.turn === user.username
                        ? "Sua vez!"
                        : `Esperando por ${opponent?.player.username}`}
                </Text>
            )}
            {result && (
                <Text style={{ color: colors[result], textAlign: "center" }}>
                    {result === "win" && "Você ganhou!"}
                    {result === "loss" && "Você perdeu!"}
                    {result === "draw" && "Empate!"}
                </Text>
            )}
        </TouchableOpacity>
    );
}