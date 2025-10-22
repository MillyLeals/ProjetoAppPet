import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabItemProps {
  iconName: keyof typeof Ionicons.glyphMap; 
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ iconName, label, isActive, onPress }) => {
  const color = isActive ? '#6B46C1' : '#6C6A6A'; 

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={24} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

interface Style {
  container: ViewStyle;
  label: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default TabItem;