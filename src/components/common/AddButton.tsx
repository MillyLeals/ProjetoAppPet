import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddPetButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddPetButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add" size={30} color="#FFFF" />
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#B586FF', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default AddButton;