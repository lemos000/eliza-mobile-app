import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  nome: string;
  email: string;
}

export default function TelaPerfil({ setToken }: { setToken: (token: string | null) => void }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  const buscarPerfil = async () => {
    setCarregando(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
        return;
      }
      const nome = await AsyncStorage.getItem('nome');
      const email = await AsyncStorage.getItem('email');
      if (nome && email) {
        setUsuario({ nome, email });
      } else {
        setUsuario(null);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar seu perfil.');
      setToken(null);
    }
    setCarregando(false);
  };

  useEffect(() => {
    buscarPerfil();
  }, []);

  const sair = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('nome');
    await AsyncStorage.removeItem('email');
    setUsuario(null);
    setToken(null);
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e88e5" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.erro}>Não foi possível carregar os dados do usuário.</Text>
        <Button title="Tentar novamente" onPress={buscarPerfil} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Perfil</Text>
      <View style={styles.secao}>
        <Text style={styles.rotulo}>Nome:</Text>
        <Text style={styles.valor}>{usuario.nome}</Text>
      </View>
      <View style={styles.secao}>
        <Text style={styles.rotulo}>Email:</Text>
        <Text style={styles.valor}>{usuario.email}</Text>
      </View>
      <TouchableOpacity onPress={sair} style={styles.botaoSair}>
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: width < 400 ? 16 : 32,
  },
  titulo: {
    fontSize: width < 400 ? 26 : 48,
    fontWeight: 'bold',
    color: '#39ff14',
    marginBottom: 24,
    fontFamily: 'monospace',
    textAlign: 'center',
    textShadowColor: '#0f0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  secao: {
    alignItems: 'center',
    marginVertical: 8,
  },
  rotulo: {
    fontSize: 22,
    color: '#00ff00',
    fontWeight: '600',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  valor: {
    fontSize: 20,
    color: '#e0ffe0',
    fontFamily: 'monospace',
  },
  botaoSair: {
    marginTop: 30,
    backgroundColor: '#39ff14',
    borderWidth: 2,
    borderColor: '#1e1e1e',
    paddingVertical: width < 400 ? 10 : 14,
    paddingHorizontal: width < 400 ? 30 : 50,
    borderRadius: 10,
    elevation: 4,
  },
  textoBotao: {
    color: '#181818',
    fontSize: width < 400 ? 16 : 18,
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  erro: {
    color: '#ff6666',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
