import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../../App'; 

const PRIMARY_PURPLE = '#6B46C1';
const LIGHT_PURPLE = '#DFD0F7';
const RED_COLOR = '#E53935'; 

interface EventDetailScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'EventDetail'>['navigation'];
    route: StackScreenProps<RootStackParamList, 'EventDetail'>['route'];
}
const getEventDetails = (id: string) => {
    return {
        id,
        title: id === '1' ? 'Consulta Veterinária' : 'Banho e Tosa',
        dateTime: '10/11/2025 às 10:00 AM',
        duration: '1 hora e 30 minutos',
        location: id === '1' ? 'Clínica Central - Rua Exemplo, 123' : 'Pet Shop Vizinho',
        notes: 'Levar a carteira de vacinação e o brinquedo favorito.',
        reminder: '1 dia antes',
        isEditing: false, 
    };
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ navigation, route }) => {
    const { eventId } = route.params; 
    const event = getEventDetails(eventId);

    const handleEditEvent = () => {
        navigation.navigate('AddEvent', { eventId: eventId }); 
    };

    const handleDeleteEvent = () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Você tem certeza que deseja excluir este evento permanentemente?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    onPress: () => {
                        console.log(`Excluindo evento ID: ${eventId}`);
                        navigation.goBack(); 
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Evento</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <Text style={styles.mainTitle}>{event.title}</Text>
                
                <View style={styles.reminderStatus}>
                    <Ionicons name="notifications-outline" size={18} color={PRIMARY_PURPLE} />
                    <Text style={styles.reminderText}>Lembrete Ativo: Avisar com {event.reminder}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <DetailRow label="Data e Hora" value={event.dateTime} />
                    <DetailRow label="Duração Estimada" value={event.duration} />
                    <DetailRow label="Local" value={event.location} />
                </View>
                
                <Text style={styles.notesHeader}>Notas e Observações</Text>
                <View style={styles.notesBox}>
                    <Text style={styles.notesText}>{event.notes}</Text>
                </View>
                
                {/* ⬅️ BOTÕES DE AÇÃO LADO A LADO */}
                <View style={styles.actionButtonsWrapper}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleEditEvent}>
                        <Text style={styles.editEventText}>Editar Evento</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton} onPress={handleDeleteEvent}>
                        <Text style={styles.deleteEventText}>Excluir Evento</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
    backButton: { marginRight: 10, width: 40 },
    headerSpacer: { width: 40 }, 
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center', 
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: PRIMARY_PURPLE,
        marginBottom: 10,
    },
    reminderStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: LIGHT_PURPLE,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    reminderText: {
        fontSize: 14,
        color: PRIMARY_PURPLE,
        marginLeft: 8,
        fontWeight: '500',
    },
    detailsContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: LIGHT_PURPLE,
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    detailLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    notesHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 30,
        marginBottom: 10,
    },
    notesBox: {
        backgroundColor: '#Fff',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: LIGHT_PURPLE,
        minHeight: 100,
    },
    notesText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    actionButtonsWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginTop: 40,
        paddingHorizontal: 10, 
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    editEventText: {
        color: PRIMARY_PURPLE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteEventText: {
        color: RED_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EventDetailScreen;