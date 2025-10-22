import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');

interface AddPetScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddPet'>['navigation']; 
}

const AddPetScreen: React.FC<AddPetScreenProps> = ({ navigation }) => {
    const [petName, setPetName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [weight, setWeight] = useState('');
    const [breed, setBreed] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Adicionar Pet</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <PetInput 
                    label="Nome"
                    placeholder="Nome do seu pet"
                    value={petName}
                    onChangeText={setPetName}
                />

                <PetInput 
                    label="Data de Nascimento"
                    placeholder="DD/MM/AAAA"
                    keyboardType="numeric"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />

                <PetInput 
                    label="Peso"
                    placeholder="Peso em kg"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />

                <PetInput 
                    label="Raça"
                    placeholder="Raça do seu pet"
                    value={breed}
                    onChangeText={setBreed}
                />

                <Text style={styles.photoLabel}>Foto do Pet</Text>
                <View style={styles.photoContainer}>
                    <Text style={styles.photoText}>
                        Clique para adicionar uma foto
                    </Text>
                    <Text style={styles.photoSubtext}>
                        PNG, JPG, GIF até 10MB
                    </Text>
                    <TouchableOpacity style={styles.chooseFileButton} onPress={() => console.log('Escolher arquivo')}>
                        <Text style={styles.chooseFileText}>Escolher Arquivo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={() => console.log('Salvar Pet')} title="Salvar" />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center', 
        marginLeft: -38, 
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 100, 
    },
    photoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15,
        marginBottom: 8,
    },
    photoContainer: {
        width: '100%',
        height: 150,
        borderWidth: 2,
        borderColor: '#DFD0F7', 
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    photoText: {
        fontSize: 14,
        color: '#666',
    },
    photoSubtext: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
    },
    chooseFileButton: {
        paddingVertical: 12, 
        paddingHorizontal: 25,
        backgroundColor: '#F3F4FF', 
        borderRadius: 10,
        borderWidth: 1, 
        borderColor: '#DFD0F7', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, 
        shadowRadius: 3, 
        elevation: 3,
    },
    chooseFileText: {
        color: '#6B46C1', 
        fontWeight: 'bold',
        fontSize: 14,
    },
    saveButtonWrapper: {
        marginTop: 40,
        alignItems: 'center',
    }
});

export default AddPetScreen;