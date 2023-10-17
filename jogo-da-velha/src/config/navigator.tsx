import React , { ReactElement} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SinglePlayerGame from "../screens/single-player-game/single-player-game";
import Home from "../screens/home/home";
import Cadastro from "../screens/cadastro/cadastro";


export type StackNavigatorParams = {
    Home: undefined;
    SinglePlayerGame : undefined;
    Cadastro: undefined
}

const Stack = createNativeStackNavigator <StackNavigatorParams>();
export default function Navigator() : ReactElement{
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Cadastro" component={Cadastro}/>
                <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame}/>


            </Stack.Navigator>
        </NavigationContainer>

    )
}