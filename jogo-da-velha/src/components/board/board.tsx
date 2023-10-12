import { View, TouchableHighlight } from 'react-native'
import React, { ReactElement } from 'react'
import Text from '../text/text';
import { BoardState } from '../../utils';

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    onCellPress?: (index: number) => void;
}

export default function Board({state, size, disabled, onCellPress}: BoardProps): ReactElement {
  return (
    <View style={{width: size, height: size, backgroundColor: '#fff', flexDirection: 'row', flexWrap: 'wrap' }}>
        
      {state.map((cell, index)=>
            { 
                return (
                    <TouchableHighlight 
                        disabled = { cell != null || disabled}
                        onPress={()=> onCellPress && onCellPress(index)}
                        key={index} 
                        style={{width: '33.33333%', height: '33.33333%', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: size / 8}}>{cell}</Text>
                    </TouchableHighlight>
                )
            }
        )
      }
    </View>
  )
}