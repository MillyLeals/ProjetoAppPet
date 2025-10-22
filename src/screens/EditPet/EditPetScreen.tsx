// src/screens/EditPet/EditPetScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginButton from '../../components/common/LoginButton';
import PetInput from '../../components/common/PetInput'; 
import CustomTabBar from '../../components/common/CustomTabBar';
import { RootStackParamList } from '../../../App'; 

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; 
type TabRoutes = 'Pets' | 'Informacoes' | 'Perfil' | 'Configuracoes';

interface EditPetScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'EditPet'>['navigation']; 
}

const EditPetScreen: React.FC<EditPetScreenProps> = ({ navigation }) => {
    const [petName, setPetName] = useState('Luck');
    const [birthDate, setBirthDate] = useState('01/09/2025');
    const [weight, setWeight] = useState('2.4');
    const [breed, setBreed] = useState('Golden Retriever');
    const [activeTab, setActiveTab] = useState<TabRoutes>('Pets');
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Pet</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.photoSection}>
                    <View style={styles.profileImageContainer}>
                        <Image 
                            source={require('../../assets/images/foto1.jpeg')} 
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editIconContainer} onPress={() => console.log('Abrir seletor de foto')}>
                            <Ionicons name="pencil" size={18} color="#6B46C1" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changePhotoText}>Alterar Foto</Text>
                </View>
                
                
                <PetInput label="Nome" placeholder="Nome do seu pet" value={petName} onChangeText={setPetName} />
                
                <PetInput 
                    label="Data de Nascimento"
                    placeholder="DD/MM/AAAA"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />
                
                <PetInput 
                    label="Peso (kg)"
                    placeholder="Peso em kg"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />
                
                <PetInput label="Raça" placeholder="Raça do seu pet" value={breed} onChangeText={setBreed} />
                
                <View style={styles.saveButtonWrapper}>
                    <LoginButton onPress={() => console.log('Salvar Edição')} title="Salvar" />
                </View>

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
    photoSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: '#DFD0F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    changePhotoText: {
        fontSize: 14,
        color: '#6B46C1',
        fontWeight: '600',
    },
    saveButtonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
    },
});

export default EditPetScreen;