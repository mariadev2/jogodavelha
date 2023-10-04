import { StatusBar } from "expo-status-bar";
import React, { ReactElement } from "react";
import { StyleSheet, View, Image } from "react-native";
import Game from "../screens/game/game";
import Home from "../screens/home/home";
import { Text, AppBootstrap } from "../components"
import Navigator from "../config/navigator";



export default function App() : ReactElement{
  return (
    <AppBootstrap>
       <Navigator/>
      </AppBootstrap>
  );
}

