import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image, Share, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SettingsItem from '../../components/common/SettingsItem'; 
import { RootStackParamList } from '../../../App'; 

interface AboutScreenProps {
    navigation: StackScreenProps<RootStackParamList, 'About'>['navigation']; 
}

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const APP_VERSION = '1.0.0';
    const YEAR = new Date().getFullYear();
    const BRAND_COLOR = '#6B46C1';

    const handleShare = async () => {
        try {
            await Share.share({
                message: 'Conheça o PetCare! O aplicativo ideal para gerenciar a saúde do seu pet.',
                url: 'https://www.exemplo.com/petcare',
            });
        } catch (error) {
            Alert.alert('Erro', 'Falha ao tentar compartilhar o aplicativo.');
        }
    };
    
    const handleLinkPress = (title: string, url: string) => {
        if (url.startsWith('mailto:')) {
            Linking.openURL(url);
        } else if (url.startsWith('url-')) {
            Alert.alert(title, `Navegar para a tela interna: ${url.replace('url-', '')}`);
        } else {
            Linking.openURL(url);
        }
    };

    return (
        <View style={styles.mainContainer}>
            
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconLeft}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>Sobre o PetCare</Text>
                
                <TouchableOpacity onPress={handleShare} style={styles.headerIconRight}>
                    <Ionicons name="share-social-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.appInfoSection}>
                    <View style={styles.appIconContainer}>
                        <Ionicons name="paw" size={48} color={BRAND_COLOR} />
                    </View>
                    <Text style={styles.appName}>PetCare</Text>
                    <Text style={styles.appVersion}>Versão {APP_VERSION}</Text>
                </View>

                <View style={styles.linksGroup}>
                    <SettingsItem 
                        iconName="document-text-outline" 
                        title="Termos de Serviço" 
                        onPress={() => handleLinkPress('Termos de Serviço', 'url-termos-de-servico')}
                    />
                    <SettingsItem 
                        iconName="shield-outline" 
                        title="Política de Privacidade" 
                        onPress={() => handleLinkPress('Política de Privacidade', 'url-politica-privacidade')}
                    />
                    <SettingsItem 
                        iconName="mail-outline" 
                        title="E-mail de Suporte" 
                        onPress={() => handleLinkPress('E-mail de Suporte', 'mailto:suporte@petcare.com')}
                    />
                    <SettingsItem 
                        iconName="help-circle-outline" 
                        title="FAQ" 
                        onPress={() => handleLinkPress('FAQ', 'url-faq')}
                    />
                </View>
                
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.copyrightText}>
                    © {YEAR} PetCare. Todos os direitos reservados.
                </Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerIconLeft: {
        width: 40, 
        height: 30,
        justifyContent: 'center',
    },
    headerIconRight: {
        width: 40,
        height: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center', 
    },
    scrollContent: {
        paddingTop: 0,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    appInfoSection: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    appIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#DFD0F7', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    appVersion: {
        fontSize: 16,
        color: '#6C6A6A',
        marginTop: 5,
    },
    linksGroup: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    footer: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    copyrightText: {
        fontSize: 12,
        color: '#6C6A6A',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default AboutScreen;