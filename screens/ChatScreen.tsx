import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../service/apicall";
import { Hist, RespostaDTO } from "../types/types";


const ChatScreen = () => {
  const [texto, setTexto] = useState("");
  const [historico, setHistorico] = useState<Hist[]>([]);
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    setLoading(true);
    try {
      const { data } = await api.post<RespostaDTO>("/chat", { texto });
      const pergunta = texto;
      const resposta = data.resposta;
      setHistorico((prev) => [...prev, { pergunta, resposta }]);
      setTexto("");
    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error);
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={historico}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Você:</Text> {item.pergunta}
            </Text>
             <Text>
              <Text style={{ fontWeight: "bold" }}>Eliza:</Text> {item.resposta}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Sua mensagem..."
          style={styles.input}
          multiline
        />
        <Button
          title="Enviar"
          onPress={enviarMensagem}
          disabled={loading || !texto}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  list: { paddingBottom: 16 },
  messageContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
});

export default ChatScreen;
