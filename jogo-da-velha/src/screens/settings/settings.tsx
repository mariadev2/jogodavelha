import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Switch } from "react-native";
import styles from "./settings.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { BackgroundPage, Text, Button } from "../../components";
import { colors } from "../../utils";
import { AsyncStorage } from "react-native";


const difficulties = {
    "1": "Iniciante",
    "3": "Intermediario",
    "4": "Dificil",
    "-1": "Impossivel",
};

type SettingsType = {
    difficulty: keyof typeof difficulties;
    haptics: boolean;
    sounds: boolean;
};

const defaultSettings: SettingsType ={
    difficulty: "-1",
    haptics: true,
    sounds: true
};

type settingsProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Configurações">

}

export default function Settings({navigation} : settingsProps) : ReactElement | null{
    const [settings, setSettings] = useState<SettingsType | null >(null);
    
    const loadSettings = async () =>{
        try{
            const settings = await AsyncStorage.getItem("@settings");
            settings !== null ? setSettings(JSON.parse(settings)):
            setSettings(defaultSettings);
        }catch(error){
            setSettings(defaultSettings)


        }
    };
    useEffect (() => {
        loadSettings();
        
    }, [])
    if (!settings) return null;

    return(
        <BackgroundPage>
        <ScrollView style={styles.container}>
            <View style={styles.field}>
                <Text style={styles.label}>
                    Dificuldade
                </Text>
                <View style={styles.choices}>
                    {Object.keys(difficulties).map(level =>{
                        return(
                            <TouchableOpacity style={[styles.choice,{
                                backgroundColor: settings.difficulty === level ? colors.vermelho : colors.laranja
                            }]} key={level}>
                            <Text style={styles.choiceText}>
                                {difficulties[level as keyof typeof difficulties]}
                            </Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>


            </View>
            <View style={[styles.field, styles.swithField]}>
                    <Text style={styles.label}>Som</Text>
                    <Switch  
                    trackColor={{
                        false: colors.vermelho,
                        true: colors.verde
                    }}
                    thumbColor={colors.branco}
                    ios_backgroundColor={colors.branco}
                    value={settings.sounds} 
                    // onValueChange={() => {
                    //     setState(!state);
                    // }}
                    />
            </View>

            <View style={[styles.field, styles.swithField]}>
                    <Text style={styles.label}>Vibrações</Text>
                    <Switch  
                    trackColor={{
                        false: colors.vermelho,
                        true: colors.verde
                    }}
                    thumbColor={colors.branco}
                    ios_backgroundColor={colors.branco}
                    value={settings.haptics} 
                    // // onValueChange={() => {
                    // //     setState(!state);
                    // }}
                    />
            </View>

        </ScrollView>
        </BackgroundPage>
    )
}