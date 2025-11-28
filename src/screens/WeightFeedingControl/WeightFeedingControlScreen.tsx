import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SegmentedControl from '../../components/common/SegmentedControl';
import RecordItem from '../../components/pet/RecordItem';
import AddPetButton from '../../components/common/AddButton';
import { RootStackParamList } from '../../../App';

const { width } = Dimensions.get('window');
type ActiveTab = 'Peso' | 'Alimentação';
const PRIMARY_PURPLE = '#6B46C1';

interface WeightFeedingControlScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'WeightFeedingControl'>['navigation'];
}

const mockWeightData = [
    { id: '1', date: '01/02/2024', weight: '7.2kg' },
    { id: '2', date: '15/01/2024', weight: '7.0kg' },
    { id: '3', date: '01/01/2024', weight: '6.8kg' },
];

const mockFeedingData = [
    { id: 'a', info: 'Ração Seca', value: '100g - 08:00' },
    { id: 'b', info: 'Ração Úmida', value: '50g - 18:00' },
];

const WeightFeedingControlScreen: React.FC<WeightFeedingControlScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('Peso');
    const insets = useSafeAreaInsets();

    const handleAddRecord = () => {
        if (activeTab === 'Peso') {
            navigation.navigate('AddWeightRecord');
        } else {
            navigation.navigate('AddFeedingRecord');
        }
    };

    const renderWeightContent = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Registros de Peso</Text>
            </View>

            <View>
                {mockWeightData.map(item => (
                    <RecordItem
                        key={item.id}
                        iconName="scale-outline"
                        dateOrInfo={item.date}
                        value={item.weight}
                        isWeightRecord={true}
                        onPress={() => console.log('Peso clicado:', item.id)}
                    />
                ))}
            </View>
        </View>
    );

    const renderFeedingContent = () => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Registros de Alimentação</Text>
            </View>

            <View>
                {mockFeedingData.map(item => (
                    <RecordItem
                        key={item.id}
                        iconName="cut-outline"
                        dateOrInfo={item.info}
                        value={item.value}
                        isWeightRecord={false}
                        onPress={() => console.log('Alimento clicado:', item.id)}
                        onEdit={() => console.log('Editar Registro:', item.id)}
                    />
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.mainContainer}>

            <View style={[styles.header, { paddingTop: insets.top + 5 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconLeft}>
                    <Ionicons name="close-outline" size={30} color="#333" />
                </TouchableOpacity>

                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Controle de Peso e Alimentação</Text>
                </View>

                <View style={styles.headerIconRight} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <SegmentedControl
                    options={['Peso', 'Alimentação']}
                    selectedOption={activeTab}
                    onSelect={(option) => setActiveTab(option as ActiveTab)}
                />

                {activeTab === 'Peso' ? renderWeightContent() : renderFeedingContent()}

            </ScrollView>

            <View style={[styles.fabContainer, { bottom: 30 + insets.bottom }]}>
                <AddPetButton onPress={handleAddRecord} />
            </View>

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
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerIconLeft: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 5, 
    },
    headerIconRight: {
        width: 40,
        height: 40,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    scrollContent: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        zIndex: 10,
    },
});

export default WeightFeedingControlScreen;
