import React, { ReactElement } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../text/text"
import { BoardState } from "../../utils";

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    onCellPressed? : (index:number) => void;
}

export default function Board({state,size,disabled,onCellPressed}:BoardProps) : ReactElement{
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
        </View>
    )


}