import React from "react";
import AppNavigator from "./navigation/AppNavigator";

export type RootStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ChatScreen: undefined;
    ProfileScreen: undefined;
    MensagemCrudScreen: undefined;
    HistoricoScreen: undefined;
};

export default function App() {
  return (

      <AppNavigator />
  
  );
}
