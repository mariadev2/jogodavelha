import { ImageBackground } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import styles from '../../view/home/home-styles';

const image = '../../utils/assets/img-background.png';

type BackgroundProps = {
    children: ReactNode
}

export default function BackgroundPage({children}: BackgroundProps): ReactElement {
  return (
        <ImageBackground source={require(image)} style={styles.container} resizeMode="cover">
           {children}
        </ImageBackground>
  )
}