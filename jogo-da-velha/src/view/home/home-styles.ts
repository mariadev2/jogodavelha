import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#FFFFFF',
        width : width,
        height: height
    },
    logo:{
        maxWidth: '60%',
        resizeMode: 'contain',
        height: 100
    },
    buttonContainer:{
        marginTop: 40
    },
    oldWoman:{
        width: 170,
        height: 170,
        resizeMode: 'contain',
        maxWidth: 170
    },
    iconBottom:{
        top: 0,
        right: -50,
        position: "absolute",
       
    },
    iconTop:{
        bottom: 15,
        left: 15,
        position: "absolute",
       
    }
})

export default styles;