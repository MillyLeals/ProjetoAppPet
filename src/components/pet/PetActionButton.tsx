import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PetActionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

const PetActionButton: React.FC<PetActionButtonProps> = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={30} color="#B586FF" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  button: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<Style>({
  button: {
    width: '100%',
    height: 80,
    backgroundColor: '#EFE7FD', 
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
});

export default PetActionButton;