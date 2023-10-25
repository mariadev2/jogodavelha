import React , { ReactElement} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import SinglePlayerGame from "../screens/single-player-game/single-player-game";
import Home from "../screens/home/home";
import Cadastro from "../screens/cadastro/cadastro";
import Settings from "../screens/settings/settings";
import { colors } from "../utils";
import { DeliusUnicase_400Regular, DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";

export type StackNavigatorParams = {
    PaginaInicial: undefined;
    JogarOffline : undefined;
    Cadastro: undefined;
    Configurações: undefined;
}

const Stack = createNativeStackNavigator <StackNavigatorParams>();
const navigatorOptions: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.laranja,
        shadowRadius: 0,
        shadowOffset: {
            height: 0,
            width: 0,

        }
    },
    headerTintColor: colors.branco,
    headerTitleStyle: {
        fontFamily: DeliusUnicase_700Bold,
        fontSize: 18,
        
    },
    headerBackTitleStyle:{
        fontFamily: DeliusUnicase_400Regular,
        fontSize: 12
    }
        
    
};

export default function Navigator() : ReactElement{
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={navigatorOptions}>
                <Stack.Screen name="PaginaInicial" component={Home} 
                options={{headerShown: true}}/>

                <Stack.Screen name="Cadastro" component={Cadastro} 
                options={{headerShown: true}}/>

                <Stack.Screen name="JogarOffline" component={SinglePlayerGame} 
                options={{headerShown: true}}/>

                <Stack.Screen name="Configurações" component={Settings} 
                options={{headerShown: true}}/>



            </Stack.Navigator>
        </NavigationContainer>

    )
}