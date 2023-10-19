import React, {ReactNode, ReactElement, useState, useEffect} from "react"
import * as SplashScreen from 'expo-splash-screen';
import {  useAuth } from "../../contexts/auth-context";
import { Auth } from "aws-amplify";
import { useFonts,
   DeliusUnicase_400Regular, 
   DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";

type AppBootstrapProps = {
    children: ReactNode;
}


SplashScreen.preventAutoHideAsync();


export default function AppBootstrap({children}: AppBootstrapProps): ReactElement {
    const [authLoged, setAuthLoged] = useState(false);
    const {setUser} = useAuth();
    const [fontLoaded] = useFonts({
        DeliusUnicase_400Regular, 
        DeliusUnicase_700Bold,
      })
    fontLoaded && authLoged ? SplashScreen.hideAsync() : null;
   
    useEffect(() => {
        async function checkCurrentUser() {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setUser(user);
            } catch (error) {
                setUser(null);
            }
            setAuthLoged(true);
        }
        checkCurrentUser();
    }, [])

    return fontLoaded && authLoged ? <>{children}</> :  <></>
    
}