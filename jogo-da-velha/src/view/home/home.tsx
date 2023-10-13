import React, { ReactElement } from 'react';
import { SafeAreaView, Image, View} from 'react-native';
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import { StatusBar } from 'expo-status-bar';
import styles from './home-styles';
import { ButtonComponent,  BackgroundPage } from '../../components';


type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>
}

export default function Home({navigation}:HomeProps): ReactElement{
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#E78F31" style="dark" />
                <BackgroundPage>
                       <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                       <Image style={styles.oldWoman} source={require('../../utils/assets/old-woman.png')} />
                       <View style={styles.buttonContainer}>
                         <ButtonComponent onPress={()=>{
                            navigation.navigate("SinglePlayerGame")
                         }} title={"Jogar offline"}/>
                         <ButtonComponent title={"Jogar online"}/>
                         <ButtonComponent title={"Login"}/>
                         <ButtonComponent onPress={()=>{
                            navigation.navigate("Settings")
                         }} title={"Configurações"}/>
                       </View>
                </BackgroundPage>
        </SafeAreaView>
        
    )
}