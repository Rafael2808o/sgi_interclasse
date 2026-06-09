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
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native';

import { Feather } from '@expo/vector-icons';

export default function Login() {
    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [lembrar, setLembrar] = useState(false);

    async function fazerLogin() {
        try {
            if (!email || !senha) {
                setMensagem('Preencha todos os campos');
                return;
            }

            const usuario = {
                email,
                senha,
                lembrar
            };

            await AsyncStorage.setItem(
                'Usuario Logado',
                JSON.stringify(usuario)
            );

            // Se marcou "lembrar de mim", salva os dados para próximo login
            if (lembrar) {
                await AsyncStorage.setItem(
                    'DadosLogin',
                    JSON.stringify({ email, senha })
                );
            } else {
                // Se desmarcou, remove os dados salvos
                await AsyncStorage.removeItem('DadosLogin');
            }

            navigation.navigate('Principal');
        } catch (error) {
            setMensagem(`Erro ao realizar login: ${error.message}`);
        }
    }

    useEffect(() => {
        async function verificarLogin() {
            const usuarioLogado =
                await AsyncStorage.getItem('Usuario Logado');

            if (usuarioLogado) {
                const usuario = JSON.parse(usuarioLogado);

                if (usuario.lembrar) {
                    navigation.navigate('Principal');
                }
            }

            // Carrega os dados salvos se existirem
            const dadosLogin = await AsyncStorage.getItem('DadosLogin');
            if (dadosLogin) {
                const { email: emailSalvo, senha: senhaSalva } = JSON.parse(dadosLogin);
                setEmail(emailSalvo);
                setSenha(senhaSalva);
                setLembrar(true);
            }
        }

        verificarLogin();
    }, []);

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>

                <View style={styles.card}>

                    <Image
                        source={require('../../assets/fundo2.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.titulo}>
                        Bem-vindo de volta!
                    </Text>

                    <Text style={styles.subtitulo}>
                        Faça login para continuar
                    </Text>

                    <Text style={styles.label}>
                        E-mail
                    </Text>

                    <View style={styles.inputContainer}>
                        <Feather
                            name="mail"
                            size={22}
                            color="#777"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="seu@email.com"
                            placeholderTextColor="#777"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <Text style={styles.label}>
                        Senha
                    </Text>

                    <View style={styles.inputContainer}>
                        <Feather
                            name="lock"
                            size={22}
                            color="#777"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#777"
                            secureTextEntry={showPassword}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            <Feather
                                name={
                                    showPassword
                                        ? 'eye-off'
                                        : 'eye'
                                }
                                size={22}
                                color="#777"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.optionsRow}>
                        <View style={styles.checkboxRow}>
                            <Switch
                                value={lembrar}
                                onValueChange={setLembrar}
                                trackColor={{ false: '#444', true: '#ffd36b' }}
                                thumbColor={lembrar ? '#fff' : '#ccc'}
                            />

                            <Text style={styles.rememberText}>
                                Lembrar de mim
                            </Text>
                        </View>
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
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={fazerLogin}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginText}>
                                ENTRAR
                            </Text>
                        </TouchableOpacity>x'
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

                <Text style={styles.footer}>
                    © 2026 Interclasse Manager
                </Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    logo: {
        width: 1240,
        height: 200,
        alignSelf: 'center',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },

    card: {
        width: '100%',
        maxWidth: 440,
        backgroundColor: 'rgba(15,15,15,0.95)',
        borderRadius: 34,
        padding: 26,

        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.45,
        shadowRadius: 22,
        elevation: 18
    },

    titulo: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center'
    },

    subtitulo: {
        color: '#c1c1c1',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 26,
        fontSize: 15
    },

    label: {
        color: '#f5f5f5',
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 13
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderRadius: 18,
        paddingHorizontal: 16,
        height: 58,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)'
    },

    input: {
        flex: 1,
        color: '#fff',
        marginLeft: 12,
        fontSize: 15
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },

    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    checkboxChecked: {
        backgroundColor: '#ffd36b',
        borderColor: '#ffd36b'
    },

    rememberText: {
        color: '#d1d1d1',
        fontSize: 13,
        fontWeight: '600'
    },

    forgot: {
        color: '#ffd36b',
        fontWeight: '700',
        fontSize: 13
    },

    loginButton: {
        height: 58,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        backgroundColor: '#fff',
    },

    loginText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1.1
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
        color: '#c5c5c5'
    },

    registerLink: {
        color: '#ffd36b',
        marginLeft: 6,
        fontWeight: '800'
    },

    footer: {
        color: '#9a9a9a',
        marginTop: 18,
        textAlign: 'center'
    }
});