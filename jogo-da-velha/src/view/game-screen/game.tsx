import React, { ReactElement } from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import BackgroundPage  from "../../components/background-page/background-page";

export default function Game(): ReactElement{
    return (
        <SafeAreaView>
            <ScrollView > 
                <BackgroundPage>
                    <Text>Game</Text>
                </BackgroundPage>
            </ScrollView>
        </SafeAreaView>
    )
}