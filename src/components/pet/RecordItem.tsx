import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RecordItemProps {
    iconName: 'scale-outline' | 'cut-outline'; 
    dateOrInfo: string;
    value: string;
    isWeightRecord: boolean;
    onPress: () => void;
    onEdit?: () => void;
}

const RecordItem: React.FC<RecordItemProps> = ({ 
    iconName, 
    dateOrInfo, 
    value, 
    isWeightRecord, 
    onPress, 
    onEdit 
}) => {
    
    const ICON_COLOR = '#6B46C1'; 
    const BG_COLOR = '#DFD0F7'; 

    return (
        <TouchableOpacity 
            style={styles.cardContainer}
            onPress={onPress}
        >
            
            <View style={[styles.iconWrapper, { backgroundColor: BG_COLOR }]}>
                <Ionicons name={iconName} size={24} color={ICON_COLOR} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.dateText}>{dateOrInfo}</Text>
                
                <View style={styles.valueRow}>
                    <Text style={styles.valueText}>{value}</Text>
                    
                    {!isWeightRecord && onEdit && (
                        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                            <Text style={styles.editText}>Editar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 15, 
        paddingHorizontal: 15,
        marginBottom: 10, 
        borderWidth: 1, 
        borderColor: '#EEE',
    },
    iconWrapper: {
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    editButton: {
        marginLeft: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    editText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#AE7BFF', 
    },
});

export default RecordItem;