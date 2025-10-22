import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Status = 'Próxima' | 'Pendente' | 'Aplicada';

interface VaccineCardProps {
    date: string;
    name: string;
    status: Status;
    onPress: () => void;
}

const getStatusStyles = (status: Status) => {
    switch (status) {
        case 'Próxima':
            return {
                text: '#6B46C1',
                background: '#DFD0F7',
            };
        case 'Pendente':
            return {
                text: '#EBB44D', 
                background: '#FFF5E0',
            };
        case 'Aplicada':
            return {
                text: '#6C6A6A', 
                background: '#EAEAEA',
            };
        default:
            return { text: '#333', background: '#FFF' };
    }
};

const VaccineCard: React.FC<VaccineCardProps> = ({ date, name, status, onPress }) => {
    const statusStyle = getStatusStyles(status);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.leftContent}>
                <View style={styles.iconBackground}>
                    <Ionicons name="medical" size={24} color="#6B46C1" />
                </View>
                <View>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.background }]}>
                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {status}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10,
        marginVertical: 8,
        width: '100%',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBackground: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#F3F4FF', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    nameText: {
        fontSize: 14,
        color: '#6C6A6A',
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 15,
        minWidth: 80,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default VaccineCard;