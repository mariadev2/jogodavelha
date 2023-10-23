import React, { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../text/text"
import { BoardState, BoardResult } from "../../utils";
import BoardLine from "./board-line";

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    gameResult?: BoardResult | false; 
    onCellPressed? : (index:number) => void;
}

export default function Board({gameResult,state,size,disabled,onCellPressed}:BoardProps) : ReactElement{
    return(
        <View 
            style= {{
                width: size,
                height:size,
                backgroundColor: '#DA3941',
                flexDirection:"row",
                flexWrap: "wrap"

        }}>
         {state.map((cell,index)=> {
            return(
                <TouchableOpacity 
                disabled={cell != null || disabled}
                onPress={() => onCellPressed 
                    && onCellPressed(index)}
                
                
                style={{
                    width:"33.33333%",
                    height:"33.33333%",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"

                }} key={index}>
                    <Text style= {{
                        fontSize:size/7, color: '#E78F31'
                    }} >{cell}</Text>
                </TouchableOpacity>
            )

         })}
         {true && 
         <BoardLine size={size} gameResult={{
                                winner: "o", 
                                diagonal: "COUNTER", 
                                direction:"D"}}/>}
        
        
        </View>
    )


}