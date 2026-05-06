

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import * as Animatable from "react-native-animatable";
// import axios from "axios";

// // ✅ Backend URL
// const BASE_URL = Platform.OS === "web" 
//   ? "http://localhost:8000" 
//   : "http://192.168.100.11:8000";
// const TrainingLessonScreen = ({ navigation }) => {
//   const [level, setLevel] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [activeData, setActiveData] = useState(null); 
//   const [cardIndex, setCardIndex] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [quizIndex, setQuizIndex] = useState(0);
//   const [score, setScore] = useState(0);

//   // ✅ States for Quiz Feedback
//   const [selectedOption, setSelectedOption] = useState(null);

//   const HARDCODED_TOPICS = {
//     1: ["Phishing Awareness", "Password Security", "Public WiFi Risks", "Social Engineering", "Two-Factor Authentication", "Safe Browsing", "Mobile App Permissions", "Physical Security"],
//     2: ["SQL Injection", "Cross-Site Scripting (XSS)", "Man-in-the-Middle", "Network Firewalls", "VPN Technology", "Encryption Basics", "Brute Force Attacks", "Malware Types"],
//     3: ["Zero-Day Vulnerabilities", "Ransomware Defense", "Cloud Security", "Incident Response", "Penetration Testing", "Ethical Hacking", "Digital Forensics", "Dark Web Monitoring"]
//   };

//   const handleTopicPress = async (topicTitle) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/get-content`, {
//         params: { topic: topicTitle, level: level }
//       });
//       if (res.data && res.data.flashcards && res.data.flashcards.length > 0) {
//         setCardIndex(0);
//         setQuizIndex(0);
//         setScore(0);
//         setShowQuiz(false);
//         setSelectedOption(null);
//         setActiveData(res.data);
//       } else {
//         Alert.alert("Data Not Found", `Level ${level} par '${topicTitle}' nahi mila.`);
//       }
//     } catch (err) {
//       Alert.alert("Error", "Server connection failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Correct Feedback Logic with Real-time Save
//   const handleAnswer = async (selected, correct) => {
//     if (selectedOption !== null) return; 

//     setSelectedOption(selected);
//     let newScore = score;
//     if (selected === correct) newScore = score + 1;
//     setScore(newScore);

//     // 1.2 seconds wait to show colors clearly, then move
//     setTimeout(async () => {
//       if (quizIndex < activeData.quizzes.length - 1) {
//         setQuizIndex(quizIndex + 1);
//         setSelectedOption(null);
//       } else {
//         // --- REAL-TIME SAVE TO MONGODB ---
//         try {
//           await axios.post(`${BASE_URL}/api/save-quiz-result`, {
//             user_id: "Laiba Gul", 
//             score: newScore,
//             total: activeData.quizzes.length
//           });
//           Alert.alert("Quiz Finished!", `Score: ${newScore}/${activeData.quizzes.length}\nProgress Updated!`);
//         } catch (err) {
//           console.error("Save Error:", err);
//         }
//         setActiveData(null);
//         setSelectedOption(null);
//       }
//     }, 1200);
//   };

//   if (loading) {
//     return (
//       <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//         <ActivityIndicator size="large" color="#00C6FF" />
//       </LinearGradient>
//     );
//   }

//   if (activeData) {
//     return (
//       <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//         <TouchableOpacity style={styles.backButtonTop} onPress={() => setActiveData(null)}>
//           <Ionicons name="close" size={28} color="#fff" />
//         </TouchableOpacity>

//         {!showQuiz ? (
//           <Animatable.View animation="fadeInRight" style={styles.centerContent}>
//             <Text style={styles.topicHeader}>{activeData.title}</Text>
//             <View style={styles.flashcard}>
//               <Text style={styles.cardQ}>{activeData.flashcards[cardIndex]?.question}</Text>
//               <View style={styles.line} />
//               <Text style={styles.cardA}>{activeData.flashcards[cardIndex]?.answer}</Text>
//             </View>
//             <TouchableOpacity style={styles.nextBtn} onPress={() => cardIndex < activeData.flashcards.length - 1 ? setCardIndex(cardIndex + 1) : setShowQuiz(true)}>
//               <Text style={styles.nextBtnText}>{cardIndex < activeData.flashcards.length - 1 ? "Next Card" : "Go to Quiz"}</Text>
//             </TouchableOpacity>
//           </Animatable.View>
//         ) : (
//           <Animatable.View animation="fadeInUp" style={styles.centerContent}>
//             <Text style={styles.topicHeader}>Question {quizIndex + 1}</Text>
//             <Text style={styles.quizQ}>{activeData.quizzes[quizIndex]?.question}</Text>
            
//             {activeData.quizzes[quizIndex]?.options?.map((opt, i) => {
//               const labels = ["A", "B", "C", "D"];
//               const correctAns = activeData.quizzes[quizIndex].correct_answer;
              
//               // ✅ FIX: Enhanced Color Logic
//               let btnStyle = styles.optBtn;
//               if (selectedOption !== null) {
//                 if (opt === correctAns) {
//                   btnStyle = styles.correctBtn; // Right answer is always Green
//                 } else if (opt === selectedOption && opt !== correctAns) {
//                   btnStyle = styles.wrongBtn; // Wrong selected option is Red
//                 }
//               }

//               return (
//                 <TouchableOpacity 
//                   key={i} 
//                   style={btnStyle} 
//                   onPress={() => handleAnswer(opt, correctAns)}
//                   disabled={selectedOption !== null}
//                 >
//                   <Text style={styles.optText}>
//                     <Text style={{fontWeight: 'bold'}}>{labels[i]}: </Text>{opt}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </Animatable.View>
//         )}
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButtonHome} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Training - Level {level}</Text>
//       </View>
      
//       <FlatList
//         data={HARDCODED_TOPICS[level]}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.lessonBox} onPress={() => handleTopicPress(item)}>
//             <Ionicons name="shield-checkmark-outline" size={22} color="#00C6FF" style={{marginRight: 10}} />
//             <Text style={styles.lessonText}>{item}</Text>
//             <Ionicons name="chevron-forward" size={18} color="#00C6FF" style={{marginLeft: 'auto'}} />
//           </TouchableOpacity>
//         )}
//       />
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navBtn} onPress={() => level > 1 && setLevel(level - 1)}><Text style={styles.navText}>Prev</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.navBtn} onPress={() => level < 3 && setLevel(level + 1)}><Text style={styles.navText}>Next</Text></TouchableOpacity>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, paddingTop: 60 },
//   header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   backButtonHome: { width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.15)", justifyContent: "center", alignItems: "center", borderRadius: 10, marginRight: 10 },
//   headerText: { color: "#fff", fontSize: 22, fontWeight: "700" },
//   centerContent: { flex: 1, justifyContent: 'center' },
//   backButtonTop: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
//   lessonBox: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 18, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
//   lessonText: { color: '#fff', fontSize: 17 },
//   flashcard: { backgroundColor: '#fff', padding: 25, borderRadius: 25, minHeight: 320, justifyContent: 'center', elevation: 10 },
//   topicHeader: { color: '#00C6FF', fontSize: 22, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
//   cardQ: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#111' },
//   cardA: { fontSize: 17, color: '#444', textAlign: 'center', marginTop: 15 },
//   line: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
//   nextBtn: { backgroundColor: '#00C6FF', padding: 18, borderRadius: 15, marginTop: 25 },
//   nextBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
//   quizQ: { color: '#fff', fontSize: 22, marginBottom: 25, textAlign: 'center' },
//   optBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
//   correctBtn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#27ae60' },
//   wrongBtn: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#c0392b' },
//   optText: { color: '#fff', fontSize: 17 },
//   bottomNav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 15 },
//   navBtn: { backgroundColor: '#00C6FF', padding: 12, borderRadius: 8, width: 90, alignItems: 'center' },
//   navText: { color: '#fff', fontWeight: 'bold' }
// });

// export default TrainingLessonScreen;
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

// ✅ Updated Backend URL with your correct IP
const BASE_URL = Platform.OS === "web" 
  ? "http://localhost:8000" 
  : "http://192.168.100.11:8000";

const TrainingLessonScreen = ({ navigation }) => {
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(false);

  const HARDCODED_TOPICS = {
    1: ["Phishing Awareness", "Password Security", "Public WiFi Risks", "Social Engineering", "Two-Factor Authentication", "Safe Browsing", "Mobile App Permissions", "Physical Security"],
    2: ["SQL Injection", "Cross-Site Scripting (XSS)", "Man-in-the-Middle", "Network Firewalls", "VPN Technology", "Encryption Basics", "Brute Force Attacks", "Malware Types"],
    3: ["Zero-Day Vulnerabilities", "Ransomware Defense", "Cloud Security", "Incident Response", "Penetration Testing", "Ethical Hacking", "Digital Forensics", "Dark Web Monitoring"]
  };

  const handleTopicPress = async (topicTitle) => {
    setLoading(true);
    try {
      // ✅ Fetching data from backend
      const res = await axios.get(`${BASE_URL}/get-content`, {
        params: { topic: topicTitle, level: level }
      });

      if (res.data && res.data.flashcards && res.data.flashcards.length > 0) {
        // ✅ Navigating to FlashCard screen with the data
        navigation.navigate("FlashCard", { 
          lesson: res.data, 
          topic: topicTitle, 
          level: level 
        });
      } else {
        Alert.alert("Data Not Found", `Level ${level} par '${topicTitle}' nahi mila.`);
      }
    } catch (err) {
      console.log("Fetch Error:", err);
      Alert.alert("Error", "Server connection failed! Make sure your FastAPI server is running.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
        <ActivityIndicator size="large" color="#00C6FF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonHome} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Training - Lesson {level}</Text>
      </View>
      
      <FlatList
        data={HARDCODED_TOPICS[level]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.lessonBox} onPress={() => handleTopicPress(item)}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#00C6FF" style={{marginRight: 10}} />
            <Text style={styles.lessonText}>{item}</Text>
            <Ionicons name="chevron-forward" size={18} color="#00C6FF" style={{marginLeft: 'auto'}} />
          </TouchableOpacity>
        )}
      />

      {/* Bottom Level Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navBtn, level === 1 && { opacity: 0.5 }]} 
          onPress={() => level > 1 && setLevel(level - 1)}
          disabled={level === 1}
        >
          <Text style={styles.navText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navBtn, level === 3 && { opacity: 0.5 }]} 
          onPress={() => level < 3 && setLevel(level + 1)}
          disabled={level === 3}
        >
          <Text style={styles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButtonHome: { 
    width: 40, 
    height: 40, 
    backgroundColor: "rgba(255,255,255,0.15)", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10, 
    marginRight: 10 
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "700" },
  lessonBox: { 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  lessonText: { color: '#fff', fontSize: 17 },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 15, 
    marginBottom: 15 
  },
  navBtn: { 
    backgroundColor: '#00C6FF', 
    padding: 12, 
    borderRadius: 8, 
    width: 90, 
    alignItems: 'center', 
    marginBottom: 35,
  },
  navText: { color: '#fff', fontWeight: 'bold' }
});

export default TrainingLessonScreen;