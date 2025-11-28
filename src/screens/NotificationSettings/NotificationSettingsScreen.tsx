import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import NotificationToggle from '../../components/common/NotificationToggle'; 
import LoginButton from '../../components/common/LoginButton';
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');

interface NotificationSettingsScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'NotificationSettings'>['navigation']; 
}

const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({ navigation }) => {

    const [vaccineReminders, setVaccineReminders] = useState(true);
    const [consultReminders, setConsultReminders] = useState(true);
    const [groomingReminders, setGroomingReminders] = useState(false);
    const [medsReminders, setMedsReminders] = useState(true);
    const [educationalTips, setEducationalTips] = useState(true);
    const [allowSound, setAllowSound] = useState(true);
    const [allowVibration, setAllowVibration] = useState(true);

    const handleSave = () => {
        console.log('Preferências salvas.');
        navigation.goBack();
    };

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notificações</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.sectionTitle}>Lembretes</Text>
                <View style={styles.settingsGroup}>
                    <NotificationToggle iconName="bandage-outline" title="Lembretes de Vacina" value={vaccineReminders} onValueChange={setVaccineReminders} />
                    <NotificationToggle iconName="calendar-outline" title="Lembretes de Consulta" value={consultReminders} onValueChange={setConsultReminders} />
                    <NotificationToggle iconName="cut-outline" title="Lembretes de Banho e Tosa" value={groomingReminders} onValueChange={setGroomingReminders} />
                    <NotificationToggle iconName="medkit-outline" title="Lembretes de Medicamentos" value={medsReminders} onValueChange={setMedsReminders} />
                </View>

                <Text style={styles.sectionTitle}>Conteúdo</Text>
                <View style={styles.settingsGroup}>
                    <NotificationToggle 
                        iconName="location-outline" 
                        title="Novas Dicas Educativas" 
                        value={educationalTips} 
                        onValueChange={setEducationalTips} 
                    />
                </View>

                <Text style={styles.sectionTitle}>Configurações Gerais</Text>
                <View style={styles.settingsGroup}>
                    <NotificationToggle iconName="volume-high-outline" title="Permitir Som" value={allowSound} onValueChange={setAllowSound} />
                    <NotificationToggle iconName="phone-portrait-outline" title="Permitir Vibração" value={allowVibration} onValueChange={setAllowVibration} />
                </View>

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
    scrollContent: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 40, 
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    settingsGroup: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    saveButtonWrapper: {
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    fullWidthButton: {
        width: width * 0.9,
        height: 50,
    },
});

export default NotificationSettingsScreen;