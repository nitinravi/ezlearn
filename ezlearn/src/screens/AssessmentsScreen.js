import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AssessmentsScreen = () => {
  const route = useRoute();
  const { subject } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { question: 'What does AWS stand for?', options: ['Amazon Web Services', 'Advanced Web Solutions'], correctAnswer: 'Amazon Web Services' },
    { question: 'What is EC2?', options: ['Elastic Compute Cloud', 'Elastic Computing Center'], correctAnswer: 'Elastic Compute Cloud' },
    // Add more questions as needed
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Assessment completed! Your score: ${score + 1}/${questions.length}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject} - Assessments</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
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
  question: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});

export default AssessmentsScreen;
