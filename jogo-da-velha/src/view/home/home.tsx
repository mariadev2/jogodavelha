import React, { ReactElement } from 'react';
import {View, Text, Button} from 'react-native';
import styles from './home-styles';
import {  NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";


type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'home'>
}

export default function Home({navigation}:HomeProps): ReactElement{
    return (
        <View style={styles.container}> 
            <Text>Homess</Text>
            <Button title='game' onPress={()=> {navigation.navigate('game',{gameId:'asd'})}}></Button>
        </View>
    )
}