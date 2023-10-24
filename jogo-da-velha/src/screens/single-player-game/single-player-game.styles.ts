import { DeliusUnicase_400Regular, DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";
import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginTop: 80,
        justifyContent: "center",
        flex: 1,
    },
    dificuldade:{
        textAlign: "left",
        fontSize: 26,
        color: colors.preto,
        marginBottom: 20,
        top: -90,
        left: -300

    },
    results:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,

    },
    resultsBox:{
        backgroundColor: colors.laranja,
        borderWidth: 1,
        borderColor: colors.vermelho,
        alignItems: "center",
        padding: 20,
        marginHorizontal: 5,
        top: -50

    },
    resultTitles:{

        color: colors.branco,
        fontSize: 20,

        

    },
    resultCount:{
        color: colors.branco,
        fontSize: 20

    },
    modal:{
        position: "absolute",
        backgroundColor: colors.branco,
        bottom: 40,
        left: 30,
        right: 30,
        padding: 30,
        borderWidth: 3,
        borderColor: colors.laranjaEscuro,
        alignContent: "center"


    },
    modalText:{
        color: colors.preto,
        fontSize: 28,
        textAlign:"center",
        marginBottom: 30,
        

    }
})

export default styles;