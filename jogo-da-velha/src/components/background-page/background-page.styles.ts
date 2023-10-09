import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#FFFFFF',
        width :  width,
        height: height
    },
    iconTop:{
        top: 0,
        height: 178,
        width: 175,
        right: -50,
        position: "absolute",
       
    },
    iconBottom:{
        bottom: 15,
        height: 95,
        width: 105,
        left: 15,
        position: "absolute",
       
    }
})

export default styles;