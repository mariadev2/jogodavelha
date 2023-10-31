import { View, Text, Image, TextInput as NativeTextInput, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { BackgroundPage, ButtonComponent, TextInput  } from '../../components'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import styles from './signup.styles'
import { Auth } from "aws-amplify";
import { RouteProp } from '@react-navigation/native';


type SignUpProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'SignUp'>
    route: RouteProp<StackNavigatorParams, "SignUp">;
}

export default function SignUp({navigation, route}: SignUpProps): ReactElement {
    const unconfirmedUsername = route.params?.username;
    const [step, setStep] = useState<"signUp" | "otp">(unconfirmedUsername ? "otp" : "signUp");
    const passwordRef = useRef<NativeTextInput | null>(null);
    const emailRef = useRef<NativeTextInput | null>(null);
    const usernameRef = useRef<NativeTextInput | null>(null);
    const [form, setForm] = useState({
        username: 'player1',
        email: 'vakaxe9587@monutri.com',
        name: 'player1',
        password: 'test123456'
    })
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [resending, setResending] = useState(false);
    const setFormInput = (key: keyof typeof form, value: string)=>{
        setForm({...form, [key]: value});
    }

    const signUp = async () => {
        setLoading(true);
        const {username, password, email, name} = form;
        try {
           const test =  await Auth.signUp({
                username,
                password,
                attributes:{
                    email,
                    name
                }
            })
            console.log(test);
            
            setStep('otp')
        } catch (error ) {
            var erro = error as Error;
            Alert.alert('Erro!', erro.message || 'Aconteceu algum erro')
        }
        setLoading(false);

    }

    const confirmCode = async (code: string) => {
        setConfirming(true);
        try {
            await Auth.confirmSignUp(form.username || unconfirmedUsername || "", code);
            navigation.navigate("Login");
            Alert.alert("Sucesso!", "Você pode realizar login");
        } catch (error ) {
            Alert.alert("Error!", (error as Error).message || "An error has occurred!");
        }
        setConfirming(false);
    };

    const resendCode = async (username: string) => {
        setResending(true);
        try {
           const test = await Auth.resendSignUp(username);
           console.log(test);
           
        } catch (error ) {
            Alert.alert("Error!", (error as Error).message || "An error has occurred!");
        }
        setResending(false);
    };

    useEffect(() => {
        if (unconfirmedUsername) {
            resendCode(unconfirmedUsername);
        }
    }, []);
    
  return (
    <KeyboardAvoidingView behavior='height'>
        <BackgroundPage>
            {step === 'otp' && 
                <>
                    <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                    <View style={{padding: 20, height: 300}}>
                        <Text style={{marginTop: 80}}>Insira o código enviado par ao seu e-mail</Text>
                        {confirming ? (<ActivityIndicator/>) : 
                            (
                            <>
                                <OTPInputView 
                                    style={{marginBottom: 140 }} 
                                    pinCount={6} 
                                    placeholderCharacter='0' 
                                    placeholderTextColor='#000'
                                    codeInputFieldStyle={styles.optInput}
                                    codeInputHighlightStyle={styles.optInputActive}
                                    onCodeFilled={(code)=>{
                                        confirmCode(code)
                                    }}
                                />
                                {resending ? (<ActivityIndicator/>) 
                                           :
                                            (
                                                <TouchableOpacity  style={{marginTop: -140 }} onPress={()=>{
                                                    if (form.username) {
                                                        resendCode(form.username);
                                                    }
                                                    if (unconfirmedUsername) {
                                                        resendCode(unconfirmedUsername);
                                                    }
                                                }}>
                                                    <Text>Reenviar</Text>
                                                </TouchableOpacity>
                                            )
                                }
                            </>
                            )
                        }
                    </View>
                   
                </>

                
            }
            {step === 'signUp' &&
            <>
                <Image style={styles.logo} source={require('../../utils/assets/logo-app.png')} />
                <Image style={styles.oldWoman} source={require('../../utils/assets/old-woman.png')} />
                <View style={styles.contentGeral}>
                    <View style={{ width:'100%'}}>
                        <Text style={styles.textStart}>Iniciar cadastro:</Text>
                        <TextInput 
                            returnKeyType='next' 
                            placeholder='Nome'
                            value={form.name}
                            onChangeText={(value)=>{
                                setFormInput('name', value)
                            }}
                            onSubmitEditing={()=>{
                                usernameRef.current?.focus();
                            }}
                        />
                    </View>
                    <TextInput 
                        ref={usernameRef}
                        returnKeyType='next'
                        placeholder='Apelido'
                        value={form.username}
                        onChangeText={(value)=>{
                            setFormInput('username', value)
                        }}
                        onSubmitEditing={()=>{
                            emailRef.current?.focus();
                        }}
                    />
                    <TextInput 
                        ref={emailRef}
                        keyboardType='email-address'
                        returnKeyType='next'
                        placeholder='E-mail'
                        value={form.email}
                        onChangeText={(value)=>{
                            setFormInput('email', value)
                        }}
                        onSubmitEditing={()=>{
                            passwordRef.current?.focus();
                        }}
                    />
                    <TextInput 
                        ref={passwordRef}
                        returnKeyType='done'
                        placeholder='Senha'
                        secureTextEntry 
                        value={form.password}
                        onChangeText={(value)=>{
                            setFormInput('password', value)
                        }}
                    />
                
                    <ButtonComponent
                        loading={loading}
                        title={'Cadastrar'}
                        styleText={styles.textButton}
                        style={styles.button}
                        onPress={()=>{
                            signUp();
                        }}
                    />
                </View>
            </>
            }
        </BackgroundPage>
    </KeyboardAvoidingView>
    
    
  )
}