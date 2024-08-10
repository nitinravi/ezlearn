import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient';

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session || !session.session) {
          Alert.alert('Error', 'User is not logged in.');
          navigation.navigate('Login');
          return;
        }

        const user = session.session.user;
        setUser(user);

        
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{user.email}</Text>

          <Text style={{ marginVertical: 30 }}>There's not much to see here. I used an unchangeable goofy ghost User Icon for everyone :p</Text>
          <Text style={{ paddingTop:10, marginVertical: 30 }}>I hope you enjoyed the app! {"\n"}Created with ♡ by <Text style={{ textDecorationLine: 'line-through' }}>ChatGPT</Text> Nitin Ravi</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.error}>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#555',
    marginTop: 10,
  },
  info: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  error: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#FF0000',
  },

  logoutButton: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});

export default UserProfile;
