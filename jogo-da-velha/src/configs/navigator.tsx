import React, { ReactElement } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Game } from "../view/index";

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export type StackNavigatorParams = {
  home: undefined;
  game: {gameId: string};
}

export default function Navigator(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='game' component={Game}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}