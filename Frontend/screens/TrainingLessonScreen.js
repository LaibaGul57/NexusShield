// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import * as Animatable from "react-native-animatable";
// import axios from "axios";

// const TrainingLessonScreen = ({ navigation }) => {
//   const [lessons, setLessons] = useState([]);
//   const [level, setLevel] = useState(1);
//   const [loading, setLoading] = useState(false);

  
// const fetchLessons = async (level) => {
//   setLoading(true);
//   try {
//     const res = await axios.get(`http://localhost:8000/api/lessons?level=${level}&limit=10`);
//     setLessons(res.data); // ab sirf 10 topics aayenge
//   } catch (err) {
//     console.log("Error fetching lessons:", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     fetchLessons(level);
//   }, [level]);

//   const handleNextLevel = () => {
//     if (level < 3) {
//       setLevel(level + 1); // next level fetch karega automatically useEffect se
//     }
//   };

//   return (
//     <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("MainTabs")}>
//         <Ionicons name="arrow-back" size={26} color="#fff" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Animatable.Text animation="fadeInDown" style={styles.title}>
//         Level {level} Lessons
//       </Animatable.Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#00C6FF" style={{ marginTop: 50 }} />
//       ) : (
//         <FlatList
//           data={lessons}
//           keyExtractor={(item) => item.topic_id}
//           renderItem={({ item, index }) => (
//             <Animatable.View animation="fadeInUp" delay={index * 100}>
//               <TouchableOpacity
//                 style={styles.lessonBox}
//                 onPress={() => navigation.navigate("FlashCard", { lesson: item })}
//                 activeOpacity={0.8}
//               >
//                 <Ionicons name="book-outline" size={26} color="#00C6FF" style={styles.icon} />
//                 <Text style={styles.lessonText}>{item.title}</Text>
//                 <Ionicons name="chevron-forward" size={20} color="#B0C4DE" />
//               </TouchableOpacity>
//             </Animatable.View>
//           )}
//         />
//       )}

//       {/* Next Level Button */}
//       {level < 3 && (
//         <TouchableOpacity style={styles.nextButton} onPress={handleNextLevel}>
//           <Text style={styles.nextText}>Next Level →</Text>
//         </TouchableOpacity>
//       )}
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },
//   backButton: { position: "absolute", top: 50, left: 20, backgroundColor: "rgba(255,255,255,0.1)", padding: 8, borderRadius: 50, zIndex: 10 },
//   title: { fontSize: 28, fontWeight: "700", textAlign: "center", color: "#E0FFFF", marginBottom: 25, letterSpacing: 1 },
//   lessonBox: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.15)", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, marginBottom: 12, shadowColor: "#00C6FF", shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
//   icon: { marginRight: 15 },
//   lessonText: { flex: 1, color: "#FFFFFF", fontSize: 16, fontWeight: "500", letterSpacing: 0.5 },
//   nextButton: { position: "absolute", right: 20, bottom: 40, backgroundColor: "#00C6FF", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, elevation: 5 },
//   nextText: { color: "#fff", fontWeight: "700", fontSize: 16 },
// });

// export default TrainingLessonScreen;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import axios from "axios";


const BASE_URL = "http://localhost:8000/flashcard";  // already correct

const USER_ID = "user123"; // ✅ Replace with login user_id

const TrainingLessonScreen = ({ navigation }) => {
  const [topics, setTopics] = useState([]);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch topics for a level
  const fetchTopics = async (level) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/topics/${level}?user_id=${USER_ID}`);

      // ✅ Only 10 topics
      setTopics(res.data.topics.slice(0, 10));
    } catch (err) {
      console.log("❌ Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics(level);
  }, [level]);

  // ✅ Topic press → fetch flashcards → go to FlashCard screen
  const handleTopicPress = async (topicTitle) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/flashcards/${level}/${topicTitle}?user_id=${USER_ID}`
      );

      navigation.navigate("FlashCard", {
        topic: topicTitle,
        level: level,
        flashcards: res.data.flashcards,
      });
    } catch (err) {
      console.log("❌ Error fetching flashcards:", err);
    }
  };

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MainTabs")}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Level {level} Topics
      </Animatable.Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00C6FF" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={topics}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <Animatable.View animation="fadeInUp" delay={index * 100}>
              <TouchableOpacity
                style={styles.lessonBox}
                onPress={() => handleTopicPress(item.title)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="book-outline"
                  size={26}
                  color="#00C6FF"
                  style={styles.icon}
                />
                <Text style={styles.lessonText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#B0C4DE" />
              </TouchableOpacity>
            </Animatable.View>
          )}
        />
      )}

      {/* Next Level Button */}
      {level < 3 && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setLevel(level + 1)}
        >
          <Text style={styles.nextText}>Next Level →</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, paddingHorizontal: 20 },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 50,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#E0FFFF",
    marginBottom: 25,
    letterSpacing: 1,
  },
  lessonBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#00C6FF",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: { marginRight: 15 },
  lessonText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  nextButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#00C6FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  nextText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default TrainingLessonScreen;
