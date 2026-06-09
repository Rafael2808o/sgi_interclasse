import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    StyleSheet,
    StatusBar
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <ImageBackground
                source={require('../../assets/fundo.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/letra.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.subtitulo}>
                            Organize campeonatos, jogos e resultados
                        </Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.botaoEntrar}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.textoBotao}>
                                ENTRAR
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.rodape}>
                            © 2026 Interclasse Manager
                        </Text>
                    </View>

                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 50,
        paddingBottom: 30,
    },

    logoContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
    },

    logo: {
        width: 1270,
        height: 220,
        padding: 20,
    },

    subtitulo: {
        color: '#b9b9b9',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: -10,
        paddingHorizontal: 30,
        letterSpacing: 0.5,
    },

    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    botaoEntrar: {
        width: '100%',
        maxWidth: 420,
        height: 65,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textoBotao: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    rodape: {
        color: '#d1d5db',
        marginTop: 20,
        fontSize: 13,
    },
});