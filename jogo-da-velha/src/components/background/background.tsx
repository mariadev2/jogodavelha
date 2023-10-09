import React, {Children, ReactElement,ReactNode} from "react";
import { ScrollView, Image, View } from "react-native";
import styles from "../../screens/home/home.styles";
const icon = '../../components/imagens/background.png'
type BackgroundProps = {

    children : ReactNode,
}
export default function BackgroundPage ({children} : BackgroundProps): ReactElement{
    return(
            <ScrollView>
                <View style={styles.container}>
                    <Image source = {require("../../components/imagens/background.png")} style={styles.background}/>
                    {children}
                </View>
            </ScrollView>
    )
}
