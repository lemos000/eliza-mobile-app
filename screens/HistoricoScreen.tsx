import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
  TextInput,
  ToastAndroid
} from "react-native";
import { Mensagem } from "../types/types";
import api from "../service/apicall";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoricoScreen(){
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editMsgId, setEditMsgId] = useState<number | null>(null);
  const [editTexto, setEditTexto] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const { width } = useWindowDimensions();

  const fetchHistorico = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/chat/historico`);
      setMensagens(data.content);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };
  // [
  //   {id, textouser, respotabot, datahora}, {id, textouser, respotabot, datahora}, {id, textouser, respotabot, datahora}
  // ]

 const deletarMensagem = async (id: number) => {
  try {
    await api.delete(`/chat/mensagem/${id}/deletar`);
    fetchHistorico(); 

    ToastAndroid.show("Mensagem deletada com sucesso!", ToastAndroid.SHORT);
  } catch (e) {
    ToastAndroid.show("Erro ao excluir mensagem", ToastAndroid.SHORT);
  }
};


  
  const abrirEdicao = (id: number, textoAtual: string) => {
    setEditMsgId(id);
    setEditTexto(textoAtual);
    setEditModalVisible(true);
  };


  const salvarEdicao = async () => {
    if (!editMsgId) {

    ToastAndroid.show("Erro ao editar a mensagem!", ToastAndroid.SHORT);
    return
    }

     
      ;
    setEditLoading(true);
    try {
      await api.put(`/chat/mensagem/${editMsgId}/update`, { texto: editTexto });
      setEditModalVisible(false);
      fetchHistorico();
      // alert("Sucesso, Mensagem editada com sucesso!");
    } catch (e) {
      // alert("Errok Não foi possível salvar a edição.");
    } finally {
      setEditLoading(false);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      fetchHistorico();
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#39ff14" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { padding: width < 400 ? 12 : 24 }]}>
      <Text style={styles.titulo}>Histórico de Mensagens</Text>
      <FlatList
        data={mensagens}
        style={{ alignSelf: "stretch", flex: 1 }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: "#b2ffb2", textAlign: "center", marginTop: 40 }}>
            Nenhuma mensagem encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.labelUsuario}>
              Você: <Text style={styles.textoUsuario}>{item.textoUsuario}</Text>
            </Text>
            <Text style={styles.labelBot}>
              Eliza: <Text style={styles.textoBot}>{item.respostaBot}</Text>
            </Text>
            <View style={styles.acaoContainer}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => abrirEdicao(item.id, item.textoUsuario)}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => deletarMensagem(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="fade"
        transparent
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalContainer}>
            <Text style={styles.tituloModal}>Editar Mensagem</Text>
            <TextInput
              style={styles.input}
              value={editTexto}
              onChangeText={setEditTexto}
              placeholder="Edite sua mensagem..."
              placeholderTextColor="#6cff7a"
              multiline
              editable={!editLoading}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: "#181818", borderColor: "#ff3939" }]}
                onPress={() => setEditModalVisible(false)}
                disabled={editLoading}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botao}
                onPress={salvarEdicao}
                disabled={editLoading}
              >
                <Text style={styles.textoBotao}>
                  {editLoading ? "Salvando..." : "Salvar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#39ff14",
    marginBottom: 18,
    textAlign: "center",
    textShadowColor: "#0f0",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    fontFamily: "monospace",
  },
  list: {
    paddingBottom: 12,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 14,
    padding: 12,
    backgroundColor: "#232323",
    borderRadius: 10,
    shadowColor: "#39ff14",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 1.2,
    borderColor: "#39ff14",
  },
  labelUsuario: {
    color: "#39ff14",
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 2,
  },
  labelBot: {
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
  acaoContainer: {
    flexDirection: "row",
    marginTop: 8,
    gap: 12,
    justifyContent: "flex-end",
  },
  botaoEditar: {
    backgroundColor: "#222",
    borderColor: "#39ff14",
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 2,
    marginRight: 4,
  },
  botaoExcluir: {
    backgroundColor: "#181818",
    borderColor: "#ff3939",
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 2,
    marginLeft: 4,
  },
  textoBotao: {
    color: "#39ff14",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 1,
    textAlign: "center",
  },
  // Modal styles
  modalBg: {
    flex: 1,
    backgroundColor: "#000a",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#181818",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#39ff14",
    shadowColor: "#39ff14",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  tituloModal: {
    fontSize: 22,
    color: "#39ff14",
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "#0f0",
    textShadowRadius: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#39ff14",
    borderRadius: 8,
    padding: 14,
    color: "#39ff14",
    backgroundColor: "#232323",
    fontFamily: "monospace",
    fontSize: 18,
    marginBottom: 20,
    minHeight: 60,
    textAlignVertical: "top",
  },
  botao: {
    backgroundColor: "#222",
    borderColor: "#39ff14",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 6,
    elevation: 2,
    marginHorizontal: 4,
  },
});

