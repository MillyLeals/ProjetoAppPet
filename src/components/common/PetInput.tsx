import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface PetInputProps extends TextInputProps {
  label?: string; 
}

const PetInput: React.FC<PetInputProps> = ({ label, style, placeholderTextColor, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#6B46C1" 
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 15, 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    height: 55, 
    backgroundColor: '#F3F4FF', 
    borderRadius: 15, 
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1, 
    borderColor: '#DFD0F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#6B46C1', 
    paddingVertical: 0, 
  },
});

export default PetInput;