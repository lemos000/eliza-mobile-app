import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { Mensagem } from "../types/types";
import api from "../service/apicall";

const HistoricoScreen = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  const fetchHistorico = async () => {
    const { data } = await api.get("/mensagem/historico?page=0&size=20");
    setMensagens(data.content);
  };

  const deletarMensagem = async (id: number) => {
    await api.delete(`/mensagem/${id}`);
    fetchHistorico();
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return (
    <View>
      <FlatList
        data={mensagens}
        renderItem={({ item }) => (
          <View>
            <Text>Você: {item.textoUsuario}</Text>
            <Text>Eliza: {item.respostaBot}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoricoScreen;
