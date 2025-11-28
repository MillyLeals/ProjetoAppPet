import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomTabBar from '../../components/common/CustomTabBar'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 
type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';
type HealthFilter = 'Consultas' | 'Medicamentos' | 'Alergia' | 'Cirurgia' | 'Exame' | 'Outro';

interface HealthHistoryScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'HealthHistory'>['navigation']; 
}

interface TimelineItemProps {
    title: string;
    date: string;
    icon: keyof typeof Ionicons.glyphMap;
    isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, date, icon, isLast }) => (
    <View style={styles.timelineItem}>
        <View style={styles.timelineIconWrapper}>
            <View style={styles.timelineIconContainer}>
                <Ionicons name={icon} size={24} color="#6B46C1" />
            </View>
            {!isLast && <View style={styles.timelineLine} />}
        </View>
        <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>{title}</Text>
            <Text style={styles.timelineDate}>{date}</Text>
        </View>
    </View>
);

const HealthHistoryScreen: React.FC<HealthHistoryScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabRoutes>('Pets');
    const [activeFilter, setActiveFilter] = useState<HealthFilter>('Consultas');
    const insets = useSafeAreaInsets();
    
    const handleTabNavigation = (route: TabRoutes) => {
        setActiveTab(route);

        if (route === 'Pets') {
            navigation.navigate('MyPets');
        } else if (route === 'Informacoes') {
            navigation.navigate('Education');
        } else if (route === 'Perfil') {
            navigation.navigate('EditProfile');
        } else if (route === 'Configuracoes') {
            navigation.navigate('Settings');
        }
    };

    const filters: HealthFilter[] = ['Consultas', 'Medicamentos', 'Alergia', 'Cirurgia', 'Exame', 'Outro'];

    const allHistoryData = [
        { title: 'Consulta de Rotina - 1ª Dose de V8', date: '21 de Outubro de 2025', icon: 'calendar-outline' as const, type: 'Consultas' },
        { title: 'Exame de Fezes (Rotina)', date: '15 de Outubro de 2025', icon: 'medkit-outline' as const, type: 'Exame' },
        { title: 'Vacinação (Primeira Vermifugação)', date: '15 de Setembro de 2025', icon: 'paw-outline' as const, type: 'Medicamentos' },
        { title: 'Cirurgia de Castração', date: '01 de Março de 2026', icon: 'cut-outline' as const, type: 'Cirurgia' },
    ];

    const filteredData = allHistoryData.filter(item => {
        return item.type === activeFilter;
    });

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close-outline" size={30} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Histórico de Saúde</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.filterBar}
                >
                    {filters.map(filter => (
                        <TouchableOpacity 
                            key={filter} 
                            style={[
                                styles.filterTab, 
                                activeFilter === filter && styles.activeFilterTab
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                activeFilter === filter && styles.activeFilterText
                            ]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.historyTitle}>Eventos Adicionados</Text>
                
                <View style={styles.timelineWrapper}>
                    {filteredData.map((item, index) => (
                        <TimelineItem 
                            key={index}
                            title={item.title}
                            date={item.date}
                            icon={item.icon}
                            isLast={index === filteredData.length - 1} 
                        />
                    ))}
                    {filteredData.length === 0 && (
                        <Text style={styles.noDataText}>Nenhum registro encontrado para '{activeFilter}'.</Text>
                    )}
                </View>

            </ScrollView>
            
            <TouchableOpacity 
                style={[styles.fab, { bottom: TAB_BAR_HEIGHT + insets.bottom + 20 }]}
                onPress={() => navigation.navigate('AddHealthRecord')}
            >
                <Ionicons name="add" size={32} color="#FFF" />
            </TouchableOpacity>

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
        width: 40, 
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
        paddingBottom: 20, 
    },
    filterBar: {
        paddingHorizontal: 15,
        marginVertical: 10,
        height: 40,
        maxHeight: 40,
    },
    filterTab: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF', 
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#DFD0F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeFilterTab: {
        backgroundColor: '#DFD0F7', 
        borderColor: '#DFD0F7',
    },
    filterText: {
        color: '#6B46C1',
        fontWeight: '600',
        fontSize: 14,
    },
    activeFilterText: {
        color: '#6B46C1', 
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    timelineWrapper: {
        paddingHorizontal: 20,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineIconWrapper: {
        alignItems: 'center',
        marginRight: 15,
    },
    timelineIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F3F4FF', 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DFD0F7',
        zIndex: 2, 
    },
    timelineLine: {
        width: 2,
        height: '100%',
        backgroundColor: '#DFD0F7',
        position: 'absolute',
        top: 50,
        zIndex: 1,
    },
    timelineContent: {
        flex: 1,
        backgroundColor: '#F3F4FF',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DFD0F7',
        minHeight: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05, 
        shadowRadius: 2, 
        elevation: 1,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    timelineDate: {
        fontSize: 14,
        color: '#6B46C1',
        marginTop: 4,
    },
    noDataText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 50,
    },
    fab: {
        position: 'absolute',
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#A06CFF', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
    },
});

export default HealthHistoryScreen;
