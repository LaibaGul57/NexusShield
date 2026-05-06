
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const FlashCardScreen = ({ route, navigation }) => {
  // 1. Data receive karein jo Training screen se bheja gaya tha
  // 'lesson' mein backend ka pura response (flashcards array ke sath) hona chahiye
  const { lesson, topic, level } = route.params; 

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Next Button logic
  const handleNext = () => {
    setFlipped(false);
    const totalCards = lesson?.flashcards?.length || 0;

    if (index < totalCards - 1) {
      setIndex(index + 1);
    } else {
      // Jab cards khatam ho jayein toh Quiz screen par jayein
      navigation.navigate("Quiz", { lesson, topic, level });
    }
  };

  // Error handling agar data na mile
  if (!lesson || !lesson.flashcards || lesson.flashcards.length === 0) {
    return (
      <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 18, textAlign: 'center', padding: 20 }}>
            No flashcards found for "{topic}". Check your backend response.
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <StatusBar barStyle="light-content" />

        {/* --- Header / Back Button --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.circularBackButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* --- Dynamic Title --- */}
        <Text style={styles.title}>{topic}</Text>

        {/* --- Flashcard Section --- */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => setFlipped(!flipped)}
          style={styles.cardContainer}
        >
          <Animatable.View
            animation="flipInY"
            duration={600}
            style={styles.card}
            // Key badalne se animation har dafa fresh trigger hoti hai
            key={index + (flipped ? "-back" : "-front")}
          >
            <Text style={styles.cardText}>
              {flipped 
                ? lesson.flashcards[index].answer 
                : lesson.flashcards[index].question
              }
            </Text>
            
            <View style={styles.tapHint}>
              <Ionicons name="refresh-circle-outline" size={16} color="#00C6FF" />
              <Text style={styles.hintText}>
                {flipped ? " Tap for Question" : " Tap for Answer"}
              </Text>
            </View>
          </Animatable.View>
        </TouchableOpacity>

        {/* --- Progress Indicator --- */}
        <View style={styles.progressContainer}>
           <Text style={styles.progressText}>
            Card {index + 1} of {lesson.flashcards.length}
          </Text>
        </View>

        {/* --- Next / Start Quiz Button --- */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient colors={["#00C6FF", "#0072FF"]} style={styles.nextGradient}>
            <Text style={styles.nextText}>
              {index === lesson.flashcards.length - 1 ? "Start Quiz" : "Next Card"}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" style={{marginLeft: 10}} />
          </LinearGradient>
        </TouchableOpacity>

      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 70,
    alignItems: 'flex-start',
  },
  circularBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  title: { 
    fontSize: 22, 
    color: "white", 
    fontWeight: "700", 
    marginTop: 20, 
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  cardContainer: {
    marginTop: 10,
  },
  card: {
    width: width * 0.85,
    height: 300,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    borderWidth: 0.1,
    borderColor: "rgba(0, 198, 255, 0.3)",
    // Neumorphic shadow effect
    shadowColor: "#00C6FF",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  cardText: { 
    color: "white", 
    fontSize: 18, 
    textAlign: "center", 
    lineHeight: 28,
    fontWeight: '500'
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  hintText: { 
    color: "#00C6FF", 
    fontSize: 12, 
    fontWeight: '600',
    letterSpacing: 0.5
  },
  progressContainer: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  progressText: { 
    color: 'rgba(255,255,255,0.6)', 
    fontSize: 14,
    fontWeight: 'bold' 
  },
  nextButton: { 
    marginTop: 'auto',
    marginBottom: 100 
  },
  nextGradient: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 30,
    elevation: 5
  },
  nextText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "700" 
  },
});

export default FlashCardScreen;  