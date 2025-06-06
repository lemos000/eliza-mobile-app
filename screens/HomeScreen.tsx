import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/types';
import { Dimensions } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
    {`
███████╗██╗     ██╗███████╗ █████╗ 
██╔════╝██║     ██║╚══███╔╝██╔══██╗
█████╗  ██║     ██║  ███╔╝ ███████║
██╔══╝  ██║     ██║ ███╔╝  ██╔══██║
███████╗███████╗██║███████╗██║  ██║
╚══════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═╝
    `}
            </Text>
            <Text style={styles.titulo}>WELCOME TO ELIZA CHATBOT 2.0</Text>
            <Text style={styles.subtitulo}>
            Revived and enhanced with the latest AI technology, Eliza is here to assist you with your queries and provide a delightful chat experience.
            </Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.textoBotao}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.textoBotao}>Register</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        padding: width < 400 ? 12 : 24,
    },
    logo: {
        fontFamily: 'monospace',
        textAlign: 'center',
        fontSize: width < 400 ? 15 : 40,
        color: '#39ff14',
        marginBottom: width < 400 ? 12 : 24,
        textShadowColor: '#0f0',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    titulo: {
        fontSize: width < 400 ? 18 : 28,
        fontWeight: 'bold',
        color: '#39ff14',
        marginBottom: width < 400 ? 8 : 12,
        textAlign: 'center',
        textShadowColor: '#0f0',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
    subtitulo: {
        fontSize: width < 400 ? 14 : 20,
        color: '#b2ffb2',
        textAlign: 'center',
        marginBottom: width < 400 ? 16 : 32,
    },
    botao: {
        backgroundColor: '#222',
        borderColor: '#39ff14',
        borderWidth: 2,
        paddingVertical: width < 400 ? 10 : 14,
        paddingHorizontal: width < 400 ? 24 : 40,
        borderRadius: 6,
        elevation: 2,
        marginHorizontal: 4,
    },
    textoBotao: {
        color: '#39ff14',
        fontSize: width < 400 ? 14 : 18,
        fontWeight: '600',
        fontFamily: 'monospace',
        letterSpacing: 1,
    },
});