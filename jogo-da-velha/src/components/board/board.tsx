import { View, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import Text from '../text/text';
import { BoardResult, BoardState } from '../../utils';
import BoardLine from './board-line';
import styles from './board.styles';

type BoardProps = {
    state: BoardState;
    size: number;
    disabled?: boolean;
    gameResult?: BoardResult | false;
    onCellPress?: (index: number) => void;
}

export default function Board({state, size, disabled, onCellPress, gameResult}: BoardProps): ReactElement {
  return (
    <View style={[{width: size, height: size}, styles.board]}>
        
      {state.map((cell, index)=>
            { 
                return (
                  
                    <TouchableOpacity  
                        disabled = { cell != null || disabled}
                        onPress={()=> onCellPress && onCellPress(index)}
                        key={index} 
                        style={[styles.cell, styles[`cell${index}` as 'cell' ] ]}>
                        <Text style={{fontSize: size / 8}}>{cell}</Text>
                    </TouchableOpacity >
    
                )
            }
        )
      }
      {gameResult && <BoardLine gameResult={gameResult} size={size}/>}
    </View>
  )
}