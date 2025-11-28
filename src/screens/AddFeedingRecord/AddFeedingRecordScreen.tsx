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
    Alert,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ViewStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import PetInput from '../../components/common/PetInput';
import LoginButton from '../../components/common/LoginButton';
import FoodTypeSelector from '../../components/feeding/FoodTypeSelector';
import { RootStackParamList } from '../../../App';
import { FoodType } from '../../components/feeding/FoodTypeSelector';

const { width } = Dimensions.get('window');
const PRIMARY_PURPLE = '#6B46C1';
const SAVE_BUTTON_COLOR = '#B586FF';

interface AddFeedingRecordScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'AddFeedingRecord'>['navigation'];
}

const AddFeedingRecordScreen: React.FC<AddFeedingRecordScreenProps> = ({ navigation }) => {

    const [foodType, setFoodType] = useState<FoodType>('Ração');

    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('200');
    const [unit, setUnit] = useState('g');
    const [time, setTime] = useState('09:00');
    const [observations, setObservations] = useState('');

    const [showUnitModal, setShowUnitModal] = useState(false);

    const [showTimePicker, setShowTimePicker] = useState(false);

    const openTimePicker = () => {
        setShowTimePicker(true);
    };

    const onChangeTime = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);

        if (selectedTime) {
            const hours = selectedTime.getHours().toString().padStart(2, '0');
            const minutes = selectedTime.getMinutes().toString().padStart(2, '0');

            setTime(`${hours}:${minutes}`);
        }
    };

    const handleSave = () => {
        Alert.alert('Salvar', `Registro de ${foodType} salvo.`);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Registro de Alimentação</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.label}>Tipo de Alimento</Text>

                <FoodTypeSelector
                    selectedType={foodType}
                    onSelect={setFoodType}
                />

                <PetInput
                    label="Marca/Nome do Produto"
                    placeholder="Ex: Ração Super Premium"
                    value={productName}
                    onChangeText={setProductName}
                />

                <View style={styles.quantityRow}>

                    <View style={styles.quantityInputWrapper}>
                        <Text style={styles.label}>Quantidade</Text>
                        <View style={styles.quantityValueInput}>
                            <TextInput
                                style={styles.inputFlex}
                                placeholder="200"
                                keyboardType="numeric"
                                value={quantity}
                                onChangeText={setQuantity}
                            />
                        </View>
                    </View>

                    <View style={styles.unitInputWrapper}>
                        <Text style={styles.label}>Unidade</Text>
                        <TouchableOpacity
                            style={styles.unitSelectButton}
                            onPress={() => setShowUnitModal(true)}
                        >
                            <Text style={styles.unitText}>{unit}</Text>
                            <Ionicons name="chevron-down" size={20} color={PRIMARY_PURPLE} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal visible={showUnitModal} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>

                            <TouchableOpacity
                                onPress={() => setShowUnitModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={26} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Selecionar Unidade</Text>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    setUnit('g');
                                    setShowUnitModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>Gramas (g)</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={() => {
                                    setUnit('kg');
                                    setShowUnitModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>Kilogramas (kg)</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

                <Text style={styles.label}>Horário da Refeição</Text>

                <TouchableOpacity
                    style={styles.timeInputContainer}
                    onPress={openTimePicker}
                >
                    <Text style={styles.timeText}>{time}</Text>
                    <Ionicons name="time-outline" size={24} color={PRIMARY_PURPLE} />
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
                    />
                )}

                <Text style={styles.label}>Observações</Text>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.inputArea}
                        placeholder="Adicione alguma observação..."
                        multiline
                        value={observations}
                        onChangeText={setObservations}
                    />
                </View>

                <View style={styles.saveButtonWrapper}>
                    <LoginButton
                        onPress={handleSave}
                        title="Salvar"
                        color={SAVE_BUTTON_COLOR}
                    />
                </View>

            </ScrollView>
        </View>
    );
};

const baseInput: ViewStyle = {
    height: 55,
    backgroundColor: '#F3F4FF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#DFD0F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
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
    },

    backButton: { marginRight: 10 },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginLeft: -38,
    },

    scrollContent: { padding: 20, paddingBottom: 100 },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 8,
    },

    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },

    quantityInputWrapper: { width: '65%' },
    unitInputWrapper: { width: '30%' },

    quantityValueInput: {
        ...baseInput,
        paddingHorizontal: 15,
    },

    inputFlex: {
        flex: 1,
        fontSize: 16,
        color: PRIMARY_PURPLE,
        padding: 0,
    },

    timeInputContainer: {
        ...baseInput,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    timeText: { fontSize: 16, color: PRIMARY_PURPLE },

    unitSelectButton: {
        ...baseInput,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },

    unitText: {
        fontSize: 16,
        color: PRIMARY_PURPLE,
        fontWeight: 'bold'
    },

    textAreaContainer: {
        ...baseInput,
        width: '100%',
        height: 120,
        paddingHorizontal: 15,
        paddingTop: 10,
        justifyContent: 'flex-start',
        marginBottom: 15,
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
        top: 10,
        right: 10,
        padding: 5,
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

export default AddFeedingRecordScreen;
