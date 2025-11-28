import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface EducationCardProps {
  title: string;
  description: string;
  imageUrl: any; 
  onPress: () => void;
}

const EducationCard: React.FC<EducationCardProps> = ({ title, description, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={imageUrl} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

interface Style {
  card: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  imageWrapper: ViewStyle;
  image: ImageStyle; 
}

const styles = StyleSheet.create<Style>({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 120,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default EducationCard;