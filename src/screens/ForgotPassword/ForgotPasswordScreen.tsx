import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import BottomWave from '../../components/common/BottomWave';
import LoginButton from '../../components/common/LoginButton';
import { StackScreenProps } from '@react-navigation/stack';
import PetInput from '../../components/common/PetInput'; 
import { RootStackParamList } from '../../../App'; 

const { width, height } = Dimensions.get('window');

interface ForgotPasswordScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'ForgotPassword'>['navigation'];
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topShape} />

            <View style={styles.content}>
                <Text style={styles.title}>Recuperação de senha</Text>
                <Text style={styles.subtitle}>
                    Para recuperação de senha, informe seu endereço de email cadastrado que nós
                    enviaremos um link para alteração da senha.
                </Text>

                <View style={styles.inputWrapper}>
                    <PetInput
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={{ marginTop: 150 }}>
                    <LoginButton onPress={() => console.log('Confirmar pressionado')} title="Confirmar" />
                </View>

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
        backgroundColor: '#FFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topShape: {
        width: 429,
        height: 117,
        backgroundColor: '#DFD0F7',
        borderBottomLeftRadius: 150,
        position: 'absolute',
        top: -56,
        left: -39,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 150,
        paddingHorizontal: 20,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 30,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: -20,
    },
    subtitle: {
        fontSize: 16,
        color: '#6C6A6A',
        textAlign: 'left',
        lineHeight: 24,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    inputWrapper: {
        width: '92%',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 50,
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

export default ForgotPasswordScreen;