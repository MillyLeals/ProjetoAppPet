import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, StatusBar } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

import { Pet } from '../../types/Pet'; 
import PetItem from '../../components/common/PetItem';
import AddPetButton from '../../components/common/AddButton'; 
import CustomTabBar from '../../components/common/CustomTabBar'; 
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 

type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';

interface MyPetsScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'MyPets'>['navigation']; 
}

const mockPets: Pet[] = [
    { id: '1', name: 'Luke', breed: 'Golden Retriever', imageUrl: require('../../assets/images/foto1.jpeg') },
    { id: '2', name: 'Nina', breed: 'Siamese', imageUrl: require('../../assets/images/foto2.jpg') },
];

const MyPetsScreen: React.FC<MyPetsScreenProps> = ({ navigation }) => {
    
    const [activeTab, setActiveTab] = React.useState<TabRoutes>('Pets');
    const insets = useSafeAreaInsets(); 

    const renderItem = ({ item }: { item: Pet }) => (
        <PetItem 
            name={item.name} 
            breed={item.breed} 
            imageUrl={item.imageUrl}
            onPress={() => navigation.navigate('PetProfile', { petId: item.id })} 
        />
    );

    return (
        <View style={styles.mainContainer}>
            
            <View style={[styles.contentWrapper, { paddingTop: insets.top }]}> 
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Meus Pets</Text>
                    <View style={styles.addButtonContainer}>
                        <AddPetButton onPress={() => navigation.navigate('AddPet')} /> 
                    </View>
                </View>

                <FlatList
                    data={mockPets}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                        styles.listContent, 
                        { paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 20 } 
                    ]} 
                />
            </View>

            <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom, height: TAB_BAR_HEIGHT + insets.bottom }]}>
                 <CustomTabBar 
                    activeRoute={activeTab} 
                    onNavigate={(route) => {
                        setActiveTab(route);
                    }} 
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
    contentWrapper: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center',
        width: '100%',
        height: 80, 
        paddingHorizontal: 20,
        paddingTop: 30, 
        borderBottomWidth: 1, 
        borderBottomColor: '#B586FF', 
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        marginTop: 5, 
    },
    addButtonContainer: {
        position: 'absolute',
        right: 20,
        top: 15, 
        zIndex: 1, 
    },
    listContent: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFF', 
    }
});

export default MyPetsScreen;