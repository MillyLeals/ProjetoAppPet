import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SettingsItem from '../../components/common/SettingsItem';
import CustomTabBar from '../../components/common/CustomTabBar';
import { RootStackParamList } from '../../../App';

const TAB_BAR_HEIGHT = 60;
type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';

interface SettingsScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'Settings'>['navigation'];
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabRoutes>('Configuracoes');
    const insets = useSafeAreaInsets();

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Você tem certeza que deseja sair do aplicativo?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    onPress: () => navigation.navigate('Welcome'),
                    style: 'destructive'
                }
            ]
        );
    };

    const handleTabNavigation = (route: TabRoutes) => {
        setActiveTab(route);

        switch (route) {
            case 'Pets':
                navigation.navigate('MyPets');
                break;
            case 'Informacoes':
                navigation.navigate('Education');
                break;
            case 'Perfil':
                break;
            case 'Configuracoes':
                break;
        }
    };

    return (
        <View style={styles.mainContainer}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            navigation.navigate('MyPets');
                        }
                    }}
                    style={styles.backButton}
                >
                    <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <View style={styles.settingsGroup}>

                    <SettingsItem
                        iconName="notifications-outline"
                        title="Gerenciar Notificações"
                        onPress={() => navigation.navigate('NotificationSettings')}
                    />

                    <SettingsItem
                        iconName="shield-checkmark-outline"
                        title="Privacidade"
                        onPress={() => navigation.navigate('PrivacySettings')}
                    />

                    <SettingsItem
                        iconName="information-circle-outline"
                        title="Sobre o App"
                        onPress={() => navigation.navigate('About')}
                    />
                </View>

                <View style={styles.logoutWrapper}>
                    <SettingsItem
                    iconName="log-out-outline" 
                    title="Sair"
                    isLogout={true}
                    onPress={handleLogout}
/>
                </View>

            </ScrollView>

            <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom, height: TAB_BAR_HEIGHT + insets.bottom }]}>
                <CustomTabBar
                    activeRoute={activeTab}
                    onNavigate={handleTabNavigation}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        marginLeft: -38,
    },
    scrollContent: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    settingsGroup: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    logoutWrapper: {
        marginTop: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
    },
});

export default SettingsScreen;
