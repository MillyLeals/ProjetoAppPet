import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput';
import { RootStackParamList } from '../../../App';

const { width } = Dimensions.get('window');
const PRIMARY_PURPLE = '#6B46C1';

const RECORD_TYPES = [
    'Consulta',
    'Medicamentos',
    'Alergia',
    'Cirurgia',
    'Exame',
    'Outro'
];

interface AddHealthRecordScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddHealthRecord'>['navigation'];
}

const AddHealthRecordScreen: React.FC<AddHealthRecordScreenProps> = ({ navigation }) => {
    const [recordType, setRecordType] = useState('Selecione o tipo de registro');
    const [showTypeModal, setShowTypeModal] = useState(false);

    const [eventDate, setEventDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [description, setDescription] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [meds, setMeds] = useState('');
    const [vetClinic, setVetClinic] = useState('');

    const baseInputStyle = styles.selectInputContainer;

    const handleSave = () => {
        navigation.goBack();
    };

    const displayDate = eventDate.toLocaleDateString('pt-BR');

    return (
        <View style={styles.container}>

            <Modal transparent visible={showDatePicker} animationType="fade">
                <View style={styles.modalOverlayCalendar}>
                    <View style={styles.modalBoxCalendar}>

                        <TouchableOpacity
                            onPress={() => setShowDatePicker(false)}
                            style={styles.closeModalButtonCalendar}
                        >
                            <Ionicons name="close" size={28} color="#333" />
                        </TouchableOpacity>

                        <DateTimePicker
                            value={eventDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, date) => {
                                if (date) {
                                    setEventDate(date);
                                    setShowDatePicker(false);
                                }
                            }}
                        />

                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close-outline" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Registro de Saúde</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.label}>Tipo de Registro *</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => setShowTypeModal(true)}>
                    <Text style={styles.selectInputPlaceholder}>{recordType}</Text>
                    <Ionicons name="chevron-down" size={20} color={PRIMARY_PURPLE} />
                </TouchableOpacity>

                <Modal transparent visible={showTypeModal} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>

                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setShowTypeModal(false)}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Selecione o Tipo</Text>

                            <ScrollView style={{ maxHeight: 300 }}>
                                {RECORD_TYPES.map((type, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.modalOption}
                                        onPress={() => {
                                            setRecordType(type);
                                            setShowTypeModal(false);
                                        }}
                                    >
                                        <Text style={styles.modalOptionText}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                        </View>
                    </View>
                </Modal>

                <Text style={styles.label}>Data do Evento *</Text>
                <TouchableOpacity style={baseInputStyle} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.selectInputPlaceholder}>{displayDate}</Text>
                    <Ionicons name="calendar-outline" size={20} color={PRIMARY_PURPLE} />
                </TouchableOpacity>

                <Text style={styles.label}>Descrição Detalhada *</Text>
                <View style={[baseInputStyle, styles.textArea]}>
                    <TextInput
                        style={styles.inputArea}
                        placeholder="Insira uma descrição detalhada..."
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        placeholderTextColor={PRIMARY_PURPLE}
                        textAlignVertical="top"
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
                        placeholder="Ex: Amoxilina 50mg..."
                        multiline
                        value={meds}
                        onChangeText={setMeds}
                        placeholderTextColor={PRIMARY_PURPLE}
                        textAlignVertical="top"
                    />
                </View>

                <PetInput
                    label="Veterinário/Clínica (opcional)"
                    placeholder="Nome do veterinário ou clínica"
                    value={vetClinic}
                    onChangeText={setVetClinic}
                />

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={handleSave} title="Salvar" />
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        justifyContent: 'space-between',
    },
    backButton: { width: 40 },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
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
        color: PRIMARY_PURPLE,
    },

    textArea: {
        height: 120,
        paddingTop: 15,
        marginBottom: 15,
    },
    textAreaMeds: {
        height: 100,
        paddingTop: 15,
        marginBottom: 15,
    },
    inputArea: {
        width: '100%',
        height: '100%',
        fontSize: 16,
        color: PRIMARY_PURPLE,
        padding: 0,
    },

    saveButtonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBox: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    modalOptionText: {
        fontSize: 16,
        color: PRIMARY_PURPLE,
    },
    modalCloseButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 5,
        zIndex: 10,
    },

    modalOverlayCalendar: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBoxCalendar: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    closeModalButtonCalendar: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },
});

export default AddHealthRecordScreen;
