import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Switch,
    Alert,
    Modal
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput';
import { RootStackParamList } from '../../../App';

const { width } = Dimensions.get('window');
const PRIMARY_PURPLE = '#6B46C1';
const INPUT_HEIGHT = 55;

interface AddEventScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddEvent'>['navigation'];
    route: StackScreenProps<RootStackParamList, 'AddEvent'>['route'];
}

const DURATION_OPTIONS = ['30 minutos', '1 hora', '2 horas', '3 horas', '4 horas', '5 horas', 'Não sei'];
const REMINDER_OPTIONS = ['1 dia antes', '2 dias antes', '3 dias antes', '4 dias antes', '5 dias antes'];

const AddEventScreen: React.FC<AddEventScreenProps> = ({ navigation }) => {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState(DURATION_OPTIONS[0]);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [isReminderEnabled, setIsReminderEnabled] = useState(true);
    const [reminderTime, setReminderTime] = useState(REMINDER_OPTIONS[0]);

    const toggleReminder = () => setIsReminderEnabled(prev => !prev);

    const handleDateTimeChange = (event: any, newDate?: Date) => {
        if (newDate) {
            setSelectedDateTime(newDate);
        }
    };

    const handleDropdownSelect = (type: 'duration' | 'reminder') => {
        const options = type === 'duration' ? DURATION_OPTIONS : REMINDER_OPTIONS;
        const setter = type === 'duration' ? setDuration : setReminderTime;

        const alertButtons = options.map(option => ({
            text: option,
            onPress: () => setter(option),
        }));

        Alert.alert(
            `Selecione ${type === 'duration' ? 'a Duração' : 'o Lembrete'}`,
            '',
            [...alertButtons, { text: 'Cancelar', style: 'cancel' }]
        );
    };

    const handleSave = () => {
        Alert.alert('Salvar', `Evento "${title}" salvo!`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close-outline" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Evento</Text>
            </View>

            <Modal transparent visible={showDatePicker} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>

                        <TouchableOpacity
                            onPress={() => setShowDatePicker(false)}
                            style={styles.closeModalButton}
                        >
                            <Ionicons name="close" size={28} color="#333" />
                        </TouchableOpacity>


                        <DateTimePicker
                            value={selectedDateTime}
                            mode="date"
                            display="spinner"
                            onChange={(event, date) => {
                                if (date) {
                                    setSelectedDateTime(date);
                                    setShowDatePicker(false);
                                }
                            }}
                        />


                    </View>
                </View>
            </Modal>
            {showTimePicker && (
                <DateTimePicker
                    value={selectedDateTime}
                    mode="time"
                    display="default"
                    onChange={(event, date) => {
                        setShowTimePicker(false);
                        if (date) setSelectedDateTime(date);
                    }}
                />
            )}

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <PetInput
                    label="Título do Evento *"
                    placeholder="Ex: Banho, Consulta"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Data e Hora *</Text>
                <View style={styles.dateTimeRow}>
                    <TouchableOpacity
                        style={[styles.selectInputContainer, styles.dateTimeHalf]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.selectInputText}>
                            {selectedDateTime.toLocaleDateString('pt-BR')}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color={PRIMARY_PURPLE} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.selectInputContainer, styles.dateTimeHalf]}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text style={styles.selectInputText}>
                            {selectedDateTime.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Text>
                        <Ionicons name="time-outline" size={20} color={PRIMARY_PURPLE} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Duração</Text>
                <TouchableOpacity
                    style={styles.selectInputContainer}
                    onPress={() => handleDropdownSelect('duration')}
                >
                    <Text style={styles.selectInputText}>{duration}</Text>
                    <Ionicons name="chevron-down" size={20} color={PRIMARY_PURPLE} />
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
                        multiline
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>

                <View style={styles.reminderContainer}>
                    <Text style={styles.label}>Lembrete</Text>
                    <Switch
                        trackColor={{ false: "#EAEAEA", true: "#DFD0F7" }}
                        thumbColor={isReminderEnabled ? PRIMARY_PURPLE : "#F4F3F4"}
                        onValueChange={toggleReminder}
                        value={isReminderEnabled}
                    />
                </View>

                <Text style={styles.subLabel}>Avisar com</Text>
                <TouchableOpacity
                    style={styles.selectInputContainer}
                    onPress={() => handleDropdownSelect('reminder')}
                >
                    <Text style={styles.selectInputText}>{reminderTime}</Text>
                    <Ionicons name="chevron-down" size={20} color={PRIMARY_PURPLE} />
                </TouchableOpacity>

                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={handleSave} title="Salvar Evento" />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },

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
        marginRight: 40,
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

    subLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 15,
        marginBottom: 8,
    },

    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    dateTimeHalf: { width: '48%' },

    selectInputContainer: {
        height: 55,
        backgroundColor: '#F3F4FF',
        borderRadius: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DFD0F7',
        elevation: 3,
        marginBottom: 15,
    },

    selectInputText: { fontSize: 16, color: PRIMARY_PURPLE },

    notesContainer: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4FF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: '#DFD0F7',
        elevation: 3,
        marginBottom: 15,
    },

    inputArea: { flex: 1, fontSize: 16, color: '#333' },

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

    closeModalButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
    },

});

export default AddEventScreen;
