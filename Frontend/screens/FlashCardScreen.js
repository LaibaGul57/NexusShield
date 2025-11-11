

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import * as Animatable from "react-native-animatable";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";

// const { width } = Dimensions.get("window");

// const FlashCardScreen = ({ route, navigation }) => {
//   const { topic, level } = route.params;   // ✅ topic + level coming from previous screen
//   const [lesson, setLesson] = useState(null);
//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);

//   const user_id = "user123";

//   useEffect(() => {
//     const fetchFlashcards = async () => {
//       try {
//        const res = await axios.get(`http://127.0.0.1:8000/flashcard/flashcards/${level}/${topic}?user_id=${user_id}`);
// setLesson(res.data);


//         setLesson(res.data); // ✅ lesson = { topic, level, flashcards: [...] }
//         console.log("Flashcards Loaded:", res.data.flashcards);
//       } catch (error) {
//         console.log("❌ Error fetching flashcards:", error);
//       }
//     };

//     fetchFlashcards();
//   }, []);

//   const handleNext = () => {
//     setFlipped(false);
//     if (index < (lesson?.flashcards?.length || 0) - 1) {
//       setIndex(index + 1);
//     } else {
//       navigation.navigate("Quiz", { lesson });
//     }
//   };

//   if (!lesson || !lesson.flashcards || lesson.flashcards.length === 0) {
//     return (
//       <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
//         <Text style={{ color: "#fff", fontSize: 20, marginTop: 100 }}>
//           No flashcards available for this topic.
//         </Text>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>

//       {/* Back */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={26} color="#fff" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>{lesson.topic}</Text>

//       {/* Flashcard */}
//       <TouchableOpacity onPress={() => setFlipped(!flipped)}>
//         <Animatable.View
//           animation="flipInY"
//           duration={600}
//           style={styles.card}
//           key={flipped ? "back" : "front"}
//         >
//           <Text style={styles.cardText}>
//             {flipped ? lesson.flashcards[index].answer : lesson.flashcards[index].question}
//           </Text>
//         </Animatable.View>
//       </TouchableOpacity>

//       {/* Next */}
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <LinearGradient colors={["#00C6FF", "#0072FF"]} style={styles.nextGradient}>
//           <Text style={styles.nextText}>
//             {index === lesson.flashcards.length - 1 ? "Start Quiz" : "Next Card"}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 70, alignItems: "center" },
//   backButton: {
//     position: "absolute",
//     top: 50,
//     left: 20,
//     backgroundColor: "rgba(255,255,255,0.15)",
//     padding: 8,
//     borderRadius: 50,
//   },
//   title: { fontSize: 24, color: "white", fontWeight: "700", marginBottom: 40 },
//   card: {
//     width: width * 0.85,
//     height: 250,
//     backgroundColor: "rgba(255,255,255,0.15)",
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     shadowColor: "#00C6FF",
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//   },
//   cardText: { color: "white", fontSize: 18, textAlign: "center", lineHeight: 26 },
//   nextButton: { marginTop: 50 },
//   nextGradient: { paddingVertical: 12, paddingHorizontal: 60, borderRadius: 30 },
//   nextText: { color: "white", fontSize: 18, fontWeight: "600" },
// });

// export default FlashCardScreen;


import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width } = Dimensions.get("window");

const FlashCardScreen = ({ route, navigation }) => {
  const { topic, level } = route.params;   // ✅ topic + level coming from previous screen
  const [lesson, setLesson] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const user_id = "user123";

 useEffect(() => {
  const fetchFlashcards = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/flashcard/flashcards/${level}/${topic}?user_id=${user_id}`
      );
        
        console.log("🔥 Flashcards Loaded:", res.data.flashcards);
res.data.flashcards.forEach(fc => console.log(fc.question, fc.answer));
setLesson(res.data);
// lesson = { topic, level, flashcards: [...] }
    } catch (error) {
      console.log("❌ Error fetching flashcards:", error);
    }
  };

  fetchFlashcards();
}, []);

  const handleNext = () => {
    setFlipped(false);
    if (index < (lesson?.flashcards?.length || 0) - 1) {
      setIndex(index + 1);
    } else {
      navigation.navigate("Quiz", { lesson });
    }
  };

  if (!lesson || !lesson.flashcards || lesson.flashcards.length === 0) {
    return (
      <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
        <Text style={{ color: "#fff", fontSize: 20, marginTop: 100 }}>
          No flashcards available for this topic.
        </Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>

      {/* Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{lesson.topic}</Text>

      {/* Flashcard */}
      {/* <TouchableOpacity onPress={() => setFlipped(!flipped)}>
        <Animatable.View
          animation="flipInY"
          duration={600}
          style={styles.card}
          key={flipped ? "back" : "front"}
        >
         <Text style={styles.cardText}>
  {flipped 
    ? lesson.flashcards[index].answer 
    : lesson.flashcards[index].question
  }
</Text>

        </Animatable.View>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => {
  console.log("Flipping card:", index);
  setFlipped(!flipped);
}}>
  <Animatable.View
    animation="flipInY"
    duration={600}
    style={styles.card}
    key={index + (flipped ? "-back" : "-front")}
  >
    <Text style={styles.cardText}>
      {flipped 
        ? lesson.flashcards[index].answer 
        : lesson.flashcards[index].question
      }
    </Text>
  </Animatable.View>
</TouchableOpacity>

      {/* Next */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <LinearGradient colors={["#00C6FF", "#0072FF"]} style={styles.nextGradient}>
          <Text style={styles.nextText}>
            {index === lesson.flashcards.length - 1 ? "Start Quiz" : "Next Card"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70, alignItems: "center" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 50,
  },
  title: { fontSize: 24, color: "white", fontWeight: "700", marginBottom: 40 },
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
  cardText: { color: "white", fontSize: 18, textAlign: "center", lineHeight: 26 },
  nextButton: { marginTop: 50 },
  nextGradient: { paddingVertical: 12, paddingHorizontal: 60, borderRadius: 30 },
  nextText: { color: "white", fontSize: 18, fontWeight: "600" },
});

export default FlashCardScreen;
