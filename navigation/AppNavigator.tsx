import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './AuthNavigator';
import MainTabs from './MainTabs';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);
    setLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainTabs setToken={setToken} /> : <AuthStack setToken={setToken} />}
    </NavigationContainer>
  );
}
