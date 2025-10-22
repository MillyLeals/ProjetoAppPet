// src/screens/Register/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import BottomWave from '../../components/common/BottomWave';
import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'; 

const { width, height } = Dimensions.get('window');

interface RegisterScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'Register'>['navigation'];
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        console.log('Botão Confirmar pressionado para cadastro.');
    };

    return (
        <View style={styles.container}>
            <View style={styles.topShape} /> 

            <View style={styles.content}>
                
                <Text style={styles.title}>Cadastro</Text>

                <View style={styles.inputWrapper}>
                    <PetInput placeholder="Nome completo" value={name} onChangeText={setName} />
                </View>

                <View style={styles.inputWrapper}>
                    <PetInput placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
                </View>

                <View style={styles.inputWrapper}>
                    <PetInput placeholder="Senha" secureTextEntry={true} value={password} onChangeText={setPassword} />
                </View>

                <View style={styles.inputWrapper}>
                    <PetInput placeholder="Confirmar senha" secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword} />
                </View>

                <View style={styles.confirmButtonWrapper}>
                    <LoginButton onPress={handleRegister} title="Confirmar" />
                </View>
                
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Já tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <BottomWave />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
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
        justifyContent: 'flex-start',
        paddingTop: height * 0.15, 
        paddingHorizontal: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: 30, 
    },
    inputWrapper: {
        width: '90%', 
        marginBottom: 15,
    },
    confirmButtonWrapper: {
        marginTop: 30,
        alignItems: 'center',
        width: '90%',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 50,
    },
    loginText: {
        color: '#6C6A6A',
        fontSize: 14,
        marginRight: 5,
    },
    loginLink: {
        color: '#6B46C1',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default RegisterScreen;