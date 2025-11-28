import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  isLogout?: boolean; 
  children?: ReactNode; 
}

const SettingsItem: React.FC<SettingsItemProps> = ({ iconName, title, onPress, isLogout = false, children }) => {
  const iconColor = isLogout ? '#E53E3E' : '#6B46C1'; 
  const textColor = isLogout ? '#E53E3E' : '#333';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftContent}>
        {!isLogout && <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />}
    
        <View style={styles.textWrapper}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          {children} 
        </View>
      </View>
      
      {!isLogout ? (
        <Ionicons name="chevron-forward" size={20} color="#C0C0C0" style={styles.arrowIcon} />
      ) : (
        <Ionicons name="exit-outline" size={24} color="#E53E3E" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 1, 
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 15,
    width: 24,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default SettingsItem;
