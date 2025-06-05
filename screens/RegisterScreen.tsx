import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://api-gs-1sem.onrender.com/api/auth/register', {
        nome,
        email,
        senha,
      });
      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para continuar.');
      navigation.navigate('Login');
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert('Erro no cadastro', error.response.data?.message || 'Tente novamente.');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1e88e5" style={{ marginTop: 16 }} />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
      <Button
        title="Já tem conta? Faça login"
        onPress={() => navigation.navigate('Login')}
        color="#777"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f7f9fb' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#1e88e5' },
  input: { borderWidth: 1, borderColor: '#d4d4d4', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
});

export default RegisterScreen;
