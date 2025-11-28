import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomTabBar from '../../components/common/CustomTabBar';
import EducationCard from '../../components/education/EducationCard'; 
import { RootStackParamList } from '../../../App'; 

const { width, height } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 

type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';

interface EducationScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'Education'>['navigation']; 
}

const EducationScreen: React.FC<EducationScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = React.useState<TabRoutes>('Informacoes');
    const insets = useSafeAreaInsets(); 

    const educationalData = [
        {
            id: '1',
            title: 'Dicas de Alimentação',
            description: 'Guia completo para uma dieta equilibrada.',
            imageUrl: require('../../assets/images/placeholder-food.png') 
        },
        {
            id: '2',
            title: 'Curiosidades sobre Raças',
            description: 'Descubra as características de cada raça.',
            imageUrl: require('../../assets/images/placeholder-food.png')
        },
        {
            id: '3',
            title: 'Cuidados Gerais',
            description: 'Mantenha seu pet saudável e feliz.',
            imageUrl: require('../../assets/images/placeholder-food.png')
        },
    ];

    const handleTabNavigation = (route: TabRoutes) => {
        setActiveTab(route); 

        switch (route) {
            case 'Pets':
                navigation.navigate('MyPets'); 
                break;
            case 'Perfil':
                navigation.navigate('EditProfile');
                break;
            case 'Configuracoes':
                navigation.navigate('Settings'); 
                break;
            case 'Informacoes':
                break;
        }
    };

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <Ionicons name="close" size={28} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>PetCare</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.sectionTitle}>Educação</Text>
                
                {educationalData.map(item => (
                    <EducationCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        onPress={() => console.log('Abrir artigo:', item.title)}
                    />
                ))}
                
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
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: TAB_BAR_HEIGHT + 30, 
        paddingTop: 10, 
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

    sectionTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: -5, 
    },
   
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF', 
    },
});

export default EducationScreen;
