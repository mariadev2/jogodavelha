import React, {ReactNode, ReactElement} from "react";
import {View, Text} from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts,
   DeliusUnicase_400Regular, 
   DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";

type AppBootstrapProps = {
    children: ReactNode;
}
SplashScreen.preventAutoHideAsync();

export default function AppBootstrap({children}: AppBootstrapProps): ReactElement {
    const [fontLoaded] = useFonts({
        DeliusUnicase_400Regular, 
        DeliusUnicase_700Bold,
      })
    fontLoaded ? SplashScreen.hideAsync() : null;
    return fontLoaded ? <>{children}</> :  <></>
    
}