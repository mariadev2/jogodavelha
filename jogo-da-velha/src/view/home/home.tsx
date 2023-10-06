import React, { ReactElement } from 'react';
import { Text, Button, ScrollView, SafeAreaView, ImageBackground} from 'react-native';
import styles from './home-styles';
import {  NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import { StatusBar } from 'expo-status-bar';
import  BackgroundPage  from "../../components/background-page/background-page";

const image = '../../utils/assets/img-background.png';


type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'home'>
}

export default function Home({navigation}:HomeProps): ReactElement{
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#E78F31" style="dark" />
            <ScrollView > 
                <BackgroundPage>
                    <Text>Homesss</Text>
                    <Button title='game' onPress={()=> {navigation.navigate('game',{gameId:'asd'})}}></Button>
                </BackgroundPage>
            </ScrollView>
        </SafeAreaView>
        
    )
}