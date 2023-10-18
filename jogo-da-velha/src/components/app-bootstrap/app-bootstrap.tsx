import React, {ReactNode, ReactElement, useState} from "react"
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
    const [authLoged, setAuthLoged] = useState(false);
    return fontLoaded ? <>{children}</> :  <></>
    
}