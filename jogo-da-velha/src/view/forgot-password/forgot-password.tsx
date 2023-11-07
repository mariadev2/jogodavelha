import { View, Text, Image, TouchableOpacity, TextInput as NativeTextInput, Alert } from 'react-native'
import React, { ReactElement, useRef, useState } from 'react'
import { BackgroundPage, ButtonComponent, TextInput  } from '../../components'
import { NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackNavigatorParams } from "../../configs/navigator";
import styles from './forgot-password.styles'
import { Auth } from "aws-amplify";
import { useAuth } from '../../contexts/auth-context';


type LoginProps = {
    navigation: NativeStackNavigationProp<StackNavigatorParams, 'Home'>
}

export default function ForgotPassword({navigation}: LoginProps): ReactElement {
    const passwordRef = useRef<NativeTextInput | null>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"1" | "2">("1");
    const [form, setForm] = useState({
        username: "",
        password: "",
        code: ""
    });
    const setFormInput = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const forgotPassword = async () => {
        const { username } = form;
        setLoading(true);
        try {
            await Auth.forgotPassword(username);
            setStep("2");
        } catch (error) {
            Alert.alert("Erro!", (error as Error).message || "Aconteceu um erro!");
        }
        setLoading(false);
    };

    const forgotPasswordSubmit = async () => {
        const { username, code, password } = form;
        setLoading(true);
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            Alert.alert("Sucesso!", "Senha alterada com sucesso!");
            navigation.navigate("Login");
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
            {step === "1" && (
                            <TextInput
                                returnKeyType="next"
                                style={{ marginBottom: 20 }}
                                placeholder="Username"
                                value={form.username}
                                onChangeText={value => setFormInput("username", value)}
                            />
            )}
            {step === "2" && (
                            <>
                                <TextInput
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    style={{ marginBottom: 20 }}
                                    placeholder="Verification Code"
                                    value={form.code}
                                    onChangeText={value => setFormInput("code", value)}
                                    onSubmitEditing={() => {
                                        passwordRef.current?.focus();
                                    }}
                                />
                                <TextInput
                                    secureTextEntry
                                    returnKeyType="done"
                                    style={{ marginBottom: 20 }}
                                    ref={passwordRef}
                                    placeholder="New Password"
                                    value={form.password}
                                    onChangeText={value => setFormInput("password", value)}
                                />
                            </>
                )}
                
           <ButtonComponent
                loading={loading}
                title={'Enviar'}
                styleText={styles.textButton}
                style={styles.button}
                onPress={()=>{
                    if (step === "1") {
                        forgotPassword();
                    }
                    if (step === "2") {
                        forgotPasswordSubmit();
                    }
                }}
            />
        </View>
       
    </BackgroundPage>
    
  )
}