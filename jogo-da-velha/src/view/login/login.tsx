import { View, Text, Image, TouchableOpacity, TextInput as NativeTextInput, Alert } from 'react-native'
import React, { ReactElement, useRef, useState } from 'react'
import { BackgroundPage, ButtonComponent, TextInput  } from '../../components'
import styles from './login.styles'
import { Auth } from "aws-amplify";

export default function Login(): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: 'test2',
    password: 'test123456'
  })
  const [loading, setLoading] = useState(false);
  const setFormInput = (key: keyof typeof form, value: string)=>{
    setForm({...form, [key]: value});
  }

  const login = async () => {
    setLoading(true);
    const {username, password} = form;
    try {
        const user = await Auth.signIn(username, password)
        await Auth.completeNewPassword(user, password)
        
    } catch (error) {
        Alert.alert('Usuário não existe')
    }
    setLoading(false);

  }
  return (
    <BackgroundPage>
        <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
        <Image style={styles.oldWoman} source={require('../../utils/assets/old-woman.png')} />
        <View style={styles.contentGeral}>
            <View style={{ width:'100%'}}>
                <Text style={styles.textStart}>Vamos iniciar?</Text>
                <TextInput 
                    returnKeyType='next' 
                    placeholder='Nome'
                    value={form.username}
                    onChangeText={(value)=>{
                        setFormInput('username', value)
                    }}
                    onSubmitEditing={()=>{
                        passwordRef.current?.focus();
                    }}
                />
            </View>
           <TextInput 
                ref={passwordRef} 
                returnKeyType='done' 
                secureTextEntry 
                placeholder='Senha'
                value={form.password}
                onChangeText={(value)=>{
                    setFormInput('password', value)
                }}
            />
           <View style={styles.contentLabels}> 
            <TouchableOpacity>
                <Text style={styles.labelGeneral}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.labelGeneral}>Esqueceu a senha?</Text>
            </TouchableOpacity>
           </View>
           <ButtonComponent
                loading={loading}
                title={'Entrar'}
                styleText={styles.textButton}
                style={styles.button}
                onPress={()=>{
                    login();
                }}
            />
        </View>
       
    </BackgroundPage>
    
  )
}