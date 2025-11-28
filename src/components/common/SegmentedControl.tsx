import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface SegmentedControlProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selectedOption, onSelect }) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => {
                const isSelected = option === selectedOption;
                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            isSelected ? styles.selectedButton : styles.unselectedButton,
                        ]}
                        onPress={() => onSelect(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            isSelected ? styles.selectedText : styles.unselectedText,
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0', 
        borderRadius: 25,
        overflow: 'hidden',
        marginVertical: 20,
        height: 40,
        width: width - 40, 
    },
    optionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        margin: 2, 
    },
    selectedButton: {
        backgroundColor: '#FFF', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    unselectedButton: {
        backgroundColor: 'transparent',
    },
    optionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    selectedText: {
        color: '#333', 
    },
    unselectedText: {
        color: '#777', 
    },
});

export default SegmentedControl;