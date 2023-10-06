import React, { ReactElement } from "react";
import { Image, View, Text, Button, ScrollView } from "react-native";
import styles from "./home.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { GradientBackground } from "../../components";
 
type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Home">

}

export default function Home({navigation} : HomeProps) : ReactElement{
    return(
        <ScrollView contentContainerStyle={styles.
        container}>
            <Image style = {styles.logo} source = {require('../../components/imagens/old-woman.png')}/>
            <Text>Pagina Inicial</Text>
            <Button title="Game" onPress={()=>{
                navigation.navigate("Game",{gameID:"jhui"})
            }}/>
        </ScrollView>        
    )
} 