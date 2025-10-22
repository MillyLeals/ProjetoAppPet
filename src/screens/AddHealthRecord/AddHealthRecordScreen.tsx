import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');

interface AddHealthRecordScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddHealthRecord'>['navigation']; 
}

const AddHealthRecordScreen: React.FC<AddHealthRecordScreenProps> = ({ navigation }) => {
    const [recordType, setRecordType] = useState('Selecione o tipo de registro');
    const [eventDate, setEventDate] = useState('Selecione a data');
    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [meds, setMeds] = useState('');
    const [vetClinic, setVetClinic] = useState('');
    const baseInputStyle = styles.selectInputContainer;

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Registro de Saúde</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.label}>Tipo de Registro *</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => console.log('Abrir seletor de registro')}>
                    <Text style={styles.selectInputPlaceholder}>{recordType}</Text>
                    <Ionicons name="chevron-down" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <Text style={styles.label}>Data do Evento *</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => console.log('Abrir seletor de data')}>
                    <Text style={styles.selectInputPlaceholder}>{eventDate}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <Text style={styles.label}>Descrição Detalhada *</Text>
                <View style={[baseInputStyle, styles.textArea]}>
                    <TextInput 
                        style={styles.inputArea}
                        placeholder="Insira uma descrição detalhada do evento de saúde..."
                        multiline={true}
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor="#6B46C1"
                    />
                </View>
     
                <PetInput 
                    label="Diagnóstico (opcional)"
                    placeholder="Ex: Otite canina"
                    value={diagnosis}
                    onChangeText={setDiagnosis}
                />

                <Text style={styles.label}>Medicamentos Prescritos (opcional)</Text>
                <View style={[baseInputStyle, styles.textAreaMeds]}>
                    <TextInput 
                        style={styles.inputArea}
                        placeholder="Ex: Amoxilina 50mg - 1 comprimido a cada 12 horas"
                        multiline={true}
                        value={meds}
                        onChangeText={setMeds}
                        placeholderTextColor="#6B46C1"
                    />
                </View>
                
                <PetInput 
                    label="Veterinário/Clínica (opcional)"
                    placeholder="Nome do veterinário ou clínica"
                    value={vetClinic}
                    onChangeText={setVetClinic}
                />

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={() => console.log('Salvar Registro')} title="Salvar" />
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
    textArea: {
        height: 120,
        alignItems: 'flex-start',
        paddingTop: 15,
        marginBottom: 15,
    },
    textAreaMeds: {
        height: 100,
        alignItems: 'flex-start',
        paddingTop: 15,
        marginBottom: 15,
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

export default AddHealthRecordScreen;