import React, { ReactElement, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Switch, Alert } from "react-native";
import styles from "./settings.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"; 
import { StackNavigatorParams } from "../../config/navigator";
import { BackgroundPage, Text, Button } from "../../components";
import { colors } from "../../utils";
import { difficulties, useSettings } from "../../contexts/settings-context";

type settingsProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams,"Configurações">

}

export default function Settings({navigation} : settingsProps) : ReactElement | null{
 
    
    const {settings, saveSetting} = useSettings();
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
                            <TouchableOpacity onPress={() => {
                                saveSetting("difficulty", level as keyof typeof difficulties)
                                }}

                                style={[styles.choice,{
                                    backgroundColor: settings.difficulty === level ? colors.vermelho : colors.laranja
                                }
                                ]} 
                                key={level}>

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
                    onValueChange={() => {
                        saveSetting("sounds", !settings.sounds);
                    }}
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
                    onValueChange={() => {
                        saveSetting("haptics", !settings.haptics);
                    }}
                    />
            </View>

        </ScrollView>
        </BackgroundPage>
    )
}