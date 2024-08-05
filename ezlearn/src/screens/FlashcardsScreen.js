import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRoute } from '@react-navigation/native';

const FlashcardsScreen = () => {
  const route = useRoute();
  const { subject } = route.params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useState(new Animated.Value(0))[0];

  const flashcards = [
    { question: 'What is AWS?', answer: 'AWS stands for Amazon Web Services.', color: '#D0E8FF' },
    { question: 'What is EC2?', answer: 'EC2 is a cloud computing service provided by AWS.', color: '#E8F6E0' },
    { question: 'What is S3?', answer: 'S3 is a scalable storage service by AWS.', color: '#D0E8FF' },
    { question: 'What is Lambda?', answer: 'Lambda allows you to run code without provisioning servers.', color: '#E8F6E0' },
    { question: 'What is CloudFormation?', answer: 'CloudFormation provides a way to model and provision AWS resources using templates.', color: '#D0E8FF' },
    { question: 'What is IAM?', answer: 'IAM stands for Identity and Access Management, used to manage access to AWS resources.', color: '#E8F6E0' },
    { question: 'What is VPC?', answer: 'VPC stands for Virtual Private Cloud, a service that provides a logically isolated network for AWS resources.', color: '#D0E8FF' },
  ];

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.timing(flipAnim, {
      toValue,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false); // Reset flip state for the new card
      flipAnim.setValue(0); // Reset flip animation
    }
  };

  const interpolateRotation = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject} - Flashcards</Text>
      <View style={[styles.cardContainer, { backgroundColor: flashcards[currentCardIndex].color }]}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: frontOpacity,
              transform: [{ rotateY: interpolateRotation }],
              backgroundColor: flashcards[currentCardIndex].color, // Inherit color
            },
          ]}
        >
          <Text style={styles.cardText}>{flashcards[currentCardIndex].question}</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.cardBack,
            {
              opacity: backOpacity,
              transform: [{ rotateY: interpolateRotation }],
              backgroundColor: flashcards[currentCardIndex].color, // Inherit color
            },
          ]}
        >
          <Text style={styles.cardText}>{flashcards[currentCardIndex].answer}</Text>
        </Animated.View>
      </View>
      <TouchableOpacity
        style={styles.flipButton}
        onPress={handleFlip}
      >
        <Text style={styles.buttonText}>{isFlipped ? 'Show Question' : 'Show Answer'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextCard}
        disabled={currentCardIndex >= flashcards.length - 1}
      >
        <Text style={styles.buttonText}>Next</Text>
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
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    perspective: 1000,
    borderRadius: 10,
    overflow: 'hidden', // Ensures rounded corners are visible
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    padding: 20, // Add padding to align text properly
  },
  flipButton: {
    marginTop: 20,
    backgroundColor: '#0066CC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#0066CC',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default FlashcardsScreen;
