import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface Usuario {
  nome: string;
  email: string;
}

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
        navigation.navigate('Login');
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
    navigation.navigate('Login');
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
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f7f9fb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#1e88e5' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  value: { fontSize: 16, color: '#555', marginBottom: 8 },
});
