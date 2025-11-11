import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const ProgressReportScreen = ({ navigation }) => {
  // ✅ 1️⃣ useState
  const [dailyData, setDailyData] = useState({
    date: new Date().toLocaleDateString(),
    lessonsCompleted: 0,
    quizzesAttempted: 0,
    quizScore: 0,
    nudgesReceived: 0,
  });

  // ✅ 2️⃣ useEffect (fetch progress data)
  useEffect(() => {
    const userId = "Laiba Gul"; // 🔁 Replace with actual user ID later
    fetch(`http://127.0.0.1:8000/progress/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No progress data found");
        return res.json();
      })
      .then((data) => {
        setDailyData({
          date: new Date().toLocaleDateString(),
          lessonsCompleted: data.lessonsCompleted || 0,
          quizzesAttempted: data.quizzesAttempted || 0,
          quizScore: data.quizScore || 0,
          nudgesReceived: data.nudgesReceived || 0,
        });
      })
      .catch((err) => {
        console.error("Error fetching progress:", err);
      });
  }, []);

  // Overall performance chart
  const chartData = [
    {
      name: "Lessons",
      population: 80,
      color: "#00E5FF",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Quizzes",
      population: 65,
      color: "#4CAF50",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Awareness",
      population: 70,
      color: "#FF9800",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
  ];

  // AI-like behavior feedback
  let behaviorMessage = "";
  if (dailyData.quizScore >= 80 && dailyData.nudgesReceived === 0) {
    behaviorMessage = "Excellent! You’re showing great awareness and progress 👏";
  } else if (dailyData.quizScore >= 50 && dailyData.nudgesReceived <= 2) {
    behaviorMessage = "Good job today! Keep improving your attention 💪";
  } else {
    behaviorMessage = "Be cautious — review your lessons again ⚠️";
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Progress Report</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Date */}
        <Text style={styles.dateText}>📅 {dailyData.date}</Text>

        {/* Daily Summary Card */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Today's Activity Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Lessons Completed:</Text>
            <Text style={styles.value}>{dailyData.lessonsCompleted}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Quizzes Attempted:</Text>
            <Text style={styles.value}>{dailyData.quizzesAttempted}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Quiz Score:</Text>
            <Text style={[styles.value, { color: "#ffd900da" }]}>{dailyData.quizScore}%</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Nudges Received:</Text>
            <Text
              style={[
                styles.value,
                { color: dailyData.nudgesReceived > 0 ? "#FF5252" : "#4CAF50" },
              ]}
            >
              {dailyData.nudgesReceived}
            </Text>
          </View>
        </View>

        {/* Chart */}
        <Text style={styles.chartTitle}>Overall Performance</Text>
        <PieChart
          data={chartData}
          width={screenWidth - 20}
          height={220}
          chartConfig={{
            backgroundColor: "#000428",
            backgroundGradientFrom: "#000428",
            backgroundGradientTo: "#004e92",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          hasLegend={true}
          absolute
        />

        {/* AI Behavior Message */}
        <View style={styles.messageBox}>
          <Ionicons name="information-circle" size={24} color="#FFD700" />
          <Text style={styles.behaviorText}>{behaviorMessage}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProgressReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 15,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  dateText: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 15,
    textAlign: "center",
  },
  summaryBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    color: "#ffffffff",
    fontSize: 16,
  },
  value: {
    color: "#11d82fff",
    fontWeight: "600",
    fontSize: 16,
  },
  chartTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },
  messageBox: {
    backgroundColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    marginTop: 25,
  },
  behaviorText: {
    color: "#FFD700",
    fontSize: 15,
    marginLeft: 10,
    flexShrink: 1,
  },
});
