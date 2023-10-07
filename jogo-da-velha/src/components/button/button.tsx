import {TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React, { ReactElement } from 'react'
import styles from './buttons.styles';
import Text from '../../components/text/text';

type ButtonComponentProps = {
    title: String
} & TouchableOpacityProps;

export default function ButtonComponent({title, ...props}:ButtonComponentProps):ReactElement {
  return (
        <TouchableOpacity {...props} style={styles.button}>
            <Text style={styles.textButton}>{title}</Text>
        </TouchableOpacity>
  )
}