import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 

interface AddEventScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddEvent'>['navigation']; 
}

const AddEventScreen: React.FC<AddEventScreenProps> = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('1 Hora');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [isReminderEnabled, setIsReminderEnabled] = useState(true);
    const [reminderTime, setReminderTime] = useState('1 dia antes'); 

    const toggleReminder = () => setIsReminderEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Evento</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <PetInput 
                    label="Título do Evento *"
                    placeholder="Ex: Banho, Consulta"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Data e Hora *</Text>
                <TouchableOpacity style={styles.selectInputContainer} onPress={() => console.log('Abrir seletor de data/hora')}>
                    <Text style={styles.selectInputPlaceholder}>Selecione a data e hora</Text>
                    <Ionicons name="calendar-outline" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <Text style={styles.label}>Duração</Text>
                <TouchableOpacity style={styles.selectInputContainer} onPress={() => console.log('Abrir seletor de duração')}>
                    <Text style={styles.selectInputText}>{duration}</Text>
                    <Ionicons name="chevron-down" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <PetInput 
                    label="Local"
                    placeholder="Digite o endereço"
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={styles.label}>Notas</Text>
                <View style={styles.notesContainer}>
                    <TextInput 
                        style={styles.inputArea}
                        placeholder="Adicione uma descrição ou observações..."
                        multiline={true}
                        value={notes}
                        onChangeText={setNotes}
                        placeholderTextColor="#6B46C1"
                    />
                </View>
                
                <View style={styles.reminderContainer}>
                    <Text style={styles.label}>Lembrete</Text>
                    <Switch
                        trackColor={{ false: "#EAEAEA", true: "#DFD0F7" }}
                        thumbColor={isReminderEnabled ? "#6B46C1" : "#F4F3F4"}
                        ios_backgroundColor="#EAEAEA"
                        onValueChange={toggleReminder}
                        value={isReminderEnabled}
                    />
                </View>
                
                <Text style={styles.subLabel}>Avisar com</Text>
                <TouchableOpacity 
                    style={styles.selectInputContainer}
                    onPress={() => console.log('Abrir seletor de lembrete')}
                >
                    <Text style={styles.selectInputText}>{reminderTime}</Text>
                    <Ionicons name="chevron-down" size={20} color="#6B46C1" />
                </TouchableOpacity>

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={() => console.log('Salvar Evento')} title="Salvar Evento" />
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
        paddingBottom: 25,
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
        marginBottom: 10, 
    },
    subLabel: {
        fontSize: 14,
        color: '#666',
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
    selectInputText: {
        fontSize: 16,
        color: '#6B46C1',
    },
    notesContainer: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4FF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 15, 
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
    reminderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10, 
    },
    saveButtonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    }
});

export default AddEventScreen;