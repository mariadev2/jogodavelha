import React, { useEffect, useState, ReactNode,ReactElement, createContext, useContext} from "react";
import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"




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
type SettingsContextType = {
    settings: SettingsType | null;
    loadSettings: () => void;
    saveSettings: 
        <T extends keyof SettingsType>(settings:T, 
            value: SettingsType[T]) => void;

};

const SettingsContext = createContext<SettingsContextType | undefined> (undefined);

function useSettings():SettingsContextType {
    const context= useContext(SettingsContext);
    if (!context) {
        throw new Error("UseSettings must be used within a SettingProvider.")
    }
    return context;
}
function SettingsProvider(props: {children: ReactNode}): ReactElement{
    const [settings, setSettings] = useState<SettingsType | null >(null);
    
    
    const saveSetting = async < T extends keyof SettingsType>
     (setting: T, value: SettingsType[T] ) => {
        try{
            const oldSetting = settings ? settings : defaultSettings;
            const newSettings = {...oldSetting, [setting] : value};
            const jsonSettings = JSON.stringify(newSettings);
            await AsyncStorage.setItem("@settings", newSettings );
            setSettings(newSettings);
        }catch (error){
            Alert.alert("Error!","Ocorreu um erro.");
        
        }
    };

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
    return <SettingsContext.Provider {...props}
    value = {{
        settings, saveSetting, loadSettings
    }}
        />
}

export {useSettings, SettingsProvider, difficulties};