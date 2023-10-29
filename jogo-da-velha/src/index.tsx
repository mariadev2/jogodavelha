import { StatusBar } from "expo-status-bar";
import React, { ReactElement } from "react";
import { StyleSheet, View, Image } from "react-native";
import Game from "./screens/single-player-game/single-player-game";
import Home from "./screens/home/home";
import { Text, AppBootstrap } from "./components"
import Navigator from "./config/navigator";
import {SettingsProvider} from "./contexts/settings-context";




export default function App() : ReactElement{
  return (
    <AppBootstrap>
      <SettingsProvider>
             <Navigator/>

      </SettingsProvider>
      </AppBootstrap>
  );
}

