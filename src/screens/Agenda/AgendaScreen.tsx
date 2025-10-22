import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { Calendar, LocaleConfig } from 'react-native-calendars'; 

import PetReminderCard from '../../components/pet/PetReminderCard';
import AddPetButton from '../../components/common/AddButton'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');

interface AgendaScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'Agenda'>['navigation']; 
}

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['D','S','T','Q','Q','S','S'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'br';

const customCalendarHeaderStyle = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        marginTop: 6,
        marginBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
};

const customTheme = {
    'stylesheet.calendar.header': customCalendarHeaderStyle,
    textSectionTitleColor: '#666',
    todayTextColor: '#6B46C1',
    calendarBackground: '#FFF',
} as any;


const mockEvents = [
    { id: '1', title: 'Consulta Veterinária', subtitle: '10:00 AM', icon: 'paw' },
    { id: '2', title: 'Banho e Tosa', subtitle: '3:00 PM', icon: 'cut' },
];

const AgendaScreen: React.FC<AgendaScreenProps> = ({ navigation }) => {
    
    const today = new Date().toISOString().split('T')[0]; 
    const [selectedDate, setSelectedDate] = useState(today); 

    const markedDates = useMemo(() => {
        return {
            [selectedDate]: {
                selected: true,
                selectedColor: '#DFD0F7',
                selectedTextColor: '#6B46C1',
            },
        };
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Agenda</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Calendar
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                    }}
                    markedDates={markedDates}
                    monthFormat={'MMMM yyyy'} 
                    renderArrow={(direction) => (
                        <Ionicons 
                            name={direction === 'left' ? "chevron-back" : "chevron-forward"} 
                            size={24} 
                            color="#333" 
                        />
                    )}
                    theme={customTheme} 
                />

                <Text style={styles.sectionTitle}>Próximos eventos</Text>

                <View style={styles.eventsList}>
                    {mockEvents.map(event => (
                        <PetReminderCard
                            key={event.id}
                            iconName={event.icon as keyof typeof Ionicons.glyphMap}
                            title={event.title}
                            subtitle={event.subtitle}
                            onPress={() => console.log(`Evento ${event.title} clicado`)}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.addButtonContainer}>
               <AddPetButton onPress={() => navigation.navigate('AddEvent')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        paddingBottom: 100, 
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    eventsList: {
        paddingHorizontal: 20,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        zIndex: 100,
    },
});

export default AgendaScreen;