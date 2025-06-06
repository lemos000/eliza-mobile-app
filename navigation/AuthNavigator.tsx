import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthStackParamList } from "../types/types";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStack({ setToken }: { setToken: (token: string) => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
       <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setToken={setToken} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}