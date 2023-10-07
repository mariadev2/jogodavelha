import React, { ReactElement } from 'react';
import { SafeAreaView, Image, View} from 'react-native';
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import { StatusBar } from 'expo-status-bar';
import styles from './home-styles';
import { ButtonComponent,  BackgroundPage } from '../../components';


type HomeProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'home'>
}

const iconLogo = '../../utils/assets/logo-app.png';
const iconOldWoman = '../../utils/assets/old-woman.png';

export default function Home({navigation}:HomeProps): ReactElement{
    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#E78F31" style="dark" />
                <BackgroundPage>
                       <Image style={styles.logo} source={require(iconLogo)} />
                       <Image style={styles.oldWoman} source={require(iconOldWoman)} />
                       <View style={styles.buttonContainer}>
                         <ButtonComponent title={"Jogar offline"}/>
                         <ButtonComponent title={"Jogar online"}/>
                         <ButtonComponent title={"Login"}/>
                         <ButtonComponent title={"Configurações"}/>
                       </View>
                </BackgroundPage>
        </SafeAreaView>
        
    )
}