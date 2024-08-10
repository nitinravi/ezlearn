import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import questionsData from '../../assets/questions.json'; // Import the questions JSON

const AssessmentsScreen = () => {
  const route = useRoute();
  const { subject } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  useEffect(() => {
    const subjectQuestions = questionsData[subject] || [];
    setQuestions(subjectQuestions);
  }, [subject]);

  const handleAnswer = (answer) => {
    if (selectedOption !== null) return; // Prevent changing the answer after selection

    setSelectedOption(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setAssessmentCompleted(true);
      Alert.alert(
        'Assessment Completed',
        `Your score: ${score}/${questions.length}`,
        [
          { text: 'OK', onPress: () => {} }
        ]
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const renderOption = ({ item }) => {
    let buttonStyle = styles.optionButton;
    let textStyle = styles.optionText;

    if (selectedOption === item) {
      if (item === questions[currentQuestionIndex].correctAnswer) {
        buttonStyle = styles.optionButtonCorrect;
      } else {
        buttonStyle = styles.optionButtonIncorrect;
      }
    }

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => handleAnswer(item)}
        disabled={selectedOption !== null}
      >
        <Text style={textStyle}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject} - Assessments</Text>
      {questions.length > 0 ? (
        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          </View>
          <FlatList
            data={questions[currentQuestionIndex].options}
            renderItem={renderOption}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.optionsContainer}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.navigationButton, { backgroundColor: '#4CAF50' }]}
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navigationButton, { backgroundColor: '#2196F3' }]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          {assessmentCompleted && (
            <TouchableOpacity
              style={styles.showAnswerButton}
              onPress={handleShowAnswer}
              disabled={!assessmentCompleted} // Disable until assessment is completed
            >
              <Text style={styles.buttonText}>Show Answer</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.noQuestionsText}>No questions available for this subject.</Text>
      )}
      {showAnswer && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>Correct Answer: {questions[currentQuestionIndex].correctAnswer}</Text>
        </View>
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
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
    backgroundColor: '#E0F2F1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonCorrect: {
    backgroundColor: '#C8E6C9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonIncorrect: {
    backgroundColor: '#FFCDD2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#00796B',
  },
  optionsContainer: {
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 600,
    marginTop: 20,
  },
  navigationButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
  },
  showAnswerButton: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    width: '100%', // Ensure it takes full width
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  noQuestionsText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  answerContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFF',
  },
});

export default AssessmentsScreen;
