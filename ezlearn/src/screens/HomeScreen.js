import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubjectTile from '../components/SubjectTile'; // Import the SubjectTile component

// Function to get status bar height (notch safe)
const getStatusBarHeight = () => {
  return Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToUserProfile = () => {
    navigation.navigate('UserProfile');
  };

  const subjects = [
    { id: '1', title: 'AWS CCP', description: 'Learn AWS Cloud Practitioner essentials.' },
    { id: '2', title: 'OOPS', description: 'Understand Object-Oriented Programming concepts.' },
    { id: '3', title: 'CCNA', description: 'Get started with Cisco Certified Network Associate.' },
    { id: '4', title: 'React Native', description: 'Build mobile apps using React Native framework.' },
    { id: '5', title: 'Node.js', description: 'Develop server-side applications with Node.js.' },
    { id: '6', title: 'Python', description: 'Learn Python programming language basics.' },
  ];

  const renderSubjectTile = ({ item }) => (
    <SubjectTile
      title={item.title}
      description={item.description}
      onPress={() => {
        // Handle tile press (e.g., navigate to specific module)
        console.log(`${item.title} Tile Pressed`);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.profileButton, { top: getStatusBarHeight() + 20 }]} // Add top padding
        onPress={navigateToUserProfile}
      >
        <Image
          source={require('../../assets/profile.png')} // Adjust path if necessary
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back user!</Text>
      <FlatList
        data={subjects}
        renderItem={renderSubjectTile}
        keyExtractor={item => item.id}
        numColumns={2} // Display tiles in two columns
        contentContainerStyle={styles.tilesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(), // Ensure padding for the status bar
    backgroundColor: '#f0f4f8', // Light background color
    alignItems: 'center',
    paddingHorizontal: 10, // Add padding to container
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: getStatusBarHeight(), // Adjust margin to bring down the text
    textAlign: 'left', // Align text to the left
    width: '100%', // Full width for left alignment
    paddingHorizontal: 20, // Add padding to align text within the container
  },
  tilesContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;