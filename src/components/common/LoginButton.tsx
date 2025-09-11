import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

interface LoginButtonProps {
    onPress: () => void;
    title: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

interface Style {
    button: ViewStyle;
    buttonText: TextStyle;
}

const styles = StyleSheet.create<Style>({
    button: {
        width: 140,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#B586FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginButton;