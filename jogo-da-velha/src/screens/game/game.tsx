import React, { ReactElement } from "react";
import { View, Text, Button } from "react-native";
import styles from "./game.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";


type GameProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Game">

}
export default function Game({navigation} : GameProps) : ReactElement{
    return(
        <View style={styles.container}>
            <Text>Pagina Game</Text>
            <Button title="Home" onPress={()=>{
                navigation.navigate("Home",{homeID:"ASD"})
            }}/>
        </View>
    )
}