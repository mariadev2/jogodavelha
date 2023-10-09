import React, { ReactElement } from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, ScrollViewBase} from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { GradientBackground, Button, BackgroundPage } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import Game from "../game/game";
 
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Home">

}

export default function Home({navigation} : HomeProps) : ReactElement{
    return(
        <BackgroundPage>
            <View style= {styles.container}>
                <Button onPress= {() => alert(true)} title="JOGADOR ÚNICO"/>
                <Button onPress= {() => alert(true)} title="JOGAR ONLINE"/>
                <Button onPress= {() => alert(true)} title="ENTRAR"/>
                <Button onPress= {() => navigation.navigate(Game)} title="CONFIGURAÇÕES"/>
            </View>
            </BackgroundPage>
    )
} 