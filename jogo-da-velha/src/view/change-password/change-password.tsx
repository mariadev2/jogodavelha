import { View, Text, Image, TouchableOpacity, TextInput as NativeTextInput, Alert } from 'react-native'
import React, { ReactElement, useRef, useState } from 'react'
import { BackgroundPage, ButtonComponent, TextInput  } from '../../components'
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import styles from './change-password.styles'
import { Auth } from "aws-amplify";
import { useAuth } from '../../contexts/auth-context';


type LoginProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>
}

export default function ChangePassword({navigation}: LoginProps): ReactElement {
    const { user } = useAuth();
    const newPasswordRef = useRef<NativeTextInput | null>(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const changePassword = async () => {
        const { oldPassword, newPassword } = form;
        setLoading(true);
        try {
            await Auth.changePassword(user, oldPassword, newPassword);
            setForm({
                oldPassword: "",
                newPassword: ""
            });
            Alert.alert("Sucesso!", "Senha alterada com sucesso!");
        } catch (error) {
            Alert.alert("Erro!", (error as Error).message || "Aconteceu um erro!");
        }
        setLoading(false);
    };

  return (
    <BackgroundPage>
        <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
        <Image style={styles.oldWoman} source={require('../../utils/assets/old-woman.png')} />
        <View style={styles.contentGeral}>
            <View style={{ width:'100%'}}>
                {!user ? (
                            <Text>Você não está logado</Text>
                         ) : (
                            <>
                                <Text style={styles.textStart}>Insira os dados do usuário: {user.username}</Text>
                                <TextInput
                                    secureTextEntry
                                    returnKeyType="next"
                                    style={{ marginBottom: 20 }}
                                    placeholder="Senha antiga"
                                    onSubmitEditing={() => {
                                        newPasswordRef.current?.focus();
                                    }}
                                    value={form.oldPassword}
                                    onChangeText={value => setFormInput("oldPassword", value)}
                                />
                                <TextInput
                                    secureTextEntry
                                    returnKeyType="done"
                                    style={{ marginBottom: 30 }}
                                    ref={newPasswordRef}
                                    placeholder="Senha nova"
                                    value={form.newPassword}
                                    onChangeText={value => setFormInput("newPassword", value)}  
                                />
                            </>
                         )}     
            </View>
                
           <ButtonComponent
                loading={loading}
                title={'Entrar'}
                styleText={styles.textButton}
                style={styles.button}
                onPress={()=>{
                    changePassword()
                }}
            />
        </View>
       
    </BackgroundPage>
    
  )
}