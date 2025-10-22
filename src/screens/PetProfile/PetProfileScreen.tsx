import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

import PetActionButton from '../../components/pet/PetActionButton';
import PetReminderCard from '../../components/pet/PetReminderCard';
import CustomTabBar from '../../components/common/CustomTabBar';
import { RootStackParamList } from '../../../App'; 

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 

interface PetProfileScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'PetProfile'>['navigation']; 
}

const PetProfileScreen: React.FC<PetProfileScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = React.useState<'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes'>('Pets');
    const insets = useSafeAreaInsets(); 
    const pet = {
        name: 'Luke',
        birthDate: '01/09/2025',
        weight: '2,4 kg',
        breed: 'Golden',
        profilePic: require('../../assets/images/foto1.jpeg') 
    };

    return (
        <View style={styles.mainContainer}> 
            
            <ScrollView 
                style={[styles.scrollView, { paddingTop: insets.top + 20 }]} 
                contentContainerStyle={styles.scrollContent} 
            >
                
                <Text style={styles.initialText}>Olá, Tutor!</Text>

                <View style={styles.petCard}>
                    <Image source={pet.profilePic} style={styles.profileImage} />
                    <Text style={styles.petName}>{pet.name}</Text>
                    
                    <View style={styles.detailsRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Nascimento</Text>
                            <Text style={styles.detailValue}>{pet.birthDate}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Peso</Text>
                            <Text style={styles.detailValue}>{pet.weight}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Raça</Text>
                            <Text style={styles.detailValue}>{pet.breed}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Lembretes Importantes</Text>

                <PetReminderCard 
                    iconName="thermometer" 
                    title="Vacina Antirrábica" 
                    subtitle="Vence em 15 de Julho"
                    onPress={() => console.log('Ver lembrete')}
                />
                 <PetReminderCard 
                    iconName="calendar" 
                    title="Consulta de Rotina" 
                    subtitle="Agendada para 10 de Abril"
                    onPress={() => console.log('Ver lembrete')}
                />

                <View style={styles.actionBlocks}>
                    <PetActionButton 
                        iconName="calendar" 
                        title="Agenda" 
                        onPress={() => navigation.navigate('Agenda')} 
                    />
                    <PetActionButton 
                        iconName="create" 
                        title="Cadastro do Pet" 
                        onPress={() => navigation.navigate('EditPet', { petId: '1' })} 
                    />
                    <PetActionButton 
                        iconName="medical" 
                        title="Histórico de Saúde" 
                        onPress={() => navigation.navigate('HealthHistory')}
                    />
                    <PetActionButton 
                        iconName="nutrition"
                        title="Alimentação/Peso" 
                        onPress={() => console.log('Abrir Controle de Alimentação/Peso')} 
                    />
                    <PetActionButton 
                        iconName="checkmark-done-circle" 
                        title="Checklist de Vacinas" 
                        onPress={() => navigation.navigate('VaccineChecklist')}
                    />
                </View>

                <View style={{ height: TAB_BAR_HEIGHT + insets.bottom + 80 }} /> 

            </ScrollView>

            <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom, height: TAB_BAR_HEIGHT + insets.bottom }]}>
                 <CustomTabBar 
                    activeRoute={activeTab} 
                    onNavigate={(route) => setActiveTab(route)} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    initialText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    petCard: {
        backgroundColor: '#F8F4FF', 
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    petName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 12,
        color: '#6C6A6A', 
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
    },
    actionBlocks: {
        marginTop: 20,
        alignItems: 'center',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFF', 
    },
});

export default PetProfileScreen;