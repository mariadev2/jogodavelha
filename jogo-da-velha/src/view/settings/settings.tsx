import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, Switch} from 'react-native'
import React, { ReactElement } from 'react'
import { Text } from '../../components'
import styles from './settings.style'
import { difficulties, useSettings } from '../../contexts/settings-context';






export default function Settings(): ReactElement | null {

    
    const {settings, saveSettings}  = useSettings();
    

    if (!settings) return null;
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                    <View style={styles.content}>
                        <Text style={styles.label}>Dificuldade do BOT:</Text>
                        <View style={styles.choices}>
                            {Object.keys(difficulties).map(nivel =>{
                                return (
                                    <TouchableOpacity 
                                    onPress={()=>{
                                        saveSettings('difficulty', nivel as keyof typeof difficulties )
                                    }}
                                        key={nivel} 
                                        style={[styles.choice, 
                                            {backgroundColor: settings.difficulty === nivel 
                                                ? '#E78F31' 
                                                : 'rgba(218, 57, 65, 0.51)'
                                            }
                                        ]}>
                                        <Text>{difficulties[nivel as keyof typeof difficulties]}</Text>
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