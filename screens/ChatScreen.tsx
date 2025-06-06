import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import api from "../service/apicall";
import { Hist, RespostaDTO } from "../types/types";

export default function ChatScreen() {
  const [texto, setTexto] = useState("");
  const [historico, setHistorico] = useState<Hist[]>([]);
  const [carregando, setCarregando] = useState(false);
  const { width } = useWindowDimensions();

  const enviarMensagem = async () => {
    setCarregando(true);
    try {
      const { data } = await api.post<RespostaDTO>("/chat", { texto });
      const pergunta = texto;
      const resposta = data.resposta;
      setHistorico((prev) => [...prev, { pergunta, resposta }]);
      setTexto("");
    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar sua mensagem.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={[styles.container, { padding: width < 400 ? 12 : 24 }]}>
      <Text style={styles.titulo}>Eliza 2.0</Text>
      <Text style={styles.subtitulo}>
        Converse anonimamente e receba acolhimento.
      </Text>

      <FlatList
        data={historico}
        style={{ alignSelf: "stretch", flex: 1 }}
        contentContainerStyle={styles.listaMensagens}
        renderItem={({ item }) => (
          <View style={styles.caixaMensagem}>
            <Text style={styles.rotuloUsuario}>
              Você: <Text style={styles.textoUsuario}>{item.pergunta}</Text>
            </Text>
            <Text style={styles.rotuloBot}>
              Eliza: <Text style={styles.textoBot}>{item.resposta}</Text>
            </Text>
          </View>
        )}
      />

      <View style={styles.campoEntradaContainer}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#6cff7a"
          style={[styles.campoEntrada, { fontSize: width < 400 ? 14 : 18 }]}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.botao,
            { opacity: carregando || !texto ? 0.5 : 1 },
          ]}
          onPress={enviarMensagem}
          disabled={carregando || !texto}
        >
          <Text style={styles.textoBotao}>
            {carregando ? "..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#39ff14",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#0f0",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontFamily: "monospace",
  },
  subtitulo: {
    fontSize: 16,
    color: "#b2ffb2",
    textAlign: "center",
    marginBottom: 18,
    fontFamily: "monospace",
  },
  listaMensagens: {
    paddingBottom: 12,
    flexGrow: 1,
  },
  caixaMensagem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#232323",
    borderRadius: 10,
    shadowColor: "#39ff14",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#39ff14",
  },
  rotuloUsuario: {
    color: "#39ff14",
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 2,
  },
  rotuloBot: {
    color: "#b2ffb2",
    fontFamily: "monospace",
    fontWeight: "bold",
    marginTop: 4,
  },
  textoUsuario: {
    color: "#f1f1f1",
    fontWeight: "400",
  },
  textoBot: {
    color: "#b2ffb2",
    fontWeight: "400",
  },
  campoEntradaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "stretch",
    marginBottom: 10,
  },
  campoEntrada: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#39ff14",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    color: "#39ff14",
    backgroundColor: "#232323",
    fontFamily: "monospace",
  },
  botao: {
    backgroundColor: "#222",
    borderColor: "#39ff14",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    elevation: 2,
    marginHorizontal: 4,
  },
  textoBotao: {
    color: "#39ff14",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 1,
    textAlign: "center",
  },
});
