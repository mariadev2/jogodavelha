import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{        
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        top:-20,
        width: width,
        height: height, 
    },
    iconejogo:{
        width:350,
        height:95,
        position: "absolute",
        top:40,
        zIndex:1,
    },
    iconevelha:{
        width:150,
        height:150,
        top:230, 
        zIndex:2,

    }
     
})

export default styles;