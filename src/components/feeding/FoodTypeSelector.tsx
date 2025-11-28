import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type FoodType = 'Ração' | 'Comida Úmida' | 'Petisco' | 'Comida Caseira';

interface FoodOption {
    type: FoodType;
    icon: keyof typeof Ionicons.glyphMap;
}

interface FoodTypeSelectorProps {
    selectedType: FoodType;
    onSelect: (type: FoodType) => void;
}

const foodOptions: FoodOption[] = [
    { type: 'Ração', icon: 'paw-outline' },
    { type: 'Comida Úmida', icon: 'restaurant-outline' },
    { type: 'Petisco', icon: 'paw-outline' },
    { type: 'Comida Caseira', icon: 'heart-outline' },
];

const FoodTypeSelector: React.FC<FoodTypeSelectorProps> = ({ selectedType, onSelect }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            {foodOptions.map((option) => {
                const isSelected = option.type === selectedType;

                // escala individual para cada botão
                const scaleAnim = useRef(new Animated.Value(1)).current;

                const handlePress = () => {
                    Animated.sequence([
                        Animated.timing(scaleAnim, {
                            toValue: 0.92,
                            duration: 120,
                            useNativeDriver: true
                        }),
                        Animated.timing(scaleAnim, {
                            toValue: 1,
                            duration: 120,
                            useNativeDriver: true
                        })
                    ]).start();

                    onSelect(option.type);
                };

                return (
                    <TouchableWithoutFeedback key={option.type} onPress={handlePress}>
                        <Animated.View
                            style={[
                                styles.button,
                                isSelected && styles.selectedButton,
                                { transform: [{ scale: scaleAnim }] }
                            ]}
                        >
                            <Ionicons
                                name={option.icon}
                                size={28}
                                color={isSelected ? "#6B46C1" : "#8A8A8A"}
                            />
                            <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
                                {option.type}
                            </Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                );
            })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 5,
    },
    button: {
        width: '48%',
        height: 90,
        backgroundColor: '#F7F1FF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E5D8FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
    },
    selectedButton: {
        backgroundColor: '#DFD0F7',
        borderColor: '#6B46C1',
        elevation: 4,
    },
    buttonText: {
        fontSize: 14,
        color: '#6C6A6A',
        marginTop: 6,
    },
    selectedText: {
        fontWeight: 'bold',
        color: '#6B46C1',
    },
});

export default FoodTypeSelector;
