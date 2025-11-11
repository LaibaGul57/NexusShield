import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";

const { width } = Dimensions.get("window");

const tips = [
  "Always think before you click — stay alert online!",
  "Strong passwords keep your data safe!",
  "Keep software updated to avoid security risks.",
  "Be cautious while sharing information online.",
  "Recognize phishing attempts — stay aware!",
];

const ScoreScreen = ({ route, navigation }) => {
  const { score, total } = route.params;
  const [tip, setTip] = useState("");
  const wrongAnswers = total - score;
  const percentage = Math.round((score / total) * 100);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      {/* Top Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        
      </View>

      {/* Score Title */}
      <Animatable.Text animation="fadeInDown" duration={800} style={styles.title}>
        Your Score
      </Animatable.Text>

      {/* Circular Progress Score */}
      <Animatable.View animation="zoomIn" duration={1200} style={styles.scoreContainer}>
        <CircularProgress
          value={score}
          maxValue={total}
          radius={90}
          duration={1200}
          progressValueColor="#fff"
          activeStrokeColor="#00e5ff"
          inActiveStrokeColor="#1E3A8A"
          inActiveStrokeOpacity={0.3}
          activeStrokeWidth={14}
          inActiveStrokeWidth={14}
          title={`${score}/${total}`}
          titleColor="#fff"
          titleStyle={{ fontWeight: "700", fontSize: 22 }}
        />
      </Animatable.View>

      {/* Correct/Wrong Details */}
      <View style={styles.statsBox}>
        <Text style={styles.correct}>Correct Answer: {score}</Text>
        <Text style={styles.wrong}>Wrong Answer: {wrongAnswers}</Text>
      </View>

      {/* Tip Section */}
      <Animatable.View animation="fadeInUp" delay={900} style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Cyber Safety Tip:</Text>
        <Text style={styles.tipText}>{tip}</Text>
      </Animatable.View>

      {/* Buttons */}
      <Animatable.View animation="fadeInUp" delay={1200} style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00C6FF" }]}
          onPress={() => navigation.navigate("ReviewQuiz")}
        >
          <Text style={styles.buttonText}>Review Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00FF88" }]}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
  header: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },
  scoreContainer: {
    marginBottom: 20,
  },
  statsBox: {
    alignItems: "center",
    marginBottom: 20,
  },
  correct: {
    color: "#00FF88",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  wrong: {
    color: "#FF5C5C",
    fontSize: 18,
    fontWeight: "600",
  },
  tipBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 16,
    borderRadius: 16,
    width: width * 0.85,
    marginBottom: 30,
  },
  tipTitle: {
    color: "#00C6FF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  tipText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    width: width * 0.7,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ScoreScreen;
