import { StyleSheet } from "react-native";
import { colors } from "../../utils";

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    choices:{
        flexDirection: "row",
        flexWrap: "wrap", 
        marginTop: 10,
        marginHorizontal: -5


    },
    choiceText:{
        color: colors.branco,


    },
    label:{
        color: colors.laranja,
        fontSize: 20,

    },
    choice:{
        backgroundColor: colors.laranja,
        padding: 10,
        margin: 5,




    },
    field:{
        marginBottom: 30,

    },
    swithField:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }

})

export default styles;