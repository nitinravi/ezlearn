import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { supabase } from '../services/supabaseClient';

// Import an eye icon for the password toggle (you can use any icon or image)
import eyeIcon from '../../assets/eye-icon.png'; // Adjust the path as necessary
import eyeSlashIcon from '../../assets/eye-slash-icon.png'; // Adjust the path as necessary

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert('Error', error.message);
        setIsSubmitting(false);
      } else {
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your credentials to login.</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={styles.passwordContainer}>
  <TextInput
    style={[styles.input, styles.passwordInput]}
    placeholder="Password"
    placeholderTextColor="#888"
    secureTextEntry={!isPasswordVisible}
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    style={styles.eyeIconWrapper}
    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
  >
    <Image
      source={isPasswordVisible ? eyeIcon : eyeSlashIcon}
      style={styles.eyeIcon}
    />
  </TouchableOpacity>
</View>
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Registration')}>
            Register
          </Text>
        </Text>
      </View>
    </ScrollView>
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
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    color: '#555',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderColor: '#DDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    borderColor: '#DDD',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    paddingRight: 60, // Make space for the eye icon
  },
  eyeIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    height: 20,
    width: 20,
    marginBottom: 10,
  },
  eyeIconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#8BBEE8',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
  link: {
    color: '#0066CC',
    fontFamily: 'Poppins-Bold',
  },
});

export default LoginScreen;
