import React, { ReactElement } from "react";
import { View, Text, Button } from "react-native";
import styles from "./cadastro.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { BackgroundPage } from "../../components";


type cadastroProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Cadastro">

}

export default function Cadastro({navigation} : cadastroProps) : ReactElement{
    return(
        <BackgroundPage>
        <View style={styles.container}>
            <Text>Pagina cadastro</Text>
            <Button title="Cadastro" onPress={()=>{
            }}/>
        </View>
        </BackgroundPage>
    )
}