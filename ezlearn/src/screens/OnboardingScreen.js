import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import SvgPic from '../../assets/SvgOne';
import SvgTwo from '../../assets/SvgTwo';
import SvgThree from '../../assets/SvgThree';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <Swiper loop={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      <View style={styles.slide}>
        <Text style={styles.title}>Welcome to Ez Learn</Text>
        <SvgPic width={300} height={300} />
        <Text style={styles.description}>Learn and test your knowledge with flashcards and assessments.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Flashcards</Text>
        <SvgTwo width={300} height={300} />
        <Text style={styles.description}>Create and review flashcards to reinforce your learning.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Assessments</Text>
        <SvgThree width={300} height={300} />
        <Text style={styles.description}>Take assessments to test your knowledge and track your progress.</Text>
        <Button title="Get Started" onPress={() => navigation.navigate('Registration')} />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: width,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default OnboardingScreen;
