import { Dimensions, StyleSheet } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    logo:{
        maxWidth: '60%',
        resizeMode: 'contain',
        height: 100
    },
    container:{
        alignItems: 'center',
        width : width,
        height: height
    },
    difficulty: {
        color: '#E78F31',
        fontSize: 22,
        textAlign: "center",
        marginBottom: 10
    },
    results: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30
    },
    resultsBox: {
        backgroundColor: 'rgba(218, 57, 65, 0.51)',
        borderWidth: 1,
        borderColor: '#000',
        alignItems: "center",
        padding: 15,
        marginHorizontal: 5
    },
    resultsTitle: {
        color: '#000',
        fontSize: 14
    },
    resultsCount: {
        color: '#000',
        fontSize: 20
    },
    modal: {
        position: "absolute",
        backgroundColor: '#fff',
        borderRadius: 20,
        bottom: 60,
        left: 30,
        right: 30,
        padding: 20,
        borderWidth: 3,
        color: '#000',
    },
    modalText: {
        color: '#000',
        fontSize: 25,
        textAlign: "center",
        marginBottom: 30
    }
})

export default styles;