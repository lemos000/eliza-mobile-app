import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AuthResponse, AuthStackParamList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/apicall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'> & {
  setToken: (token: string) => void;
};

export default function LoginScreen({ navigation, setToken }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const login = async (email: string, senha: string) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", { email, senha });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("nome", data.userName);
      await AsyncStorage.setItem("email", data.userEmail);
      setError(""); 
      setToken(data.token); 
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleLogin = async () => {
      await login(email, senha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
       onPress={handleLogin} style={styles.botao}>
        <Text style={styles.textoBotao}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
       onPress={() => navigation.navigate("Register")} style={styles.botao}>
        <Text style={styles.textoBotao}>Não tem conta ainda? Se registre!</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const { width } = Dimensions.get('window');

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