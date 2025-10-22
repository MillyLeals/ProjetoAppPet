import React from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import WelcomeScreen2 from './src/screens/Welcome2/WelcomeScreen2';
import WelcomeScreen3 from './src/screens/Welcome3/WelcomeScreen3';
import LoginScreen from './src/screens/Login/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPassword/ForgotPasswordScreen';
import MyPetsScreen from './src/screens/MyPets/MyPetsScreen';
import PetProfileScreen from './src/screens/PetProfile/PetProfileScreen';
import AddPetScreen from './src/screens/AddPet/AddPetScreen';
import AgendaScreen from './src/screens/Agenda/AgendaScreen';
import AddEventScreen from './src/screens/AddEvent/AddEventScreen';
import EditPetScreen from './src/screens/EditPet/EditPetScreen';
import HealthHistoryScreen from './src/screens/HealthHistory/HealthHistoryScreen';
import AddHealthRecordScreen from './src/screens/AddHealthRecord/AddHealthRecordScreen';
import VaccineChecklistScreen from './src/screens/VaccineChecklist/VaccineChecklistScreen'; 
import RegisterVaccineScreen from './src/screens/RegisterVaccine/RegisterVaccineScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MyPets: undefined;
  PetProfile: { petId: string }; 
  AddPet: undefined;
  Agenda: undefined;
  AddEvent: undefined;
  EditPet: { petId: string };
  HealthHistory: undefined;
  AddHealthRecord: undefined;
  VaccineChecklist: undefined; 
  RegisterVaccine: undefined;
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
    <SafeAreaProvider> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
        
          <Stack.Screen name="Welcome" component={WelcomePager} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} /> 
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      

        
          <Stack.Screen name="MyPets" component={MyPetsScreen} />
          <Stack.Screen name="PetProfile" component={PetProfileScreen} />
          <Stack.Screen name="AddPet" component={AddPetScreen} />
          <Stack.Screen name="Agenda" component={AgendaScreen} />
          <Stack.Screen name="AddEvent" component={AddEventScreen} />
          <Stack.Screen name="EditPet" component={EditPetScreen} />
          <Stack.Screen name="HealthHistory" component={HealthHistoryScreen} />
          <Stack.Screen name="AddHealthRecord" component={AddHealthRecordScreen} />
          <Stack.Screen name="VaccineChecklist" component={VaccineChecklistScreen} /> 
          <Stack.Screen name="RegisterVaccine" component={RegisterVaccineScreen} /> 
         
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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