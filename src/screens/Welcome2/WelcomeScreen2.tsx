import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import LoginButton from '../../components/common/LoginButton';
import BottomWave from '../../components/common/BottomWave';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    ForgotPassword: undefined; 
};

interface WelcomeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
}

const WelcomeScreen2: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topShape} />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/logo1.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Seu pet sempre em boas patas</Text>
        <Text style={styles.description}>
          Cadastre informações importantes do seu pet: nome, raça, idade, peso, foto e histórico de saúde.
        </Text>
        <View style={styles.paginationContainer}>
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.activeDot]} />
          <View style={styles.paginationDot} />
        </View>
        <LoginButton onPress={() => navigation.navigate('Login')} title="Login" />
      </View>
      <BottomWave />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topShape: {
    width: 429,
    height: 117,
    backgroundColor: '#DDD6FE',
    borderBottomLeftRadius: 150,
    position: 'absolute',
    top: -56,
    left: -39,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: height * 0.15,
    paddingBottom: height * 0.15,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#6C6A6A',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CCC',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6B46C1',
  },
});

export default WelcomeScreen2;