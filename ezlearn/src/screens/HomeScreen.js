import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SubjectTile from '../components/SubjectTile'; // Import the SubjectTile component

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
    { id: '5', title: 'Git', description: 'Learn to use Git and Version Control' },
    { id: '6', title: 'Python', description: 'Learn Python programming language basics.' },
    { id : '7', title: 'DSA Interview Prep', description: 'Prepare for Data Structures and Algorithms interviews.' },
    { id: '8', title: 'DBMS', description: 'Master DBMS concepts most asked in interviews.' },
    { id: '9', title: 'System Design', description: 'Learn to design scalable systems.' },
    { id: '10', title: 'DevOps', description: 'Understand the Development and Operations cycle.' },
  ];

  const renderSubjectTile = ({ item }) => (
    <SubjectTile
      title={item.title}
      description={item.description}
      onPress={() => {
        navigation.navigate('Topics', { subject: item.title });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.profileButton, { top: getStatusBarHeight() + 20 }]}
        onPress={navigateToUserProfile}
      >
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome back user!</Text>
      <FlatList
        data={subjects}
        renderItem={renderSubjectTile}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.tilesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    marginTop: getStatusBarHeight(),
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 20,
  },
  tilesContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
