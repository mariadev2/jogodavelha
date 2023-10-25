import React, { ReactElement } from "react";
import { Image, View, Text, ScrollView, TouchableOpacity, ScrollViewBase} from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { GradientBackground, Button, BackgroundPage } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import Game from "../single-player-game/single-player-game";
import Cadastro from "../cadastro/cadastro";
import Settings from "../settings/settings";

 
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"PaginaInicial">

}

export default function Home({navigation} : HomeProps) : ReactElement{
    return(
        <BackgroundPage>
            <Image source={require('../../components/imagens/old-woman.png')} style = {styles.iconevelha}/>
            <Image source={require('../../components/imagens/simbolojogo.png')} style = {styles.iconejogo}/>
            <View style= {styles.container}>
                <Button onPress= {() => navigation.navigate("JogarOffline")} title="JOGADOR ÚNICO"/>
                <Button onPress= {() => alert(true)} title="JOGAR ONLINE"/>
                <Button onPress= {() => alert(true)} title="ENTRAR"/>
                <Button onPress= {() => navigation.navigate("Configurações")} title="CONFIGURAÇÕES"/>
                <Button onPress= {() => navigation.navigate("Cadastro")} title="CADASTRO"/>

            </View>
            </BackgroundPage>
    )
} 