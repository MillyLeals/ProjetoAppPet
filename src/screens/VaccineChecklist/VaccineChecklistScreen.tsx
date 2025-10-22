import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import VaccineCard from '../../components/pet/VaccineCard';
import AddPetButton from '../../components/common/AddButton'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 

type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';

interface VaccineChecklistScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'VaccineChecklist'>['navigation']; 
}

type VaccineStatus = 'Próxima' | 'Pendente' | 'Aplicada';

interface VaccineItem {
    id: string;
    date: string;
    name: string;
    status: VaccineStatus;
}

const vaccineData = {
    proximas: [
        { id: 'p1', date: '30/10/2025', name: 'Raiva', status: 'Próxima' as const },
    ] as VaccineItem[],
    pendentes: [
        { id: 'd1', date: '20/10/2025', name: 'V10', status: 'Pendente' as const },
        { id: 'd2', date: '20/10/2025', name: 'Puppy', status: 'Pendente' as const },
    ] as VaccineItem[],
    aplicadas: [
        { id: 'a1', date: '20/10/2025', name: 'V10', status: 'Aplicada' as const },
        { id: 'a2', date: '20/10/2025', name: 'Puppy', status: 'Aplicada' as const },
    ] as VaccineItem[],
};

const VaccineChecklistScreen: React.FC<VaccineChecklistScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const renderSection = (title: string, data: VaccineItem[]) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {data.map(item => (
                <VaccineCard 
                    key={item.id}
                    date={item.date}
                    name={item.name}
                    status={item.status}
                    onPress={() => console.log(`Vacina ${item.name} clicada`)}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checklist Vacinas</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {renderSection("Próximas", vaccineData.proximas)}
                {renderSection("Pendentes", vaccineData.pendentes)}
                {renderSection("Aplicadas", vaccineData.aplicadas)}

            </ScrollView>

            <TouchableOpacity 
                style={[styles.addButtonContainer, { bottom: 30 + insets.bottom }]}
                onPress={() => navigation.navigate('RegisterVaccine')}
            >
                <AddPetButton onPress={() => navigation.navigate('RegisterVaccine')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
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
        padding: 20,
        paddingBottom: 100, 
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    addButtonContainer: {
        position: 'absolute',
        right: 30,
        zIndex: 100,
    },
});

export default VaccineChecklistScreen;