import React, { ReactElement } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings } from "../view/index";

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined
}


const navigatorOptions: NativeStackNavigationOptions = {
    headerTitle: 'Configurações',
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: '#E78F31',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
        fontFamily: "DeliusUnicase_700Bold",
        fontSize: 14
    },
    headerBackTitleStyle: {
        fontFamily: "DeliusUnicase_400Regular",
        fontSize: 14
    },
};

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='SinglePlayerGame' component={SinglePlayerGame} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={Settings} options={navigatorOptions }  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}