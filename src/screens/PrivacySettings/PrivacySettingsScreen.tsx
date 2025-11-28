import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NotificationToggle from '../../components/common/NotificationToggle';
import SettingsItem from '../../components/common/SettingsItem';
import LoginButton from '../../components/common/LoginButton';
import { RootStackParamList } from '../../../App'; 


interface PrivacySettingsScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'PrivacySettings'>['navigation']; 
}

const PrivacySettingsScreen: React.FC<PrivacySettingsScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [pushNotifications, setPushNotifications] = useState(true);
    const [locationAccess, setLocationAccess] = useState(false);
    const [dataAnalysis, setDataAnalysis] = useState(true);

    const handleSave = () => {
        console.log('Consentimentos salvos!');
        navigation.goBack();
    };
    
    const handleDocumentPress = (url: string) => {
        Alert.alert("Documento", `Abrindo documento em: ${url}`);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacidade e Dados</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <Text style={styles.sectionHeadingPolicy}>Política de Privacidade</Text>
                <Text style={styles.policyText}>
                    No PetCare, a sua privacidade é a nossa prioridade. Estamos empenhados em
                    proteger os seus dados pessoais e em sermos transparentes sobre como os
                    utilizamos. Esta política explica como recolhemos, utilizamos e partilhamos as
                    suas informações.
                </Text>
                
                <Text style={styles.sectionHeading}>Gerenciamento de Consentimento</Text>
                <View style={styles.settingsGroup}>
                    <NotificationToggle iconName="notifications-outline" title="Notificações Push" value={pushNotifications} onValueChange={setPushNotifications} />
                    <NotificationToggle iconName="location-outline" title="Acesso à Localização" value={locationAccess} onValueChange={setLocationAccess} />
                    <NotificationToggle iconName="stats-chart-outline" title="Dados para Análise" value={dataAnalysis} onValueChange={setDataAnalysis} />
                </View>

                <Text style={styles.sectionHeading}>Documentos Importantes</Text>
                <View style={styles.settingsGroup}>
                    
                    <SettingsItem 
                        iconName="shield-checkmark-outline" 
                        title="Política de Privacidade Completa" 
                        onPress={() => handleDocumentPress('https://www.exemplo.com/politica-completa')}
                    >
                        <Text style={styles.documentLink}>
                            Leia a nossa política completa para obter detalhes.
                        </Text>
                    </SettingsItem>

                    <SettingsItem 
                        iconName="document-text-outline" 
                        title="Termos de Serviço" 
                        onPress={() => handleDocumentPress('https://www.exemplo.com/termos-de-servico')}
                    >
                        <Text style={styles.documentLink}>
                            Compreenda seus direitos e responsabilidades.
                        </Text>
                    </SettingsItem>

                </View>


                <Text style={styles.sectionHeading}>Contato</Text>
                <Text style={styles.contactText}>
                    Para dúvidas sobre privacidade, entre em contato conosco através do e-mail: 
                    <Text style={styles.contactEmail} onPress={() => Linking.openURL('mailto:privacidade@petcare.com')}>
                        {' '}privacidade@petcare.com
                    </Text>
                </Text>
                

                <View style={styles.saveButtonWrapper}>
                    <LoginButton 
                        onPress={handleSave} 
                        title="Salvar" 
                    />
                </View>

            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionHeadingPolicy: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 10,
    },
    policyText: {
        fontSize: 14,
        color: '#6C6A6A',
        lineHeight: 20,
        marginBottom: 30,
    },

    documentLink: {
        fontSize: 14,
        color: '#36A2EB', 
        marginTop: 2,
    },

    settingsGroup: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    contactText: {
        fontSize: 14,
        color: '#6C6A6A',
        lineHeight: 20,
        marginBottom: 30,
    },
    contactEmail: {
        color: '#6B46C1',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    saveButtonWrapper: {
        marginTop: 30,
        alignItems: 'center',
    },
});

export default PrivacySettingsScreen;