import {  StyleSheet } from "react-native";
import colors from "../../utils/colors"



const styles = StyleSheet.create({
    board:{
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    cell:{
        width: '33.33333%', 
        height: '33.33333%', 
        borderWidth:0.1, 
        borderColor: colors.preto,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    cellText:{
        color: colors.laranja,

    },
    cell0: {
        borderTopWidth: 0,
        borderLeftWidth: 0
    },
    cell1: {
        borderTopWidth: 0
    },
    cell2: {
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    cell3: {
        borderLeftWidth: 0
    },
    cell5: {
        borderRightWidth: 0
    },
    cell6: {
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },
    cell7: {
        borderBottomWidth: 0
    },
    cell8: {
        borderBottomWidth: 0,
        borderRightWidth: 0
    }
});

export default styles;