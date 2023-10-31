import { View, Text } from 'react-native'
import React, { ReactElement, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack/";
import { StackNavigatorParams } from '../../configs/navigator';
import { useAuth } from '../../contexts/auth-context';
import { BoardState, Moves, isTerminal, useSounds } from '../../utils';
import { GetGameQuery } from "../../API";


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

export default function MultiplayerGame({ navigation }: MultiPlayerGameProps) : ReactElement {
 
    const [gameID, setGameID] = useState<string | null>(null);
    const [game, setGame] = useState<GameType | null>(null);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [playingTurn, setPlayingTurn] = useState<Moves | false>(false);
    const { user } = useAuth();
    const gameResult = game ? isTerminal(game.state as BoardState) : false;
    const playSound = useSounds();
    const opponentUsername = game && user && game.owners.find(p => p !== user.username);
    const player1 = game?.players?.items && game?.players?.items[0];
    const player2 = game?.players?.items && game?.players?.items[1];

    const isActive = () => {
        return game && (game.status === "ACTIVE" || game.status === "REQUESTED");
    };
  return (
    <View>
      <Text>MultiplayerGame</Text>
    </View>
  )
}