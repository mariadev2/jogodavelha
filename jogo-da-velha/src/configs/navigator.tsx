import React, { ReactElement } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Home, SinglePlayerGame, Settings, Login, SignUp, ChangePassword, ForgotPassword, MultiPlayerHome, MultiPlayerGame } from "../view/index";

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
  Login: {redirect: keyof StackNavigatorParams} | undefined;
  SignUp: {username: string} | undefined;
  ChangePassword: undefined;
  ForgotPassword: undefined;
  MultiPlayerHome: undefined;
  MultiplayerGame:
        | { gameID: string; invitee?: undefined }
        | { invitee: string; gameID?: undefined };
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
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerTitleAlign: 'center'}} />
        <Stack.Screen name='ChangePassword' component={ChangePassword} options={{headerTitleAlign: 'center', title:"Alterar senha"}} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{headerTitleAlign: 'center'}} />
        <Stack.Screen name='MultiPlayerHome' component={MultiPlayerHome} options={{headerTitleAlign: 'center', title:"Home Multiplayer"}} />
        <Stack.Screen name='MultiplayerGame' component={MultiPlayerGame} options={{headerTitleAlign: 'center', title:"Multiplayer"}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}