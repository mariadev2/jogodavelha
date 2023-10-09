import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container:{        
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        top:0,
        width: width,
        height: height 

                
    },
    background:{
        position: "absolute",
        //width: width,
        //height: height,
        width:414,
        height:736,
        

    },
 
      
  
    
})

export default styles;