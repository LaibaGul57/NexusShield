// ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen({ route, navigation }) {
  const { score, level } = route.params;

  const getLevelDetails = () => {
    if (level === 1) return { title: 'BEGINNER', color: '#FF4136', icon: 'shield-outline', desc: 'Critical risk! You need to build basic digital defenses immediately.' };
    if (level === 2) return { title: 'INTERMEDIATE', color: '#FF851B', icon: 'shield-half-outline', desc: 'Decent protection, but there are gaps in your digital hygiene.' };
    return { title: 'ADVANCED', color: '#00e5ff', icon: 'shield-checkmark', desc: 'Excellent! You have a strong security posture. Stay vigilant!' };
  };

  const details = getLevelDetails();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Ionicons name={details.icon} size={80} color={details.color} />
        
        <Text style={styles.title}>ASSESSMENT COMPLETE</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: details.color }]}>{score}%</Text>
          <Text style={styles.scoreSubText}>Cyber Hygiene Score</Text>
        </View>

        <View style={[styles.levelBadge, { backgroundColor: details.color + '20', borderColor: details.color }]}>
          <Text style={[styles.levelText, { color: details.color }]}>{details.title}</Text>
        </View>

        <Text style={styles.descText}>{details.desc}</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.buttonText}>GO TO DASHBOARD</Text>
          <Ionicons name="arrow-forward" size={20} color="#001F3F" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001F3F', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { 
    width: '100%', 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: 30, 
    borderRadius: 30, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 20
  },
  title: { fontSize: 18, color: '#aaa', fontWeight: 'bold', letterSpacing: 2, marginBottom: 20 },
  scoreContainer: { alignItems: 'center', marginBottom: 25 },
  scoreText: { fontSize: 64, fontWeight: 'bold' },
  scoreSubText: { color: '#888', fontSize: 14, marginTop: -5 },
  levelBadge: { paddingHorizontal: 25, paddingVertical: 8, borderRadius: 15, borderWidth: 1, marginBottom: 20 },
  levelText: { fontWeight: 'bold', fontSize: 18, letterSpacing: 1 },
  descText: { color: '#ccc', textAlign: 'center', lineHeight: 22, fontSize: 15, marginBottom: 35, paddingHorizontal: 10 },
  button: { 
    backgroundColor: '#00e5ff', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    paddingHorizontal: 30, 
    paddingVertical: 18, 
    borderRadius: 15,
    shadowColor: '#00e5ff',
    shadowOpacity: 0.4,
    shadowRadius: 10
  },
  buttonText: { color: '#001F3F', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});