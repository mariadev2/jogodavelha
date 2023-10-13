import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#FFFFFF',
        width :  width,
        height: height
    },
    content:{
        paddingTop: 10,
        paddingHorizontal: 20,
        width :  width,
        display: "flex",
        alignItems: 'flex-start'
    },
    logo:{
        maxWidth: '60%',
        resizeMode: 'contain',
        height: 100
    },
    choices: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginHorizontal: -5
    },
    choice: {
        backgroundColor: 'rgba(218, 57, 65, 0.51)',
        padding: 10,
        margin: 5
    },
    label: {
        color: '#E78F31',
        fontSize: 18
    },
    switchField: {
        width: width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    switch:{
        marginRight: 30
    },
    field: {
        marginTop: 30,
        marginBottom: 30
    },
})

export default styles;