import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabaseClient';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        Alert.alert('Error', error.message);
        setIsSubmitting(false);
      } else {
        Alert.alert('Success', 'Registration successful! Please check your email to confirm your account.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
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
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Enter your details to register.</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Login
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

export default RegistrationScreen;
