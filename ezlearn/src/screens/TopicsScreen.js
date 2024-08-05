import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TopicsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { subject } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Flashcards', { subject })}
      >
        <Text style={styles.buttonText}>Learn through Flashcards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Assessments', { subject })}
      >
        <Text style={styles.buttonText}>Assessments</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});

export default TopicsScreen;
