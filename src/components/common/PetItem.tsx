import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface PetItemProps {
  name: string;
  breed: string;
  imageUrl: any; 
  onPress: () => void;
}

const PetItem: React.FC<PetItemProps> = ({ name, breed, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageUrl} 
          style={styles.petImage} 
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.petName}>{name}</Text>
        <Text style={styles.petBreed}>{breed}</Text>
      </View>
      
      <Ionicons name="chevron-forward" size={24} color="#6B46C1" style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9, 
    padding: 15,
    backgroundColor: '#FFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DDD6FE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
    marginRight: 15,
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3333',
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 14,
    color: '#6666',
  },
  arrowIcon: {
    marginLeft: 10,
  },
});

export default PetItem;