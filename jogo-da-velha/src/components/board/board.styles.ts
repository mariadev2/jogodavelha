import {  StyleSheet } from "react-native";



const styles = StyleSheet.create({
    board:{
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    cell:{
        width: '33.33333%', 
        height: '33.33333%', 
        borderWidth: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
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
})

export default styles;