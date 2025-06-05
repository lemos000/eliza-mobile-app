import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../service/apicall';

interface Mensagem {
  id: number;
  textoUsuario: string;
  respostaBot: string;
  dataHora: string;
}

export const MensagemCrudScreen: React.FC = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);

  const fetchMensagens = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('https://api-gs-1sem.onrender.com/api/mensagem/historico', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Atenção ao formato da resposta, ajuste conforme necessário!
      setMensagens(res.data.content || []);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar o histórico de mensagens');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;
    setEnviando(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await api.post( '/mensagem/enviar', { texto: novaMensagem });
      alert(res)
      setNovaMensagem('');
      fetchMensagens();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem');
    }
    setEnviando(false);
  };

  const deletarMensagem = async (id: number) => {
    Alert.alert('Confirmar', 'Tem certeza que deseja deletar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar', style: 'destructive', onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(`https://api-gs-1sem.onrender.com/api/mensagem/${id}/delete`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            fetchMensagens();
          } catch (err) {
            Alert.alert('Erro', 'Erro ao deletar mensagem');
          }
        }
      }
    ]);
  };

  // Exemplo de edição simples (só para referência, pode expandir)
  const editarMensagem = async (id: number, novoTexto: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `https://api-gs-1sem.onrender.com/api/mensagem/${id}/update`,
        { texto: novoTexto },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMensagens();
    } catch (err) {
      Alert.alert('Erro', 'Erro ao editar mensagem');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 32 }} color="#1e88e5" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Mensagens</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <Button title={enviando ? 'Enviando...' : 'Enviar'} onPress={enviarMensagem} disabled={enviando} />
      </View>
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.userText}>{item.textoUsuario}</Text>
            <Text style={styles.botLabel}>Resposta:</Text>
            <Text style={styles.botText}>{item.respostaBot}</Text>
            <Text style={styles.date}>{new Date(item.dataHora).toLocaleString()}</Text>
            <View style={styles.actions}>
              {/* Exemplo para deletar */}
              <TouchableOpacity onPress={() => deletarMensagem(item.id)}>
                <Text style={styles.delete}>Deletar</Text>
              </TouchableOpacity>
              {/* Exemplo para editar: 
                <TouchableOpacity onPress={() => editarMensagem(item.id, 'Novo texto')}>
                  <Text style={styles.edit}>Editar</Text>
                </TouchableOpacity>
              */}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 24, textAlign: 'center' }}>Nenhuma mensagem encontrada.</Text>}
        contentContainerStyle={{ paddingBottom: 48 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f9fb' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1e88e5', textAlign: 'center' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 },
  input: { flex: 1, borderColor: '#1e88e5', borderWidth: 1, borderRadius: 8, padding: 8, marginRight: 8, backgroundColor: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, elevation: 2 },
  userText: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#222' },
  botLabel: { fontSize: 12, fontWeight: 'bold', color: '#444' },
  botText: { fontSize: 14, color: '#00796b', marginBottom: 6 },
  date: { fontSize: 10, color: '#888', alignSelf: 'flex-end' },
  actions: { flexDirection: 'row', gap: 24, marginTop: 4 },
  delete: { color: '#d32f2f', fontWeight: 'bold', marginRight: 16 },
  edit: { color: '#1976d2', fontWeight: 'bold' }
});
