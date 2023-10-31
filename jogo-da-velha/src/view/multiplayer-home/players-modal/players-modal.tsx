import { View, Text, Dimensions, Alert , TextInput as NativeTextInput, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { searchPlayers } from "../multiplayer-home.graphql";
import { GraphQLResult } from "@aws-amplify/api";
import { SearchPlayersQuery } from "../../../API";
import { TextInput } from '../../../components';
import styles from './players-modal.styles';

type PlayersListType = Exclude<SearchPlayersQuery["searchPlayers"], null | undefined>["items"];
type PlayersModalProps = {
    onItemPress: (username: string) => void;
};

const scren_height = Dimensions.get('screen').height

export default function PlayersModal({onItemPress} : PlayersModalProps): ReactElement {
    const [players, setPlayers] = useState<PlayersListType| null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<NativeTextInput | null>(null);

    const fetchPlayers = async (searchString: string) => {
        setLoading(true);
        setSubmittedQuery(searchString);
        try {
            const players = (await API.graphql(
                graphqlOperation(searchPlayers, {
                    limit: 10,
                    searchString
                })
            )) as GraphQLResult<SearchPlayersQuery>;

            if (players.data?.searchPlayers) {
                setPlayers(players.data.searchPlayers.items);
            }
            
            
        } catch (error) {
            Alert.alert("Error!", "An error has occurred. Please try again later!");
        }
        setLoading(false);
    };

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 150);
    }, []);
  return (
        <View style={styles.containerGeral}>
            <View style={{padding: 20, backgroundColor: 'rgba(231, 88, 49, 1)'}}>
                <TextInput 
                    placeholder='Busque pelo nome ou sobrenome' 
                    returnKeyType='search' 
                    onChangeText={(e)=> setSearchQuery(e)}
                    onSubmitEditing={()=> fetchPlayers(searchQuery)}
                    ref={inputRef} 
                    value={searchQuery}
                />
            </View>
            <View style={{flex: 1}}>
               {loading ? 
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator color={"#fff"}/>
                            </View>  
                        :  <FlatList 
                                data={players} 
                                renderItem={({item})=>{
                                    return <TouchableOpacity style={styles.playerItem} 
                                                onPress={()=>{
                                                    if (item) {
                                                        onItemPress(item?.username)}
                                                    }
                                                }>
                                                <Text>{item?.name}</Text>
                                                <Text>{item?.username}</Text>
                                            </TouchableOpacity>
                                }}
                                keyExtractor={player => player?.username || `${new Date().getTime()}`}
                                ListEmptyComponent={() => {
                                    return (
                                        <View>
                                            <Text style={{textAlign: 'center', marginTop: 20}}>
                                                {submittedQuery
                                                    ? "Sem resultado!"
                                                    : "Busque pelo nome ou sobrenome!"}
                                            </Text>
                                        </View>
                                    );
                                }}
                            />
               }
            </View>
                    
        </View>
  )
} 
