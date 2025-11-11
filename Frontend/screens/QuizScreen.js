import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width } = Dimensions.get("window");

const FlashCardScreen = ({ route, navigation }) => {
  const { lesson, topicId } = route.params;
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // 1. Agar content exist karta hai
  const content = lesson.content || "";

  // 2. 3 flashcards dynamically create karo
  const flashcards = [
    { question: content.slice(0, 80), answer: content.slice(0, 80) },
    { question: content.slice(80, 160), answer: content.slice(80, 160) },
    { question: content.slice(160), answer: content.slice(160) },
  ];

  // 3. State me set karo
  setFlashcards(flashcards);

  // 4. Loading false
  setLoading(false);
}, [lesson]);

  const handleNext = () => {
    setFlipped(false);
    if (index < flashcards.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("Quiz", { lesson });
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
        <ActivityIndicator color="#00C6FF" size="large" />
      </LinearGradient>
    );
  }

  if (flashcards.length === 0) {
    return (
      <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 20, marginTop: 100 }}>
          No flashcards available for this lesson.
        </Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Lesson Title */}
      <Text style={styles.title}>{lesson.topic}</Text>

      {/* Flashcard */}
      <TouchableOpacity onPress={() => setFlipped(!flipped)}>
        <Animatable.View animation="flipInY" duration={600} style={styles.card}>
          <Text style={styles.cardText}>
            {flipped ? flashcards[index]?.answer : flashcards[index]?.question}
          </Text>
        </Animatable.View>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <LinearGradient colors={["#00C6FF", "#0072FF"]} style={styles.nextGradient}>
          <Text style={styles.nextText}>
            {index === flashcards.length - 1 ? "Start Quiz" : "Next Card"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
    marginBottom: 40,
  },
  card: {
    width: width * 0.85,
    height: 250,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
  },
  nextButton: {
    marginTop: 50,
  },
  nextGradient: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  nextText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default FlashCardScreen;
