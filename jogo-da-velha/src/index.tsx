import { StyleSheet, View} from 'react-native';
import AppLoading from 'expo-app-loading';
import { Text } from './components';
import { useFonts,
   DeliusUnicase_400Regular, 
   DeliusUnicase_700Bold } from "@expo-google-fonts/delius-unicase";



export default function App() {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular, 
    DeliusUnicase_700Bold,
  })
  if (!fontLoaded) return <AppLoading/>;
  return (
    <View style={styles.container}>
      <Text 
        style={{fontSize: 25}}
        weight="400"
      >
       asdasddsds <Text weight='700'>asd </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
