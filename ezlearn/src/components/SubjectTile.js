// src/components/SubjectTile.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Array of light colors for random selection
const lightColors = ['#cdeaf8'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * lightColors.length);
  return lightColors[randomIndex];
};

const SubjectTile = ({ title, description, onPress }) => {
  const backgroundColor = getRandomColor(); // Randomly select a background color

  return (
    <TouchableOpacity style={[styles.tile, { backgroundColor }]} onPress={onPress}>
      <View style={styles.tileContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 160,
    height: 160,
    borderRadius: 12,
    padding: 15,
    margin: 10,
    elevation: 6, // Increased shadow for better visibility on Android
    shadowColor: '#000', // Stronger shadow color for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333333', // Darker text color for contrast
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666666', // Slightly lighter text color
    textAlign: 'center',
  },
});

export default SubjectTile;
