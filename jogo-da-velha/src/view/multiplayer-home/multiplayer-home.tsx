import { View, Text, Alert, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { BackgroundPage, ButtonComponent } from '../../components'
import styles from './multiplayer-home.styles'
import { useAuth } from '../../contexts/auth-context';
import { PlayerGameType, getPlayer } from './multiplayer-home.graphql';
import { API, graphqlOperation } from 'aws-amplify'
import {GraphQLResult} from '@aws-amplify/api/lib'
import { GetPlayerQuery } from '../../API'
import GameItem from './game';
import Modal from "react-native-modal";
import PlayersModal from './players-modal/players-modal';
import { StackNavigatorParams } from '../../configs/navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MultiPlayerHomeScreenNavigationProp = NativeStackNavigationProp<
    StackNavigatorParams,
    "MultiPlayerHome"
>;
type MultiPlayerHomeProps = {
    navigation: MultiPlayerHomeScreenNavigationProp;
};




export default function MultiPlayerHome({ navigation }: MultiPlayerHomeProps) : ReactElement {
    const { user } = useAuth();
    
    const [playerGames, setPlayerGames] = useState<PlayerGameType[] | null>(null);
    const [nextToken, setNextToken] = useState<string | null | undefined>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [playersModal, setPlayersModal] = useState(false);
    

    /**
     * The function fetchPlayer is an asynchronous function that retrieves player data from an API and
     * updates the state with the retrieved data.
     * @param {string | null} nextToken - The `nextToken` parameter is a string that represents a token
     * used for pagination. It is used to fetch the next set of results from a paginated API endpoint.
     * If `nextToken` is `null`, it means that there are no more results to fetch.
     * @param [init=false] - The `init` parameter is a boolean value that indicates whether this is the
     * initial fetch or not. It is used to determine whether to show a loading indicator or not. If
     * `init` is `true`, it means it is the initial fetch and the loading indicator should be shown. If
     * `init
     */
    const fetchPlayer = async (nextToken: string | null, init = false) => {
        if (user) {
            if (nextToken == null && !init) {
                setRefreshing(true);
            }
            try {
                const player = (await API.graphql(
                    graphqlOperation(getPlayer, {
                        username: user.username,
                        limit: 1,
                        sortDirection: "DESC",
                        nextToken
                    })
                )) as GraphQLResult<GetPlayerQuery>;
                if (player.data?.getPlayer?.games) {
                    const newPlayerGames = player?.data?.getPlayer?.games?.items || [];
                    setPlayerGames(
                        !playerGames || nextToken === null
                            ? newPlayerGames
                            : [...playerGames, ...newPlayerGames]
                    );
                    setNextToken(player.data.getPlayer.games.nextToken);
                   
                }
            } catch (error) {
                Alert.alert("Erro!", "Aconteceu um erro!");
            }
            setRefreshing(false);
        }
        
    };
    
    useEffect(()  => {
          fetchPlayer(null, true);
          
    }, []);

    return (
        <BackgroundPage withoutScroll={true}>
            {
                user ? (<View style={styles.container}>
                            <FlatList 
                                data={playerGames} 
                                renderItem={({item})=> 
                                <GameItem onPress={()=>{
                                        if (item?.game) {
                                            navigation.navigate('MultiplayerGame', {gameID: item?.game.id});
                                        }
                                    }} 
                                    playerGame={item}
                                />}
                                keyExtractor={player => player ? player.game.id : `${new Date().getTime()}`}
                                refreshControl={
                                    
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={() => {
                                            fetchPlayer(null);
                                        }}
                                        tintColor={"rgba(231, 88, 49, 1)"}
                                    />
                                }
                                ListFooterComponent={() => {
                                    if (!nextToken) return null;
                                    return (
                                        <ButtonComponent
                                            style={styles.buttonLoadMore}
                                            loading={refreshing}
                                            title="Carregar mais"
                                            onPress={() => {
                                                fetchPlayer(nextToken);
                                            } } 
                                            styleText={undefined}
                                        />
                                    );
                                }}
                                ListEmptyComponent={()=>{
                                    
                                    return (
                                        <View>
                                            <Text style={{fontSize:18}}>Sem games registrados</Text>
                                        </View>
                                    );
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setPlayersModal(true)
                                }}
                                style={styles.btnNewGame}
                            >
                                <Text style={styles.textNewGame} >Nova partida</Text>
                            </TouchableOpacity>
                
                       </View> 
                       
                     ) : (
                        <View style={styles.container}>
                            <Text >Você deve está logado para jogar online!</Text>
                        </View>
            )}
            <Modal 
                style={{ margin: 0 }}
                backdropOpacity={0.75}
                avoidKeyboard
                isVisible={playersModal}
                onBackButtonPress={() => {
                    setPlayersModal(false);
                }}
                onBackdropPress={() => {
                    setPlayersModal(false);
                }}
            >   
                <PlayersModal onItemPress={(username)=>{
                    setPlayersModal(false);
                    navigation.navigate('MultiplayerGame', {invitee: username});
                }}/>
            </Modal>

            
        </BackgroundPage>
    )
}