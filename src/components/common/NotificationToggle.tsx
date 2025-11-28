import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationToggleProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ iconName, title, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.iconBackground}>
          <Ionicons name={iconName} size={20} color="#6B46C1" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <Switch
        trackColor={{ false: "#EAEAEA", true: "#DFD0F7" }} 
        thumbColor={value ? "#6B46C1" : "#F4F3F4"} 
        ios_backgroundColor="#EAEAEA"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginBottom: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
  },
  iconBackground: {
    marginRight: 15,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
});

export default NotificationToggle;