import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, Switch, Alert } from 'react-native'
import React, { ReactElement, useEffect, useState } from 'react'
import { Text } from '../../components'
import styles from './settings.style'
import AsyncStorage from '@react-native-async-storage/async-storage';

const difficulty = {
    '1': 'Fácil',
    '3': 'Médio',
    '4': 'Difícil',
    '-1': 'Impossivel'
}

type SettingsType = {
    difficulty: keyof typeof difficulty;
    sounds: boolean;
}

const defaultSettings:SettingsType = {
    difficulty: '-1',
    sounds: true
}




export default function Settings(): ReactElement | null {
    const [settings, setSettings] = useState<SettingsType | null>(null);

    const saveSettings = async <T extends keyof SettingsType>(setting: T, value: SettingsType[T]) =>{
        try {
            const oldSettings = settings ? settings : defaultSettings;
            const newSettings = {...oldSettings, [setting]: value};
            const jsonSettings = JSON.stringify(newSettings);
            await AsyncStorage.setItem('@settings', jsonSettings)
            setSettings(newSettings);
        } catch (error) {
            Alert.alert('eero')
        }
    }

    const loadSettings = async () =>{
        try {
            const settings = await AsyncStorage.getItem('@settings');
            settings != null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
        } catch (error) {
            setSettings(defaultSettings);
        }
    }

    useEffect(() => {
        loadSettings();
    }, [])
    

    if (!settings) return null;
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                    <View style={styles.content}>
                        <Text style={styles.label}>Dificuldade do BOT:</Text>
                        <View style={styles.choices}>
                            {Object.keys(difficulty).map(nivel =>{
                                return (
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        saveSettings('difficulty', nivel as keyof typeof difficulty )
                                    }}
                                        key={nivel} 
                                        style={[styles.choice, 
                                            {backgroundColor: settings.difficulty === nivel 
                                                ? '#E78F31' 
                                                : 'rgba(218, 57, 65, 0.51)'
                                            }
                                        ]}>
                                        <Text>{difficulty[nivel as keyof typeof difficulty]}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={[styles.field, styles.switchField]}>
                            <Text style={styles.label}>Sons</Text>
                            <Switch 
                                style={styles.switch}
                                trackColor={{
                                    false: 'grey',
                                    true: '#E78F31'
                                }}
                                thumbColor={'#E78F31'}
                                value={settings.sounds}  
                                onValueChange={()=>{
                                    saveSettings('sounds', !settings.sounds)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}