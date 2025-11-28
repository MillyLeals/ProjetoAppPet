import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_PURPLE = '#6B46C1';
const INPUT_HEIGHT = 55;

interface WeightUnitInputProps {
    value: string;
    onChangeText: (text: string) => void;
    unit: string;
    onUnitSelect: () => void;
}

const WeightUnitInput: React.FC<WeightUnitInputProps> = ({ value, onChangeText, unit, onUnitSelect }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.weightInputWrapper}>
                <View style={[styles.inputWrapper, styles.baseInputStyle]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 5.2"
                        placeholderTextColor={PRIMARY_PURPLE}
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
            </View>
            
            <View style={styles.unitInputWrapper}>
                <TouchableOpacity style={[styles.unitSelectButton, styles.baseInputStyle]} onPress={onUnitSelect}>
                    <Text style={styles.unitText}>{unit}</Text>
                    <Ionicons name="chevron-down" size={20} color={PRIMARY_PURPLE} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    baseInputStyle: {
        height: INPUT_HEIGHT,
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
    } as ViewStyle,

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    weightInputWrapper: {
        width: '65%',
    },
    inputWrapper: {
        paddingHorizontal: 15,
    },
    input: {
        fontSize: 16,
        color: PRIMARY_PURPLE,
        padding: 0,
    },
    unitInputWrapper: {
        width: '30%',
    },
    unitSelectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    unitText: {
        fontSize: 16,
        color: PRIMARY_PURPLE,
        fontWeight: 'bold',
    },
});

export default WeightUnitInput;