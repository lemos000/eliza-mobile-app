import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Usuario {
  nome: string;
  email: string;
}


export default function ProfileScreen({ setToken }: { setToken: (token: string | null) => void }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('nome');
    await AsyncStorage.removeItem('email');
    setUsuario(null);
    setToken(null);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e88e5" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Não foi possível carregar os dados do usuário.</Text>
        <Button title="Tentar novamente" onPress={fetchProfile} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{usuario.nome}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{usuario.email}</Text>
      <View style={{ marginTop: 32 }}>
        <Button title="Sair" color="#d32f2f" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#181818', // dark terminal bg
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#00ff00', // terminal green
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#00ff00', // terminal green
    fontFamily: 'monospace',
  },
  value: {
    fontSize: 16,
    color: '#39ff14', // lighter green
    marginBottom: 8,
    fontFamily: 'monospace',
  },
});
