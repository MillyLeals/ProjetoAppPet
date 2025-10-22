// src/screens/RegisterVaccine/RegisterVaccineScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');

interface RegisterVaccineScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'RegisterVaccine'>['navigation']; 
}

const RegisterVaccineScreen: React.FC<RegisterVaccineScreenProps> = ({ navigation }) => {
    const [vaccineName, setVaccineName] = useState('');
    const [applicationDate, setApplicationDate] = useState('Selecione a data');
    const [nextDoseDate, setNextDoseDate] = useState('Selecione a data');
    const [lotNumber, setLotNumber] = useState('');
    const [professional, setProfessional] = useState('');
    const [observation, setObservation] = useState('');

    // Estilo base de input reutilizado da AddEventScreen para campos de seleção
    const baseInputStyle = styles.selectInputContainer;

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Registrar Nova Vacina</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <PetInput 
                    label="Nome da Vacina"
                    placeholder="Ex: V10"
                    value={vaccineName}
                    onChangeText={setVaccineName}
                />

                <Text style={styles.label}>Data da Aplicação</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => console.log('Abrir seletor de data')}>
                    <Text style={styles.selectInputPlaceholder}>{applicationDate}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <Text style={styles.label}>Próxima Dose (opcional)</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => console.log('Abrir seletor de próxima dose')}>
                    <Text style={styles.selectInputPlaceholder}>{nextDoseDate}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#6B46C1" />
                </TouchableOpacity>
                
                <PetInput 
                    label="Lote (opcional)"
                    placeholder="Digite o lote da vacina"
                    value={lotNumber}
                    onChangeText={setLotNumber}
                />

                <PetInput 
                    label="Veterinário/Clínica (opcional)"
                    placeholder="Nome do profissional ou clínica"
                    value={professional}
                    onChangeText={setProfessional}
                />

                <Text style={styles.label}>Observação (opcional)</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput 
                        style={styles.inputArea}
                        placeholder="Adicione qualquer observação importante..."
                        multiline={true}
                        value={observation}
                        onChangeText={setObservation}
                        placeholderTextColor="#6B46C1"
                    />
                </View>
                
                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={() => console.log('Salvar Vacina')} title="Salvar" />
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15, 
        marginBottom: 8,
    },
    // Estilo unificado de input/dropdown (copiado do PetInput)
    selectInputContainer: {
        width: '100%',
        height: 55,
        backgroundColor: '#F3F4FF', 
        borderRadius: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1, 
        borderColor: '#DFD0F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, 
        shadowRadius: 3, 
        elevation: 3,
        marginBottom: 15, 
    },
    selectInputPlaceholder: {
        fontSize: 16,
        color: '#6B46C1', 
    },
    // Container para a Área de Observação (Textarea)
    textAreaContainer: {
        width: '100%',
        height: 120, // Altura maior para o textarea
        backgroundColor: '#F3F4FF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 10, // Padding para o texto não colar no topo
        marginBottom: 15,
        // Mantendo consistência visual
        borderWidth: 1, 
        borderColor: '#DFD0F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, 
        shadowRadius: 3, 
        elevation: 3,
    },
    inputArea: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
        padding: 0,
    },
    saveButtonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    }
});

export default RegisterVaccineScreen;