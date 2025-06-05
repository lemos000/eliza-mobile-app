import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;


const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/chatbot.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Welcome to Eliza Chatbot 2.0</Text>
            <Text style={styles.subtitle}>
                Revived and enhanced with the latest AI technology, Eliza is here to assist you with your queries and provide a delightful chat experience.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
             <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LoginScreen')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        marginBottom: 32,
        transform: [{ scale: 1.3 }],
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#22223b',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#4a4e69',
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#3a86ff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});