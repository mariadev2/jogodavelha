import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 50,
        width : width,
        height: height
    },
    buttonLoadMore: {
        width: 300,
        height: 50,
        color: "#000",
        justifyContent: 'center',
        backgroundColor: 'rgba(231, 88, 49, 1)',
        borderRadius: 30,
        marginTop: 40,
        fontSize: 18
    },
    textHistory:{
        fontSize: 18,
        color: '#000',
        textAlign: 'center'
    },
    cardHistory:{
        padding: 15,
        width: 300,
        borderWidth: 1,
        backgroundColor: '#FFEFD5',
        borderBlockColor: 'red',
        borderRadius: 10,
        marginBottom: 20
    },
    textNewGame:{
        fontSize: 18,
        marginTop: 10,
        color: '#fff',
        textAlign: 'center'
    },
    btnNewGame:{
        width: '100%',
        height: 180,
        backgroundColor: 'rgba(231, 88, 49, 1)',
    },
    item: {
        backgroundColor: 'red',
        padding: 15,
        borderTopWidth: 1,
        borderColor:  'red',
        marginBottom: 20
    },
    itemTitle: {
      
        textAlign: "center",
        fontSize: 17,
        marginBottom: 10
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    newGameButton: {
        backgroundColor: 'red',
        padding: 20,
        paddingBottom: 30
    },
    newGameButtonText: { color:  'red', textAlign: "center", fontSize: 17 },
    itemBackground: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
});

export default styles;