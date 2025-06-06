import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import ChatScreen from "../screens/ChatScreen";
import HistoricoScreen from "../screens/HistoricoScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainTabParamList } from "../types/types";
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();


export default function MainTab({ setToken }: { setToken: (token: string | null) => void }) {
  return (
    <Tab.Navigator
      screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#222831",
        borderTopColor: "#393E46",
        height: 60,
      },
      tabBarActiveTintColor: "#00FF41",
      tabBarInactiveTintColor: "#EEEEEE",
      tabBarLabelStyle: {
        fontFamily: "monospace",
        fontSize: 14,
        marginTop: 4,
        fontWeight: "bold",
      }
      }}
    >
      <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color }) => (
        <FontAwesome5 containerStyle={{ marginTop: 6 }} name="terminal" size={24} color={color} />
        ),
        tabBarLabel: "Chat",
      }}
      />
      <Tab.Screen
        name="Histórico"
        options={{
          tabBarIcon: ({ color }) => (<FontAwesome5 name="history" size={24} color={color} />),
        }}
      >
        {() => <HistoricoScreen/>}
      </Tab.Screen>
      <Tab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color }) => (<FontAwesome5 name="user" size={24} color={color} />),
        }}
      >
        {() => <ProfileScreen setToken={setToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
