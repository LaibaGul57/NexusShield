// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import * as Animatable from "react-native-animatable";
// import axios from "axios";

// const { width } = Dimensions.get("window");

// const QuizScreen = ({ route, navigation }) => {
//   const { lesson } = route.params || {};
  
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "http://192.168.100.11:8000";

//   useEffect(() => {
//     if (lesson) {
//       const extractedQuestions = lesson.quizzes || [];
//       setQuestions(extractedQuestions);
//     }
//     setLoading(false);
//   }, [lesson]);

//   // --- Auto Redirect Logic ---
//   useEffect(() => {
//     if (showScore) {
//       const timer = setTimeout(() => {
//         navigation.goBack(); // 3 seconds baad wapis Training Screen par
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [showScore]);

//   const handleAnswer = (selectedOption) => {
//     const currentQ = questions[currentIndex];
//     const correctAns = currentQ.correct_answer;
    
//     if (selectedOption === correctAns) {
//       setScore(prev => prev + 1);
//     }

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       setShowScore(true);
//       submitScore();
//     }
//   };

//   const submitScore = async () => {
//     try {
//       await axios.post(`${BASE_URL}/api/save-quiz-result`, {
//         user_id: "user123",
//         score: score,
//         total: questions.length
//       });
//     } catch (e) { console.log("Save failed"); }
//   };

//   if (loading || questions.length === 0) {
//     return (
//       <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//         <ActivityIndicator size="large" color="#00e5ff" />
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <StatusBar barStyle="light-content" />

//         {showScore ? (
//           // --- CHOTA SCORE CARD (AUTO-BACK) ---
//           <View style={styles.modalOverlay}>
//             <Animatable.View animation="fadeInUp" style={styles.smallCard}>
//                <Ionicons name="ribbon" size={40} color="#00e5ff" />
//                <Text style={styles.scoreTitle}>Quiz Score</Text>
//                <Text style={styles.bigScore}>{score} / {questions.length}</Text>
//                 <Text style={styles.redirectText}>Redirecting </Text>
//             </Animatable.View>
//           </View>
//         ) : (
//           <View style={styles.quizWrapper}>
//             {/* Back Arrow for Manual Return */}
//             <View style={styles.header}>
//               <TouchableOpacity style={styles.circularBack} onPress={() => navigation.goBack()}>
//                 <Ionicons name="arrow-back" size={24} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.headerTitle}>Quiz</Text>
//               <View style={{width: 42}} />
//             </View>

//             <View style={styles.qContainer}>
//               <Text style={styles.progressText}>Question {currentIndex + 1} of {questions.length}</Text>
              
//               <Animatable.View animation="fadeInRight" key={currentIndex} style={styles.questionBox}>
//                 <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
//               </Animatable.View>

//               <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
//                 {questions[currentIndex].options.map((option, i) => (
//                   <TouchableOpacity key={i} style={styles.optionBtn} onPress={() => handleAnswer(option)}>
//                     <Text style={styles.optionText}>{option}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>
//         )}
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  
//   // Chota Score Card
//   smallCard: { 
//     width: 220, 
//     padding: 30, 
//     backgroundColor: 'rgba(255,255,255,0.1)', 
//     borderRadius: 25, 
//     alignItems: 'center', 
//     borderWidth: 1, 
//     borderColor: 'rgba(0, 229, 255, 0.4)' 
//   },
//   scoreTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 },
//   bigScore: { color: '#00e5ff', fontSize: 42, fontWeight: 'bold', marginVertical: 5 },
//   redirectText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 10 },

//   quizWrapper: { flex: 1 },
//   header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
//   circularBack: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
//   headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

//   qContainer: { flex: 1, padding: 20 },
//   progressText: { color: '#00e5ff', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
//   questionBox: { backgroundColor: 'rgba(255,255,255,0.08)', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
//   questionText: { color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 26 },
  
//   optionBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 18, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
//   optionText: { color: '#fff', fontSize: 16, textAlign: 'center' }
// });

// export default QuizScreen;
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import axios from "axios";

const { width } = Dimensions.get("window");

const QuizScreen = ({ route, navigation }) => {
  const { lesson } = route.params || {};
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.100.11:8000";

  useEffect(() => {
    if (lesson) {
      const extractedQuestions = lesson.quizzes || [];
      setQuestions(extractedQuestions);
    }
    setLoading(false);
  }, [lesson]);

  // --- Auto Redirect Logic ---
  useEffect(() => {
    if (showScore) {
      const timer = setTimeout(() => {
        // change 2: flashcard screen skip karke training/topics screen par jane ke liye
        navigation.pop(2); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showScore]);

  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentIndex];
    const correctAns = currentQ.correct_answer;
    
    if (selectedOption === correctAns) {
      setScore(prev => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowScore(true);
      submitScore();
    }
  };

  const submitScore = async () => {
    try {
      await axios.post(`${BASE_URL}/api/save-quiz-result`, {
        user_id: "user123",
        score: score,
        total: questions.length
      });
    } catch (e) { console.log("Save failed"); }
  };

  if (loading || questions.length === 0) {
    return (
      <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
        <ActivityIndicator size="large" color="#00e5ff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        {showScore ? (
          <View style={styles.modalOverlay}>
            <Animatable.View animation="fadeInUp" style={styles.smallCard}>
               <Ionicons name="ribbon" size={40} color="#00e5ff" />
               <Text style={styles.scoreTitle}>Quiz Score</Text>
               <Text style={styles.bigScore}>{score} / {questions.length}</Text>
                <Text style={styles.redirectText}>Redirecting </Text>
            </Animatable.View>
          </View>
        ) : (
          <View style={styles.quizWrapper}>
            {/* change 1: Header padding barha di taake arrow niche aye */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.circularBack} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Quiz</Text>
              <View style={{width: 42}} />
            </View>

            <View style={styles.qContainer}>
              <Text style={styles.progressText}>Question {currentIndex + 1} of {questions.length}</Text>
              
              <Animatable.View animation="fadeInRight" key={currentIndex} style={styles.questionBox}>
                <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
              </Animatable.View>

              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                {questions[currentIndex].options.map((option, i) => (
                  <TouchableOpacity key={i} style={styles.optionBtn} onPress={() => handleAnswer(option)}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)' },
  smallCard: { 
    width: 220, 
    padding: 30, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 25, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(0, 229, 255, 0.4)' 
  },
  scoreTitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 'bold', marginTop: 10, letterSpacing: 1 },
  bigScore: { color: '#00e5ff', fontSize: 42, fontWeight: 'bold', marginVertical: 5 },
  redirectText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 10 },

  quizWrapper: { flex: 1 },
  // Header ki padding adjust ki
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 70, paddingBottom: 10 },
  circularBack: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  qContainer: { flex: 1, padding: 20 },
  progressText: { color: '#00e5ff', textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  questionBox: { backgroundColor: 'rgba(255,255,255,0.08)', padding: 25, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.2)' },
  questionText: { color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 26 },
  
  optionBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 18, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  optionText: { color: '#fff', fontSize: 16, textAlign: 'center' }
});

export default QuizScreen;