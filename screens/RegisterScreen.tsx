import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/types';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }
    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setError(""); 
    try {
      await axios.post('https://api-gs-1sem.onrender.com/api/auth/register', {
        nome,
        email,
        senha,
      });
      navigation.navigate('Login');
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={text => {
          setNome(text);
          if (error) setError("");
        }}
        autoCapitalize="words"
        placeholderTextColor="#00ff00"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (error) setError("");
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#00ff00"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={text => {
          setSenha(text);
            if (error) setError("");
          }}
          secureTextEntry
          placeholderTextColor="#00ff00"
          selectionColor="#00ff00"
          keyboardAppearance="dark"
          />

          {loading ? (
          <View style={{
            backgroundColor: "#1a1a1a",
            borderRadius: 4,
            borderColor: "#00ff00",
            borderWidth: 1,
            padding: 16,
            alignItems: "center",
            marginVertical: 16,
          }}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text style={{
            color: "#00ff00",
            fontFamily: "monospace",
            marginTop: 8,
            fontSize: 16,
            }}>
            Registrando...
            </Text>
          </View>
          ) : (
        <TouchableOpacity style={styles.botao} onPress={handleRegister}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      )}
      <View style={styles.botao}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textoBotao}>
            Já tem conta? Faça login
          </Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#1a1a1a",
  },
  input: {
    height: 48,
    borderColor: "#00ff00",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#222",
    color: "#00ff00",
    fontFamily: "monospace",
  },
  botao: {
    backgroundColor: '#39ff14',
    borderWidth: 2,
    paddingVertical: width < 400 ? 10 : 14,
    paddingHorizontal: width < 400 ? 24 : 40,
    borderRadius: 6,
    elevation: 2,
    marginHorizontal: 4,
  },
  textoBotao: {
    color: '#222',
    fontSize: width < 400 ? 14 : 18,
    fontWeight: '600',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  error: {
    color: "#ff0000",
    marginTop: 16,
    textAlign: "center",
    fontFamily: "monospace",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#39ff14',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'monospace',
    textShadowColor: '#0f0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
});

