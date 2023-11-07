import { StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    containerGeral: {
        height: SCREEN_HEIGHT * 0.6 , 
        backgroundColor: '#FFEFD5', 
        marginTop: SCREEN_HEIGHT * 0.4
    },
    playerItem: {
        backgroundColor: 'rgba(218, 57, 65, 0.51)',
        borderTopWidth: 1,
        borderColor: '#FFEFD5',
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20
    }
});

export default styles;