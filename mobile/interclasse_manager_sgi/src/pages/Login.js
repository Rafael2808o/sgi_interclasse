import React, { useState, useEffect } from 'react';
import {    
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';


import { Feather } from '@expo/vector-icons';

export default function Login() {
    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [lembrar, setLembrar] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [senhaFocus, setSenhaFocus] = useState(false);
    const [carregando, setCarregando] = useState(false);

async function fazerLogin() {
    try {
        if (!email || !senha) {
            setMensagem('Preencha todos os campos');
            return;
        }

        setCarregando(true);
        setMensagem(''); 

const response = await fetch(
  'https://interclassemanager-seven.vercel.app/login',
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim(),
      senha,
    }),
  }
);

        const data = await response.json();

if (!response.ok) {
    setMensagem('Email ou senha incorretos');
    setCarregando(false);
    return;
}

        if (lembrar) {
    await AsyncStorage.setItem(
        'Usuario Logado',
        JSON.stringify(data)
    );

    await AsyncStorage.setItem(
        'DadosLogin',
        JSON.stringify({ email, senha })
    );
} else {
    await AsyncStorage.removeItem('Usuario Logado');
    await AsyncStorage.removeItem('DadosLogin');
}

        setCarregando(false); 
        navigation.navigate('Principal');

    } catch (error) {
    console.log('ERRO LOGIN:', error);
    setMensagem(error.message || 'Erro ao conectar com o servidor');
    setCarregando(false);
}
}

useEffect(() => {
    async function verificarLogin() {
        const usuarioLogado = await AsyncStorage.getItem('Usuario Logado');

        if (usuarioLogado) {
            navigation.navigate('Principal');
            return;
        }

        const dadosLogin = await AsyncStorage.getItem('DadosLogin');

        if (dadosLogin) {
            const { email: emailSalvo, senha: senhaSalva } = JSON.parse(dadosLogin);
            setEmail(emailSalvo);
            setSenha(senhaSalva);
            setLembrar(true);
        }
    }

    const unsubscribe = navigation.addListener('focus', () => {
        verificarLogin();
    });

    verificarLogin(); 

    return unsubscribe; 
}, []);

return (
    <View style={styles.overlay}>
        <View style={styles.container}>

            <Image
                source={require('../../../interclasse_manager_sgi/assets/logoverMob.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.card}>

                    <Text style={styles.titulo}>
                        Bem-vindo de volta!
                    </Text>

                    <Text style={styles.subtitulo}>
                        Faça login para continuar
                    </Text>

                    <Text style={styles.label}>
                        E-mail
                    </Text>

<View
    style={[
        styles.inputContainer,
        emailFocus && styles.inputFocused
    ]}
>
<Feather
    name="mail"
    size={22}
    color="#777"
/>

    <TextInput
style={[styles.input, { outlineStyle: 'none' }]}
        placeholder="seu@email.com"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
    />
</View>

                    <Text style={styles.label}>
                        Senha
                    </Text>

                    <View
    style={[
        styles.inputContainer,
        senhaFocus && styles.inputFocused
    ]}
>
<Feather
    name="lock"
    size={22}
    color="#777"
/>
<TextInput

    style={[styles.input, { outlineStyle: 'none' }]} 
    placeholder="••••••••"
    placeholderTextColor="#777"
    secureTextEntry={showPassword}
    value={senha}
    onChangeText={setSenha}
    onFocus={() => setSenhaFocus(true)}
    onBlur={() => setSenhaFocus(false)}
    underlineColorAndroid="transparent"
    selectionColor="#c5a059"
    cursorColor="#c5a059"
/>

    <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
    >
<Feather
    name={showPassword ? 'eye-off' : 'eye'}
    size={22}
    color="#777"
/>
    </TouchableOpacity>
</View>

                    <View style={styles.optionsRow}>
                        <TouchableOpacity
                            style={styles.checkboxRow}
                            activeOpacity={0.8}
                            onPress={() => setLembrar(!lembrar)}
                        >
<View style={styles.switchRow}>
    <TouchableOpacity
        style={[
            styles.customSwitch,
            lembrar && styles.customSwitchActive
        ]}
        activeOpacity={0.8}
        onPress={() => setLembrar(!lembrar)}
    >
        <View
            style={[
                styles.customThumb,
                lembrar && styles.customThumbActive
            ]}
        />
    </TouchableOpacity>

    <Text style={styles.rememberText}>
        Lembrar de mim
    </Text>
</View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    'Aviso',
                                    'Função em desenvolvimento'
                                )
                            }
                        >
                            <Text style={styles.forgot}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>
                    </View>

<TouchableOpacity
    activeOpacity={0.9}
    onPress={fazerLogin}
    disabled={carregando} 
    style={{ opacity: carregando ? 0.7 : 1 }} 
>
    <LinearGradient
        colors={['#111111', '#1b1b1b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.loginButton}
    >
        <Text style={styles.loginText}>
            {carregando ? 'ENTRANDO...' : 'ENTRAR'}
        </Text>
    </LinearGradient>
</TouchableOpacity>

                    {mensagem !== '' && (
                        <Text style={styles.error}>
                            {mensagem}
                        </Text>
                    )}

                    <View style={styles.registerRow}>
                        <Text style={styles.registerText}>
                            Ainda não tem uma conta?
                        </Text>

                        <TouchableOpacity>
                            <Text style={styles.registerLink}>
                                Criar conta
                            </Text>
                        </TouchableOpacity>
                    </View>

</View>
<View style={styles.footerWrapper}>

    <View style={styles.footerTextWrapper}>
        <Text style={styles.footerText}>
            © 2026 Interclasse Manager. Todos os direitos reservados.
        </Text>
    </View>

    <View style={styles.footerLinksContainer}>
        <TouchableOpacity>
            <Text style={styles.footerLink}>Termos de Uso</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.footerLink}>Política de Privacidade</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.footerLink}>Suporte</Text>
        </TouchableOpacity>
    </View>

</View>

        </View>
    </View>
);
}

const styles = StyleSheet.create({
overlay: {
    flex: 1,
    backgroundColor: '#000',
},

container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
    paddingTop: 60,
},

logo: {
    width: 350,
    height: 200,
    alignSelf: 'center',
    marginTop: -15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 14,

    elevation: 12,
},
footerWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
},

card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: 'rgba(18,18,18,0.92)',
    borderRadius: 28,
    
    marginTop: 40, 

    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(197,160,89,0.20)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.55,
    shadowRadius: 25,
    elevation: 18,
},
footerTextWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
},

titulo: {
    color: '#fff',
    fontSize: 38,
    textAlign: 'center',
    fontFamily: 'Jacquard24',
    marginTop: 5,
},

subtitulo: {
    color: '#b9b9b9',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
    fontSize: 14,
},

    label: {
        color: '#8f8e8e',
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 13
    },
inputFocused: {

        borderColor: '#c5a059',
        borderWidth: 1,

        shadowColor: 'transparent',
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },

inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0d0d0d',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 18,

        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)', 
    },

input: {
        flex: 1,
        color: '#fff',
        marginLeft: 12,
        fontSize: 15,
        includeFontPadding: false,   
        paddingVertical: 0,          
        
        outlineStyle: 'none', 
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },


switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
},

rememberText: {
    color: '#b1b1b1',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
},

    forgot: {
        color: '#c5a059',
        fontWeight: '700',
        fontSize: 13
    },

loginButton: {
    width: '100%',
    height: 56,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',

    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,

    elevation: 8,
},

loginText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
},

    error: {
        color: '#ff7b7b',
        textAlign: 'center',
        marginTop: 12
    },

    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },

    registerText: {
        color: '#b1b1b1',
        fontSize: 13,
    },

    registerLink: {
        fontSize: 13,
        color: '#c5a059',
        marginLeft: 6,
        fontWeight: '800'
    },

footer: {
    position: 'absolute',
    bottom: 3,

    width: '100%',

    textAlign: 'center',

    fontSize: 12,

    color: 'rgba(255,255,255,0.45)',
},
    customSwitch: {
    width: 42,
    height: 22,
    borderRadius: 30,
    backgroundColor: '#444',
    justifyContent: 'center',
    paddingHorizontal: 3,
},
footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    marginBottom: 0,
},
footerLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',

    paddingVertical: 12,
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',

    backgroundColor: 'rgba(0,0,0,0.45)',
},

footerLink: {
    color: '#bbb',
    fontSize: 13,
    marginHorizontal: 9, 
},

footerLinkActive: {
    color: '#fff',
},

customSwitchActive: {
    backgroundColor: '#c5a059',
},

customThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
},

customThumbActive: {
    transform: [{ translateX: 20 }],
},
});