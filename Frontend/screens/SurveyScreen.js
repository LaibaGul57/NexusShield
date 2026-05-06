// import React, { useState } from 'react';
// import {
//   View, Text, TouchableOpacity, ScrollView,
//   StyleSheet, SafeAreaView, StatusBar, Alert, Platform
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Aapki existing mapping
// const CATEGORY_MAP = {
//   "T1": "Password Security", "T2": "Device Security", "T3": "Physical Security",
//   "T4": "Network Security", "T5": "Password Security", "T6": "Password Security",
//   "T7": "Software Updates", "T8": "Malware Protection", "S1": "App Security",
//   "S2": "Phishing & Online Safety", "S3": "Web Security", "S4": "Phishing",
//   "S5": "Phishing", "S6": "Device Security"
// };

// const OPTIONS = [
//   { label: 'Never', value: 1 }, { label: 'Rarely', value: 2 },
//   { label: 'Sometimes', value: 3 }, { label: 'Often', value: 4 },
//   { label: 'Always', value: 5 },
// ];

// const QUESTIONS = [
//   { id: 'T1', text: 'I change my passcode/PIN for my smartphone’s screen lock on a regular basis.' },
//   { id: 'T2', text: 'I have enabled my computer and mobile screen to automatically lock when not in use.' },
//   { id: 'T3', text: 'I manually cover my smartphone’s screen when using it in a public area.' },
//   { id: 'T4', text: 'I use Safe Browsing Habits whenever I am connected to a public Wi-Fi network.' },
//   { id: 'T5', text: 'I include special characters in my passwords even if not mandatory.' },
//   { id: 'T6', text: 'I use different and unique passwords for every online account.' },
//   { id: 'T7', text: 'I install software and app updates immediately for security patches.' },
//   { id: 'T8', text: 'I use an anti-virus application and verify it is updating.' },
//   { id: 'S1', text: 'I check that an app is from the official source before downloading it.' },
//   { id: 'S2', text: 'I verify the website by looking at the URL bar.' },
//   { id: 'S3', text: 'I verify that information is sent securely (https://) before submitting.' },
//   { id: 'S4', text: 'I immediately delete any online communications that look suspicious.' },
//   { id: 'S5', text: 'I verify the identity of the sender before sharing sensitive info.' },
//   { id: 'S6', text: 'I pay attention to pop-ups when connecting to another device.' },
// ];

// export default function SurveyScreen({ navigation, route }) {
  
  
//   const { userId } = route.params;
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(false);
  
//     const BASE_URL =
//     Platform.OS === "web"
//       ? "http://localhost:8000"
//       : "http://192.168.100.11:8000"; 
  
//   const answeredCount = Object.keys(answers).length;

//   const selectOption = (questionId, value) => {
//     setAnswers(prev => ({ ...prev, [questionId]: value }));
//   };

//   const submitSurvey = async () => {
//     if (answeredCount < 14) {
//       Alert.alert('Incomplete', 'Please answer all 14 questions.');
//       return;
//     }

//     // Backend ke hisab se data prepare kar raha hoon
//     const answersArray = [];
//     const category_scores = {};
//     let total_score = 0;

//     QUESTIONS.forEach(q => {
//       const score = answers[q.id];
//       const category = CATEGORY_MAP[q.id];

//       answersArray.push({
//         questionId: q.id,
//         category: category,
//         score: score
//       });

//       category_scores[category] = (category_scores[category] || 0) + score;
//       total_score += score;
//     });

//     setLoading(true);
//     try {
//       // ✅ Ab ye backend ke exactly mutabiq data bhejega
//       const res = await axios.post(`${BASE_URL}/survey`, { 
//         userId, 
//         answers: answersArray, 
//         category_scores,
//         total_score,
//         created_at: new Date().toISOString().split('T')[0]
//       });

//       await AsyncStorage.setItem('userLevel', String(res.data.level));
//       await AsyncStorage.setItem('surveyDone', 'true');
//       navigation.replace('Result', { score: res.data.percentage, level: res.data.level });
//     } catch (e) {
//       console.error(e);
//       Alert.alert('Error', 'Could not save survey.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ... (Baqi return UI aur styles aapke wahi purane hain)
//   return (
//     <SafeAreaView style={styles.safe}>
//         <StatusBar barStyle="light-content" />
//         <View style={styles.header}>
//             <Text style={styles.headerTitle}>CYBER ASSESSMENT</Text>
//             <View style={styles.counterBadge}>
//                 <Text style={styles.counterText}>{answeredCount} / 14</Text>
//             </View>
//         </View>
//         <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
//             {QUESTIONS.map((q, i) => (
//                 <View key={q.id} style={styles.questionCard}>
//                     <Text style={styles.categoryText}>QUESTION {i + 1}</Text>
//                     <Text style={styles.questionText}>{q.text}</Text>
//                     <View style={styles.optionsList}>
//                         {OPTIONS.map((opt) => {
//                             const selected = answers[q.id] === opt.value;
//                             return (
//                                 <TouchableOpacity
//                                     key={opt.value}
//                                     style={[styles.optionRow, selected && styles.optionRowSelected]}
//                                     onPress={() => selectOption(q.id, opt.value)}
//                                 >
//                                     <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
//                                         {selected && <View style={styles.radioDot} />}
//                                     </View>
//                                     <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
//                                         {opt.label}
//                                     </Text>
//                                 </TouchableOpacity>
//                             );
//                         })}
//                     </View>
//                 </View>
//             ))}
//         </ScrollView>
//         <View style={styles.footer}>
//             <TouchableOpacity
//                 style={[styles.submitBtn, answeredCount < 14 && styles.submitBtnDisabled]}
//                 onPress={submitSurvey}
//                 disabled={answeredCount < 14 || loading}
//             >
//                 <Text style={[styles.submitBtnText, answeredCount < 14 && styles.submitBtnTextDisabled]}>
//                     {loading ? 'ANALYZING...' : 'SUBMIT ASSESSMENT'}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     </SafeAreaView>
//   );
// }

// // ... Styles wahi raheinge
// const styles = StyleSheet.create({
//     safe: { flex: 1, backgroundColor: '#001F3F' },
//     header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: Platform.OS === 'ios' ? 20 : 50 },
//     headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 1 },
//     counterBadge: { backgroundColor: 'rgba(0, 229, 255, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
//     counterText: { fontSize: 13, fontWeight: '600', color: '#00e5ff' },
//     scroll: { flex: 1 },
//     scrollContent: { padding: 16 },
//     questionCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
//     categoryText: { fontSize: 11, fontWeight: 'bold', color: '#00e5ff', marginBottom: 10, letterSpacing: 1.5 },
//     questionText: { fontSize: 16, color: '#fff', lineHeight: 24, marginBottom: 20, fontWeight: '500' },
//     optionsList: { gap: 10 },
//     optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'transparent' },
//     optionRowSelected: { borderColor: 'rgba(0, 229, 255, 0.5)', backgroundColor: 'rgba(0,229,255,0.1)' },
//     radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
//     radioCircleSelected: { borderColor: '#00e5ff' },
//     radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00e5ff' },
//     optionLabel: { fontSize: 15, color: '#ccc' },
//     optionLabelSelected: { color: '#fff', fontWeight: 'bold' },
//     footer: { padding: 20, paddingBottom: 35 },
//     submitBtn: { backgroundColor: '#00e5ff', borderRadius: 15, paddingVertical: 18, alignItems: 'center', shadowColor: '#00e5ff', shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
//     submitBtnDisabled: { backgroundColor: '#001A35', shadowOpacity: 0, borderWidth: 1.5, borderColor: 'rgba(0, 229, 255, 0.4)' },
//     submitBtnText: { color: '#001F3F', fontWeight: '900', fontSize: 16, letterSpacing: 1.5 },
//     submitBtnTextDisabled: { color: 'rgba(0, 229, 255, 0.7)', fontWeight: '700' },
// });
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Alert, Platform
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ EXACT CATEGORY_MAP as per your request
const CATEGORY_MAP = {
  "T1": "Password Security", "T2": "Device Security", "T3": "Physical Security",
  "T4": "Network Security", "T5": "Password Security", "T6": "Password Security",
  "T7": "Software Updates", "T8": "Malware Protection", "S1": "App Security",
  "S2": "Phishing", "S3": "Web Security", "S4": "Phishing",
  "S5": "Phishing", "S6": "Device Security"
};

const OPTIONS = [
  { label: 'Never', value: 1 }, { label: 'Rarely', value: 2 },
  { label: 'Sometimes', value: 3 }, { label: 'Often', value: 4 },
  { label: 'Always', value: 5 },
];

const QUESTIONS = [
  { id: 'T1', text: 'I use complex passwords with a mix of letters, numbers, and symbols.' },
  { id: 'T2', text: 'I lock my devices with a PIN, password, or biometrics every time.' },
  { id: 'T3', text: 'I protect my screen from shoulder surfing and never leave devices unattended.' },
  { id: 'T4', text: 'I avoid using public Wi-Fi for banking or sensitive logins.' },
  { id: 'T5', text: 'I avoid using the same password for multiple online accounts.' },
  { id: 'T6', text: 'I use a password manager to store and generate strong passwords.' },
  { id: 'T7', text: 'I install software and OS updates as soon as they are available.' },
  { id: 'T8', text: 'I use reputable antivirus software and perform regular scans.' },
  { id: 'S1', text: 'I only download apps from official stores like Play Store or App Store.' },
  { id: 'S2', text: 'I check the sender email address before clicking on any links.' },
  { id: 'S3', text: 'I look for HTTPS and the padlock icon before entering info on websites.' },
  { id: 'S4', text: 'I am cautious about emails that create a sense of urgency or fear.' },
  { id: 'S5', text: 'I never share my OTP or login credentials over calls or messages.' },
  { id: 'S6', text: 'I regularly review and revoke app permissions that are not needed.' }
];

export default function SurveyScreen({ navigation, route }) {
  const { userId } = route.params;
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  
  const BASE_URL = Platform.OS === "web"
      ? "http://localhost:8000"
      : "http://192.168.100.11:8000"; 
  
  const answeredCount = Object.keys(answers).length;

  const selectOption = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // ✅ Sirf EK dafa ye function rakhein
  const submitSurvey = async () => {
    if (answeredCount < 14) {
      Alert.alert('Incomplete', 'Please answer all 14 questions.');
      return;
    }

    const answersArray = QUESTIONS.map(q => ({
        questionId: q.id,
        score: answers[q.id] || 0
    }));

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/survey`, { 
        userId, 
        answers: answersArray 
      });

      await AsyncStorage.setItem('userLevel', String(res.data.level));
      await AsyncStorage.setItem('surveyDone', 'true');
      navigation.replace('Result', { score: res.data.percentage, level: res.data.level });
    } catch (e) {
      console.log("DEBUG ERROR:", e.response?.data || e.message);
      Alert.alert('Error', 'Could not save survey.');
    } finally {
      setLoading(false);
    }
  };

  



  return (
    <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <Text style={styles.headerTitle}>CYBER ASSESSMENT</Text>
            <View style={styles.counterBadge}>
                <Text style={styles.counterText}>{answeredCount} / 14</Text>
            </View>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {QUESTIONS.map((q, i) => (
                <View key={q.id} style={styles.questionCard}>
                    <Text style={styles.categoryText}>QUESTION {i + 1} • {CATEGORY_MAP[q.id]}</Text>
                    <Text style={styles.questionText}>{q.text}</Text>
                    <View style={styles.optionsList}>
                        {OPTIONS.map((opt) => {
                            const selected = answers[q.id] === opt.value;
                            return (
                                <TouchableOpacity
                                    key={opt.value}
                                    style={[styles.optionRow, selected && styles.optionRowSelected]}
                                    onPress={() => selectOption(q.id, opt.value)}
                                >
                                    <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
                                        {selected && <View style={styles.radioDot} />}
                                    </View>
                                    <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                                        {opt.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            ))}
        </ScrollView>
        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.submitBtn, answeredCount < 14 && styles.submitBtnDisabled]}
                onPress={submitSurvey}
                disabled={answeredCount < 14 || loading}
            >
                <Text style={[styles.submitBtnText, answeredCount < 14 && styles.submitBtnTextDisabled]}>
                    {loading ? 'ANALYZING...' : 'SUBMIT ASSESSMENT'}
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#001F3F' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: Platform.OS === 'ios' ? 20 : 50 },
    headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: 1 },
    counterBadge: { backgroundColor: 'rgba(0, 229, 255, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)' },
    counterText: { fontSize: 13, fontWeight: '600', color: '#00e5ff' },
    scroll: { flex: 1 },
    scrollContent: { padding: 16 },
    questionCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    categoryText: { fontSize: 11, fontWeight: 'bold', color: '#00e5ff', marginBottom: 10, letterSpacing: 1.5 },
    questionText: { fontSize: 16, color: '#fff', lineHeight: 24, marginBottom: 20, fontWeight: '500' },
    optionsList: { gap: 10 },
    optionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'transparent' },
    optionRowSelected: { borderColor: 'rgba(0, 229, 255, 0.5)', backgroundColor: 'rgba(0,229,255,0.1)' },
    radioCircle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
    radioCircleSelected: { borderColor: '#00e5ff' },
    radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00e5ff' },
    optionLabel: { fontSize: 15, color: '#ccc' },
    optionLabelSelected: { color: '#fff', fontWeight: 'bold' },
    footer: { padding: 20, paddingBottom: 35 },
    submitBtn: { backgroundColor: '#00e5ff', borderRadius: 15, paddingVertical: 18, alignItems: 'center', shadowColor: '#00e5ff', shadowOpacity: 0.4, shadowRadius: 10, elevation: 5 },
    submitBtnDisabled: { backgroundColor: '#001A35', shadowOpacity: 0, borderWidth: 1.5, borderColor: 'rgba(0, 229, 255, 0.4)' },
    submitBtnText: { color: '#001F3F', fontWeight: '900', fontSize: 16, letterSpacing: 1.5 },
    submitBtnTextDisabled: { color: 'rgba(0, 229, 255, 0.7)', fontWeight: '700' },
});