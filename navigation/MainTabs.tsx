import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ChatScreen from "../screens/ChatScreen";
import HistoricoScreen from "../screens/HistoricoScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainTabParamList } from "../types/types";
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator<MainTabParamList>();


export default function MainTab({ setToken }: { setToken: (token: string | null) => void }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (<FontAwesome5 name="comments" size={24} color="black" />),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoricoScreen}
        options={{
          tabBarIcon: () => (<FontAwesome5 name="history" size={24} color="black" />),
        }}
      />
      <Tab.Screen
        name="Perfil"
        options={{
          tabBarIcon: () => (<FontAwesome5 name="user" size={24} color="black" />),
        }}
      >
        {() => <ProfileScreen setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
