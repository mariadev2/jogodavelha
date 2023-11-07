import { View, SafeAreaView, ScrollView, Image, TouchableOpacity, Switch} from 'react-native'
import React, { ReactElement } from 'react'
import { Text } from '../../components'
import styles from './settings.style'
import { difficulties, useSettings } from '../../contexts/settings-context';
import { useAuth } from '../../contexts/auth-context';
import { StackNavigatorParams } from '../../configs/navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type SettingsScreenNavigationProp = NativeStackNavigationProp<StackNavigatorParams, "Settings">;

type SettingsProps = {
    navigation: SettingsScreenNavigationProp;
};

export default function Settings({navigation}:SettingsProps): ReactElement | null {

    const { user } = useAuth();
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
                        {user && (
                            <View style={[styles.field, styles.switchField]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ChangePassword");
                                    }}
                                >
                                    <Text style={[styles.label, { textDecorationLine: "underline" }]}>
                                        Alterar a senha
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}