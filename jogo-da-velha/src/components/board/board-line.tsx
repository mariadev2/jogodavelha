import React, {ReactElement, useEffect, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BoardResult, colors } from '../../utils';

const style= StyleSheet.create({
    line: {
        position: 'absolute',
        backgroundColor: colors.vermelho
    },
    vLine:{
        width: 4,
    },
    hLine : {
        height: 4,

    },
    dLine: {
        width: 4,
        top: 0,
        left: "50%"
    }

    
})
type BoardLineProps = {
    size: number;
    gameResult?: BoardResult | false;
}
export default function BoardLine({size,gameResult} : BoardLineProps) : ReactElement{
    const diagonalHeight = Math.sqrt(Math.pow(size,2) );
    const animatioRef = useRef<Animated.Value>(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animatioRef.current,{
            toValue:1,
            duration: 700, 
            useNativeDriver:false
        }).start();

    }, [])
    return(
        <>
            {gameResult && gameResult.row && gameResult.direction === "H" && 
            <Animated.View style= {[
                style.line, 
                style.hLine, {top: `${33.3333 * gameResult.row - 16.6666}%`,
                width: animatioRef.current.interpolate(
                    {
                        inputRange: [0,1],
                        outputRange: ["0%", "100%"]
                    })
                }
            ]}

            ></Animated.View> }
            
            
            {gameResult && gameResult.column && gameResult.direction === "V" && 
            <Animated.View style= {[
                style.line, 
                style.vLine, {left: `${33.3333 * gameResult.column - 16.6666}%`,
                height: animatioRef.current.interpolate(
                    {
                        inputRange: [0,1],
                        outputRange: ["0%", "100%"]
                    }
                )
                }]}></Animated.View> }
           
           
            {gameResult && gameResult.diagonal && gameResult.direction === "D" && 
            <Animated.View style= {[
                style.line,
                style.dLine , {
                    height : animatioRef.current.
                    interpolate({
                        inputRange: [0,1],
                        outputRange: [0,diagonalHeight]
                    }),
                    transform: [
                        {
                          translateY: animatioRef.current.
                          interpolate({
                            inputRange: [0,1],
                            outputRange: [size/2, - (diagonalHeight - size) / 2]
                        })                 
                        },
                        {
                        rotateZ: gameResult.diagonal === "MAIN" ? "-45def" : "45deg"
                     }
                    ]
                }

                ]}></Animated.View> }

        </>
    )
}