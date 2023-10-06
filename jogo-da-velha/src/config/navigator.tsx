import React , { ReactElement} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "../screens/game/game";
import Home from "../screens/home/home";

export type StackNavigatorParams = {
    Home: {homeID: string};
    Game : {gameID: string}
}

const Stack = createNativeStackNavigator <StackNavigatorParams>();
export default function Navigator() : ReactElement{
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Game" component={Game}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}