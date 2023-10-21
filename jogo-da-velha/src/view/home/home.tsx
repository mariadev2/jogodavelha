import React, { ReactElement, useState } from 'react';
import { SafeAreaView, Image, View, Alert, Text} from 'react-native';
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import { useAuth } from "../../contexts/auth-context";
import { StatusBar } from 'expo-status-bar';
import styles from './home-styles';
import { ButtonComponent,  BackgroundPage } from '../../components';
import { Auth } from 'aws-amplify';


type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>
}

export default function Home({navigation}:HomeProps): ReactElement{
    const {user} = useAuth();
    const [signingOut, setSigningOut] = useState(false);

    
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#E78F31" style="dark" />
                <BackgroundPage>
                       <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                       <Image style={styles.oldWoman} source={require('../../utils/assets/old-woman.png')} />
                        {user && (
                                <Text>Olá, seja bem vindo {user.username}</Text>
                            )
                        }
                       <View style={styles.buttonContainer}>
                        <ButtonComponent 
                            onPress={() => {
                                navigation.navigate("SinglePlayerGame");
                            } } 
                            title={"Jogar offline"} 
                            loading={false} 
                            style={undefined} 
                            styleText={undefined}
                        />
                        <ButtonComponent 
                            title={"Jogar online"} 
                            loading={false} 
                            style={undefined} 
                            styleText={undefined}
                         />
                        <ButtonComponent 
                            title={user ? 'Desconectar' : 'Login'} 
                            onPress={async () => {
                                if (user) {
                                    setSigningOut(true)
                                    try {
                                       await Auth.signOut()
                                    } catch (error) {
                                        Alert.alert("Error!", "Error signing out!");
                                    }
                                    setSigningOut(false)
                                } else {
                                    navigation.navigate("Login");
                                }
                            }} 
                            loading={signingOut} 
                            style={undefined} 
                            styleText={undefined}
                        />
                        <ButtonComponent 
                            onPress={() => {
                                navigation.navigate("Settings");
                            }} 
                            title={"Configurações"} 
                            loading={false} 
                            style={undefined} 
                            styleText={undefined}
                        />
                       </View>
                </BackgroundPage>
        </SafeAreaView>
        
    )
}