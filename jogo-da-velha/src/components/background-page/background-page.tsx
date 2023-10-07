import {  ScrollView, Image, View} from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import styles from '../../view/home/home-styles';



const iconBottom = '../../utils/assets/icon-button.png';
const iconTop = '../../utils/assets/icon-top.png';

type BackgroundProps = {
    children: ReactNode,
}

export default function BackgroundPage({children}: BackgroundProps): ReactElement {
  return (
    <ScrollView > 
        <View style={styles.container}>
          <Image source={require(iconTop)} style={styles.iconBottom}/>
          <Image source={require(iconBottom)} style={styles.iconTop}/>
          {children}
        </View>
    </ScrollView>
        
  )
}