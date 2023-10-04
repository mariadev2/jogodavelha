import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Game from "../screens/game/game";
import Home from "../screens/home/home";
import { useFonts, DeliusUnicase_400Regular,
DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";
import AppLoading from 'expo-app-loading';
import { Text } from "../components"
 


export default function App() {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold
  })
  if(!fontLoaded) return <AppLoading/>
  return (
      <View style={styles.container}>
        <Home></Home>
        <Game></Game>
        <Text onPress = {() => {
          alert(true);
          }}
          style={{fontSize:25}}
          weight= "400"
          
          >Teste em ultil/index.tsx - Hello World <Text weight="700">snjsndcj</Text>
          </Text>

        <StatusBar style="auto" />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});