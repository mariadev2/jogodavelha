import React, {ReactNode, ReactElement} from 'react';
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native';

type TextProps = {
    weight: '400' | '700',
    children?: ReactNode
} & NativeTextProps;

const defaultProps = {
    weight: '700'
}

export default function Text({children, weight, style, ...props}: TextProps):ReactElement{
    let fontFamily;
    if (weight === '400') {
        fontFamily = 'DeliusUnicase_400Regular'
    }else{
        fontFamily = 'DeliusUnicase_700Bold'
    }
    return (
            <NativeText {...props} 
                style={[{fontFamily},style]}
            >
               { children}
            </NativeText>
    )
}

Text.defaultProps = defaultProps;