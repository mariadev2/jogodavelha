import React, { ReactElement } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import BackgroundPage  from "../../../components/background-page/background-page";
import { Text } from '../../../components';
import styles from './single-game-styles.styles';

export default function SinglePlayerGame(): ReactElement{
    return (
        <SafeAreaView>
            <ScrollView > 
                <BackgroundPage>
                <View style={styles.container}>
                    <Text style={{color: '#E78F31'}}>SinglePlayer</Text>
                </View>
                    
                </BackgroundPage>
            </ScrollView>
        </SafeAreaView>
    )
}