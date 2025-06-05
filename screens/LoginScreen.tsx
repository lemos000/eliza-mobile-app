import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { AuthResponse } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../service/apicall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../App';


type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;


const LoginScreen= ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ email: string; nome: string } | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", { email, senha });
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("nome", data.userName);
      await AsyncStorage.setItem("email", data.userEmail);
      setUser({ email: data.userEmail, nome: data.userName });
      setError(""); 
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      throw new Error("Credenciais inválidas");
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, senha);
      navigation.navigate('HomeScreen');
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Entrar" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  input: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    marginTop: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
