import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginButton from '../../components/common/LoginButton';
import BottomWave from '../../components/common/BottomWave';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../../App';
import PetInput from '../../components/common/PetInput'; 

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'Login'>['navigation'];
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleLogin = () => {
        navigation.navigate('MyPets'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.topShape} />

            <View style={styles.content}>
                <Image
                    source={require('../../assets/images/logo1.png')}
                    style={styles.logo}
                />

                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Entre com seu email e senha</Text>

                <View style={styles.inputWrapper}>
                    <PetInput
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <PetInput
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#C084FC" /> 
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <LoginButton onPress={handleLogin} title="Login" />
                
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Não tem um cadastro?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.signupLink}>cadastre-se</Text>
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
        backgroundColor: '#FFF',
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
        paddingTop: height * 0.09, 
        paddingBottom: height * 0.15,
        paddingHorizontal: 20,
        width: '100%',
    },
    logo: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: 'contain',
        marginBottom: 35,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: 15,
        marginTop: -20,
    },
    subtitle: {
        fontSize: 16,
        color: '#6C6A6A',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginBottom: 30,
    },
    inputWrapper: {
        width: '92%',
        marginBottom: 22,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15, 
        paddingLeft: 10,
        zIndex: 1,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        width: '60%',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#6B46C1',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 40,
        zIndex: 5,
    },
    signupText: {
        color: '#6C6A6A',
        fontSize: 14,
        marginRight: 5,
    },
    signupLink: {
        color: '#6B46C1',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default LoginScreen;