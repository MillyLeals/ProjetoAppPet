import React, { useState } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TextInput,
    TouchableOpacity, ScrollView, Platform, Alert, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import LoginButton from '../../components/common/LoginButton';
import WeightUnitInput from '../../components/weightdiet/WeightUnitInput';
import { RootStackParamList } from '../../../App';

const { width } = Dimensions.get('window');
const PRIMARY_PURPLE = '#6B46C1';

interface AddWeightRecordScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddWeightRecord'>['navigation'];
}

const AddWeightRecordScreen: React.FC<AddWeightRecordScreenProps> = ({ navigation }) => {

    const [date, setDate] = useState('20 de Outubro de 2025');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [weight, setWeight] = useState('5.3');
    const [unit, setUnit] = useState('kg');

    const [showUnitModal, setShowUnitModal] = useState(false);
    const [observations, setObservations] = useState('');

    const handleSave = () => {
        Alert.alert('Salvar', `Peso ${weight}${unit} registrado!`);
        navigation.goBack();
    };

    const formatDate = (selectedDate: Date) => {
        return selectedDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeHeaderButton}>
                    <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Registrar Novo Peso</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.label}>Data do Registro</Text>

                <TouchableOpacity
                    style={styles.dateInputContainer}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.dateText}>{date}</Text>
                    <Ionicons name="calendar-outline" size={24} color={PRIMARY_PURPLE} />
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setDate(formatDate(selectedDate));
                            }
                            setShowDatePicker(false);
                        }}
                    />
                )}

                <Text style={styles.label}>Peso</Text>

                <WeightUnitInput
                    value={weight}
                    onChangeText={setWeight}
                    unit={unit}
                    onUnitSelect={() => setShowUnitModal(true)}
                />

                <Modal visible={showUnitModal} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>

                            <TouchableOpacity
                                onPress={() => setShowUnitModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={28} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Selecionar Unidade</Text>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    setUnit('kg');
                                    setShowUnitModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>Kilogramas (kg)</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    setUnit('g');
                                    setShowUnitModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>Gramas (g)</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <Text style={styles.label}>Observações (opcional)</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.inputArea}
                        placeholder="Ex: Após a consulta no veterinário."
                        multiline
                        value={observations}
                        onChangeText={setObservations}
                        placeholderTextColor={PRIMARY_PURPLE}
                    />
                </View>

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={handleSave} title="Salvar Peso" />
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
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        position: 'relative',
    },
    closeHeaderButton: {
        position: 'absolute',
        left: 10,
        padding: 5,
        top: Platform.OS === 'android' ? 38 : 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
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
    dateInputContainer: {
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
    dateText: {
        fontSize: 16,
        color: PRIMARY_PURPLE,
    },
    textAreaContainer: {
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
        color: PRIMARY_PURPLE,
        textAlignVertical: 'top',
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
    },

    modalBox: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },

    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        color: PRIMARY_PURPLE,
    },

    modalOption: {
        width: '100%',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },

    modalOptionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default AddWeightRecordScreen;
