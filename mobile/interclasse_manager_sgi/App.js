import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Entrada from './src/pages/Entrada';
import Login from './src/pages/Login';
import Principal from './src/pages/Principal';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Entrada}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Principal"
          component={Principal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}