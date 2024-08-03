import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.itemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      {/* Add more items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
});

export default Sidebar;
