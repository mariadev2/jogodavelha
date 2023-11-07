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
    }
})

export default styles;