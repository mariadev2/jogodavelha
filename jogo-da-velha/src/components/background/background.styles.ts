import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    iconejogodavelha:{
        position:"absolute",
        width:80,
        height:70,
        left:0,
        zIndex:1,
        bottom:70

    },
    iconebolinha:{
        position:"absolute",
        width:80,
        height:120,
        right: 30,
        top:0,
        zIndex:1
    },
    container:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        top:0,
        width: width,
        height: height 
    }
})

export default styles;