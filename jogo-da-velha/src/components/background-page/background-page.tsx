import {  ScrollView, Image, View} from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import styles from './background-page.styles';


type BackgroundProps = {
    children: ReactNode,
    withoutScroll?: boolean
}

export default function BackgroundPage({children, withoutScroll}: BackgroundProps): ReactElement {
  return (
   withoutScroll ? 
                <View style={styles.container}>
                  <Image source={require('../../utils/assets/icon-top.png')} style={styles.iconTop}/>
                  <Image source={require('../../utils/assets/icon-button.png')} style={styles.iconBottom}/>
                  {children}
                </View> 
                : 
                <ScrollView > 
                   <View style={styles.container}>
                      <Image source={require('../../utils/assets/icon-top.png')} style={styles.iconTop}/>
                      <Image source={require('../../utils/assets/icon-button.png')} style={styles.iconBottom}/>
                      {children}
                    </View>
                </ScrollView>
        
  )
}

