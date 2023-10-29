
import {useRef,useEffect} from "react";
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import {useSounds} from '../utils';
import { useSettings } from "../contexts/settings-context";

type SoundType = "pop2" | "draw" | "lost" | "win"

export default function useSound() : (sound:SoundType) => void{
    const {settings} = useSettings();
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);
    const lostSoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);

    
    const playSound= async (sound:SoundType): Promise<void> => {
        const soundsMap ={
            pop2 : pop2SoundRef,
            draw : drawSoundRef,
            lost : lostSoundRef,
            win : winSoundRef
        }
        try{
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
            status.isLoaded && 
            settings?.sounds &&
            soundsMap[sound].current?.replayAsync();
            if (settings?.haptics){

            

            switch(sound){
                case "pop2":
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    break;

                case "draw":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                    break;

                case "lost":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    break;

                case "win":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    break;

                default:
                    break;
            }
        }
        }catch(error){
            console.log(error)
        }
    };

    useEffect(() => {
        
        const pop2SoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();
        const lostSoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();

        const LoadSounds = async () => {

            

            await pop2SoundObject.loadAsync(require
                ('../components/sons/click1.mp3'));
                pop2SoundRef.current = pop2SoundObject;

            await drawSoundObject.loadAsync(require
                ('../components/sons/draw.mp3'));
                drawSoundRef.current = drawSoundObject;

            await lostSoundObject.loadAsync(require
                ('../components/sons/lost.mp3'));
                lostSoundRef.current = lostSoundObject;

            await winSoundObject.loadAsync(require
                ('../components/sons/win.mp3'));
                winSoundRef.current = winSoundObject;
            

        };
        LoadSounds();

        return () => {
            pop2SoundObject && pop2SoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
            lostSoundObject && lostSoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();

        };

    }, []);
    return playSound


}