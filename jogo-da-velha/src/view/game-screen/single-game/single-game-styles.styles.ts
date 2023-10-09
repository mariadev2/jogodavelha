import { Dimensions, StyleSheet } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width : width,
        height: height
    }
})

export default styles;