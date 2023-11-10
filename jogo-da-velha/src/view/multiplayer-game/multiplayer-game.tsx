import { View, Alert, ActivityIndicator } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack/";
import { StackNavigatorParams } from '../../configs/navigator';
import { useAuth } from '../../contexts/auth-context';
import { BoardState, Moves, isTerminal, useSounds } from '../../utils';
import { getGame, startGame, playMove  } from "./multiplayer-game.graphql";
import { GetGameQuery, PlayMoveMutation, StartGameMutation } from "../../API";
import {GraphQLResult} from '@aws-amplify/api/lib'
import { BackgroundPage, Board, ButtonComponent, Text } from '../../components';
import { API, graphqlOperation } from 'aws-amplify';
import getErrorMessage from '../../utils/ts/getErrorMessage';
import Observable from 'zen-observable';
import { onUpdateGameById } from '../../utils/ts/common.graphql';


type GameType = GetGameQuery["getGame"];

type MultiplayerGameScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParams,
    'MultiplayerGame'
>;
type MultiplayerGameScreenRouteProp = RouteProp<StackNavigatorParams, 'MultiplayerGame'>;

type MultiPlayerGameProps = {
    navigation: MultiplayerGameScreenNavigationProp;
    route: MultiplayerGameScreenRouteProp;
};

export default function MultiplayerGame({ navigation, route }: MultiPlayerGameProps) : ReactElement {
  
    const { gameID: existingGameID, invitee } = route.params;
    const [gameID, setGameID] = useState<string | null>(null);
    const [game, setGame] = useState<GameType | null>(null);
    const [loading, setLoading] = useState(false);
    const [playingTurn, setPlayingTurn] = useState<Moves | false>(false);
    const { user } = useAuth();
    const gameResult = game ? isTerminal(game.state as BoardState) : false;
    const playSound = useSounds();
    const opponentUsername = game && user && game.owners.find(p => p !== user.username);

    /**
     * The `initGame` function is an asynchronous function that initializes a game by starting a new
     * game or retrieving an existing game from the server.
     */
    const initGame = async () => {
      setLoading(true)
      let gameID = existingGameID;
      
      try {
         /* This code block is checking if the `gameID` is null or undefined. If it is, it means that a
         new game needs to be started. */
          if (!gameID) {
              const startGameRes = (await API.graphql(
                  graphqlOperation(startGame, {
                      invitee
                  })
              )) as GraphQLResult<StartGameMutation>;
              
              if (startGameRes.data?.startGame) {
                gameID = startGameRes.data.startGame.id;
              }
          }

        /* This code block is checking if the `gameID` is not null or undefined. If it is not null or
        undefined, it means that a game already exists and we need to retrieve the game data from
        the server. */
          if (gameID) {
            const getGameRes = (await API.graphql(
                graphqlOperation(getGame, {
                    id: gameID
                })
            )) as GraphQLResult<GetGameQuery>;
              
            if (getGameRes.data?.getGame) {
              setGame(getGameRes.data.getGame);
              setGameID(gameID);
            }
        }
          
      } catch (error) {
        
          Alert.alert("Error!", getErrorMessage(error as any));
      }
      setLoading(false)
    };

 /**
  * The function `playTurn` is an asynchronous function that updates the game state and makes a move in
  * a game.
  * @param {Moves} index - The `index` parameter is the move index that is being played. It is used to
  * identify the specific move being played in the `playMove` mutation.
  */
  const playTurn = async (index: Moves) => {
    setPlayingTurn(index);
    try {
        const playMoveRes = (await API.graphql(
            graphqlOperation(playMove, {
                index,
                game: gameID
            })
        )) as GraphQLResult<PlayMoveMutation>;
        
        if (game && playMoveRes.data?.playMove) {
            const { status, state, winner, turn } = playMoveRes.data.playMove;
            setGame({ ...game, status, state, winner, turn });
        }
    } catch (error) {
        Alert.alert("Error!", getErrorMessage(error as any));
    }
    setPlayingTurn(false);
  };


/* The `useEffect` hook is used to subscribe to updates on a game. It listens for changes in the game
state and updates the local game state accordingly. */
  useEffect(() => {
    if (game && (game.status === "REQUESTED" || game.status === "ACTIVE")) {
     /* is creating an observable
     subscription to listen for updates on a specific game. */
      const gameUpdates = (API.graphql(
          graphqlOperation(onUpdateGameById, {
              id: gameID
          })
      ) as unknown) as Observable<{ [key: string]: any }>;

      /* The code `const subscription = gameUpdates.subscribe({ ... })` is creating a subscription to
      listen for updates on a specific game. */
      const subscription = gameUpdates.subscribe({
          next: ({ value }) => {
              const newGame = value.data.onUpdateGameById;
              if (newGame && game) {
                  const { status, state, winner, turn } = newGame;
                  setGame({ ...game, status, state, winner, turn });
                  if (user) {
                      user.username === turn ? playSound("pop1") : playSound("pop2");
                  }
              }
          }
      });

      return () => {
          subscription.unsubscribe();
      };
    } 
  }, [gameID]);

  /* The `useEffect` hook is used to call the `initGame` function when the component is first rendered.
  The empty dependency array `[]` ensures that the `initGame` function is only called once, when the
  component is mounted. */
  useEffect(() => {
    initGame()
   }, [])
  
    
  return (
    <BackgroundPage>
      {loading && 
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
               <ActivityIndicator color={"#000"}/>
          </View>
      }
      {game && 
        <View style={{marginTop: 60}}>
          {(game?.status) && (
                <Text style={{ color: "#000", textAlign: "center", marginBottom: 30 }}>
                    {game.turn === user?.username
                        ? `É sua vez:  ${user.username}`
                        : `Esperando pela jogada de: ${opponentUsername}`}
                </Text>
            )}
          <Board 
              loading={playingTurn} 
              size={350} 
              state={game.state as BoardState} 
              onCellPress={(index)=>{
                playTurn(index as Moves)
              }

              
              } 
              gameResult={gameResult}
              disabled={
                game.turn !== user?.username ||
                playingTurn !== false ||
                (game.status !== "ACTIVE" && game.status !== "REQUESTED")
              }
            />
        </View>
      }
        {game && user && game.status === "FINISHED" && (
                          <View style={{width: 350, height: 140, backgroundColor: 'rgba(218, 57, 65, 0.51)', position: 'absolute', bottom: 90, marginHorizontal: 10, borderRadius: 20, paddingHorizontal:10}}>
                              <Text style={{textAlign: 'center', marginTop: 15, marginBottom: 30, fontSize: 18}}>
                                  {game.winner === user.username && "Você venceu 🎉"}
                                  {game.winner === opponentUsername && "Você perdeu 😄"}
                                  {game.winner === null && "Empate 😲"}
                              </Text>
                              <ButtonComponent
                                onPress={() => {
                                  if (opponentUsername) {
                                    navigation.replace('MultiPlayerHome');
                                  }
                                } }
                                title="Voltar para tela inicial" 
                                loading={false} 
                                style={undefined} 
                                styleText={undefined}                              
                                />
                          </View>
          )}
    </BackgroundPage>
  )
}