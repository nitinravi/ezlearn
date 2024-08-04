import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { supabase } from './src/services/supabaseClient';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserProfile from './src/components/UserProfile'; // Adjust path if necessary

// Define a function to load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        await loadFonts();
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? "Home" : "Onboarding"} screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
