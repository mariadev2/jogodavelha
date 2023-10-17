import React, {Children, ReactElement,ReactNode} from "react";
import { ScrollView, Image, View } from "react-native";
import styles from './background.styles';
import { StatusBar } from "expo-status-bar";
import { SearchBar } from "react-native-screens";


type BackgroundProps = {

    children : ReactNode,
}
export default function BackgroundPage ({children} : BackgroundProps): ReactElement{
    return(
            <ScrollView>
                <View style={styles.container}>
                    <Image source = {require('../../components/imagens/Union.jpg')} style = {styles.iconebolinha}/>
                    <Image source = {require('../imagens/jogodavelha.jpg')} style = {styles.iconejogodavelha}/>
               
                    {children}
                </View>
                
            </ScrollView>
    )
}
