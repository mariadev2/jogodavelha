import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

type SoundType = "pop1" | "pop2" | "win" | "loss" | "draw";

export default function useSounds(): (sound: SoundType) => void {
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const lossSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);

    const playSound = async (sound: SoundType): Promise<void> => {
        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            loss: lossSoundRef,
            draw: drawSoundRef
        };
        try {
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
                status.isLoaded &&
                soundsMap[sound].current?.replayAsync();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const lossSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            await popSoundObject.loadAsync(require("../../utils/assets/audio/pop_1.wav"));
            popSoundRef.current = popSoundObject;

            await pop2SoundObject.loadAsync(require("../../utils/assets/audio/pop_2.wav"));
            pop2SoundRef.current = pop2SoundObject;

            await winSoundObject.loadAsync(require("../../utils/assets/audio/win.mp3"));
            winSoundRef.current = winSoundObject;

            await lossSoundObject.loadAsync(require("../../utils/assets/audio/loss.mp3"));
            lossSoundRef.current = lossSoundObject;

            await drawSoundObject.loadAsync(require("../../utils/assets/audio/draw.mp3"));
            drawSoundRef.current = drawSoundObject;
        };
        loadSounds();
        return () => {
            //unload sounds
            popSoundObject && popSoundObject.unloadAsync();
            pop2SoundObject && pop2SoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            lossSoundObject && lossSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
        };
    }, []);

    return playSound;
}