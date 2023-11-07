import {StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle, ActivityIndicator } from 'react-native'
import React, { ReactElement } from 'react'
import styles from './buttons.styles';
import Text from '../../components/text/text';

type ButtonComponentProps = {
    loading: boolean
    title: String,
    style: StyleProp<ViewStyle>,
    styleText: StyleProp<TextStyle>
} & TouchableOpacityProps;

export default function ButtonComponent({title, style, styleText, loading, ...props}:ButtonComponentProps):ReactElement {
  return (
        <TouchableOpacity disabled={loading} {...props} style={ style ? style : styles.button}>
           {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
              <Text style={styleText ? styleText : styles.textButton}>{title}</Text>
            )}
            
        </TouchableOpacity>
  )
}