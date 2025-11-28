import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App'; 
import PetInput from '../../components/common/PetInput';
import LoginButton from '../../components/common/LoginButton';

const { width } = Dimensions.get('window');

const PHOTO_ICON_COLOR = '#36A2EB';

interface EditProfileScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'EditProfile'>['navigation']; 
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {

    const [name, setName] = useState('Seu Nome');
    const [email, setEmail] = useState('seu.email@exemplo.com');
    const [phone, setPhone] = useState('(XX) XXXXX-XXXX');

    const handleSave = () => {
        console.log('Dados do Tutor Salvos!');
    };

    return (
        <View style={styles.mainContainer}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                    <Ionicons name="close" size={32} color="#333" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.photoSection}>
                    <View style={styles.profileImageContainer}>
                        <Image 
                            source={require('../../assets/images/placeholder-food.png')} 
                            style={styles.profileImage}
                        />

                        <TouchableOpacity style={styles.cameraIconContainer}>
                            <Ionicons name="camera" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.changePhotoText}>Alterar Foto</Text>
                </View>

                <PetInput label="Nome" value={name} onChangeText={setName} />
                <PetInput label="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} />
                <PetInput label="Telefone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                
                <View style={styles.saveButtonWrapper}>
                    <LoginButton 
                        onPress={handleSave} 
                        title="Salvar" 
                    /> 
                </View>

            </ScrollView>
            
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
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    closeButton: {
        padding: 4,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center', 
        marginLeft: -40,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40, 
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
        backgroundColor: '#DDD', 
        marginBottom: 10,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: PHOTO_ICON_COLOR,
        borderRadius: 20,
        padding: 8,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    changePhotoText: {
        fontSize: 14,
        color: PHOTO_ICON_COLOR,
        fontWeight: '600',
    },
    saveButtonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
    },
});

export default EditProfileScreen;
