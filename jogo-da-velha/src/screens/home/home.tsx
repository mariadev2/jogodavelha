import React, { ReactElement } from "react";
import { Image, View, Text, ScrollView, TouchableOpacity} from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { GradientBackground, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
 
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Home">

}

export default function Home({navigation} : HomeProps) : ReactElement{
    return(
                <View style ={styles.
        container}>
            <Image style = {styles.logo} source = {require('../../components/imagens/simbolojogo.png')}/>            
            <Image style = {styles.logo} source = {require('../../components/imagens/old-woman.png')}/>
            <View style={styles.bolinhas}>
                <Image style = {styles.logo} source = {require('../../components/imagens/Union.jpg')}/>
                </View>

                <Button onPress= {() => alert(true)} title="JOGADOR ÚNICO"/>
                <Button onPress= {() => alert(true)} title="JOGAR ONLINE"/>
                <Button onPress= {() => alert(true)} title="ENTRAR"/>
                <Button onPress= {() => alert(true)} title="CONFIGURAÇÕES"/>
            </View>
    )
} 