import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import flashcardsData from "../../assets/flashcards.json"; // Import the flashcards JSON

const FlashcardsScreen = () => {
  const route = useRoute();
  const { subject } = route.params;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const flipAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setFlashcards(flashcardsData[subject] || []);
  }, [subject]);

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

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false); // Reset flip state for the new card
      flipAnim.setValue(0); // Reset flip animation
    }
  };

  const interpolateRotation = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "180deg", "360deg"],
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
      {flashcards.length > 0 ? (
        <View
          style={[
            styles.cardContainer,
            { backgroundColor: flashcards[currentCardIndex].color },
          ]}
        >
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
            <Text style={styles.cardText}>
              {flashcards[currentCardIndex].question}
            </Text>
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
            <Text style={styles.cardText}>
              {flashcards[currentCardIndex].answer}
            </Text>
          </Animated.View>
        </View>
      ) : (
        <Text style={styles.noCardsText}>
          No flashcards available for this subject.
        </Text>
      )}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handlePreviousCard}
          disabled={currentCardIndex === 0}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={handleFlip}>
          <Text style={styles.buttonText}>
            {isFlipped ? "Show Question" : "Show Answer"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextCard}
          disabled={currentCardIndex >= flashcards.length - 1}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 20,
  },
  cardContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    perspective: 1000,
    borderRadius: 10,
    overflow: "hidden", // Ensures rounded corners are visible
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  cardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cardText: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    padding: 20, // Add padding to align text properly
  },
  navigationButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  buttonBase: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5, // Evenly space buttons
    height: 50, // Ensure consistent height'
    
  },
  backButton: {
    backgroundColor: '#8CC0FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
     // Color for the Back button
  },
  flipButton: {
    backgroundColor: '#C6E2FF', // Color for the Flip button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: '#8CC0FF', // Color for the Next button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});

export default FlashcardsScreen;
