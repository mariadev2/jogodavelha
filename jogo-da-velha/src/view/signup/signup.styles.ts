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
    oldWoman:{
        height:200,
        marginBottom: 40
    
    },
    contentGeral:{
        paddingHorizontal: 25, 
        width:'100%', 
        alignItems:'center'
    },
    labelGeneral:{
        color: 'rgba(231, 88, 49, 1)', 
        paddingLeft: 5, 
        fontWeight: 'bold'
    },
    textSignin:{
        borderRadius:30, 
        width: 300,  
        fontSize: 16,
        color: '#fff', 
        textAlign: 'center' , 
        backgroundColor: 'rgba(231, 88, 49, 1)',
        fontWeight: 'bold', 
        padding: 15
    },
    contentLabels:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width:'100%'
    },
    textStart:{
        width: '100%', 
        backgroundColor: 'rgba(231, 88, 49, 1)', 
        paddingLeft: 5, 
        color: '#fff'
    },
    logo:{
        marginTop: -40,
        maxWidth: '60%',
        resizeMode: 'contain',
        height: 100
    },
    registerLink: {
        color: 'red',
        textAlign: "center",
        marginTop: 20,
        textDecorationLine: "underline"
    },
    forgotPasswordLink: {
        color: 'red',
        textAlign: "right",
        fontSize: 12,
        marginTop: -15,
        marginBottom: 30,
        textDecorationLine: "underline"
    },
    button:{
        width: 300,   
        backgroundColor:'rgba(231, 88, 49, 1)',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom:20, 
        marginTop: 20,
        fontFamily: 'sans-serif'
    },
    textButton:{
        fontFamily: 'sans-serif',
        color: '#fff',
        fontSize: 16, 
        textAlign: 'center', 
        fontWeight: 'bold', 
    },
    optInput:{
        color: '#000',
        fontSize: 20,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: 'rgba(218, 57, 65, 0.51)'
    },
    optInputActive:{
        borderWidth: 1,
        borderColor: '#000'
    }
});

export default styles;