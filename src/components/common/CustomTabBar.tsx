import React from 'react';
import { View, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import TabItem from './TabItem'; 

const { width } = Dimensions.get('window');

interface CustomTabBarProps {
  activeRoute: 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';
  onNavigate: (routeName: 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes') => void;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ activeRoute, onNavigate }) => {
  return (
    <View style={styles.container}>
      <TabItem
        iconName="paw"
        label="Pets"
        isActive={activeRoute === 'Pets'}
        onPress={() => onNavigate('Pets')}
      />
      <TabItem
        iconName="information-circle"
        label="Informações"
        isActive={activeRoute === 'Informacoes'}
        onPress={() => onNavigate('Informacoes')}
      />
      <TabItem
        iconName="person"
        label="Perfil"
        isActive={activeRoute === 'Perfil'}
        onPress={() => onNavigate('Perfil')}
      />
      <TabItem
        iconName="settings"
        label="Configurações"
        isActive={activeRoute === 'Configuracoes'}
        onPress={() => onNavigate('Configuracoes')}
      />
    </View>
  );
};

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    width: width,
    height: 60,
    backgroundColor: '#FFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default CustomTabBar;