import React from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import WelcomeScreen2 from './src/screens/Welcome2/WelcomeScreen2';
import WelcomeScreen3 from './src/screens/Welcome3/WelcomeScreen3';
import LoginScreen from './src/screens/Login/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPassword/ForgotPasswordScreen'; 

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgotPassword: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

function WelcomePager({ navigation }: StackScreenProps<RootStackParamList, 'Welcome'>) {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <WelcomeScreen key="1" navigation={navigation} />
        <WelcomeScreen2 key="2" navigation={navigation} />
        <WelcomeScreen3 key="3" navigation={navigation} />
      </PagerView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePager} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
});