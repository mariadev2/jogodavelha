import React, { ReactElement } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, SinglePlayerGame } from "../view/index";

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export type StackNavigatorParams = {
  home: undefined;
  SinglePlayerGame: undefined;
}

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='SinglePlayerGame' component={SinglePlayerGame}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}