import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Principal() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    async function carregarUsuario() {
      const usuarioLogado = await AsyncStorage.getItem('Usuario Logado');
      if (usuarioLogado) {
        const dados = JSON.parse(usuarioLogado);
        setUsuario(dados.email);
      }
    }
    carregarUsuario();
  }, []);

  async function sair() {
    await AsyncStorage.removeItem('Usuario Logado');
    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão Sair fixo no topo direito */}
      <TouchableOpacity style={styles.botaoSair} onPress={sair}>
        <MaterialCommunityIcons name="logout" size={20} color="#fff" />
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/letra.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Interclasse Manager</Text>
        <Text style={styles.subtitulo}>Bem-vindo ao sistema</Text>

        <View style={styles.usuarioBox}>
          <MaterialCommunityIcons name="account-circle" size={70} color="#c5a059" />
          <Text style={styles.usuarioLabel}>Usuário Logado</Text>
          <Text style={styles.usuarioEmail}>{usuario}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuCard}>
            <MaterialCommunityIcons name="trophy" size={40} color="#c5a059" />
            <Text style={styles.menuText}>Campeonatos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <MaterialCommunityIcons name="soccer" size={40} color="#c5a059" />
            <Text style={styles.menuText}>Jogos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <MaterialCommunityIcons name="chart-bar" size={40} color="#c5a059" />
            <Text style={styles.menuText}>Resultados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuCard}>
            <MaterialCommunityIcons name="television" size={40} color="#c5a059" />
            <Text style={styles.menuText}>Placar Ao Vivo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Cor escura que cobrirá toda a tela
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 90, // Espaço para não cobrir a logo com o botão sair
    paddingBottom: 30,
  },
  botaoSair: {
    position: 'absolute',
    top: 50, // Ajuste dependendo do dispositivo/StatusBar
    right: 20,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b91c1c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  textoSair: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  logo: {
    width: 220,
    height: 90,
    alignSelf: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitulo: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  usuarioBox: {
    alignItems: 'center',
    marginBottom: 30,
  },
  usuarioLabel: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 15,
  },
  usuarioEmail: {
    color: '#c5a059',
    fontSize: 18,
    fontWeight: '#121212' === '#121212' ? 'bold' : 'normal',
    marginTop: 5,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#1e1e1e', // Um cinza levemente mais claro que o fundo para destacar os cards
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  menuText: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
});