import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [user] = useState({
    name: "Maira ",
    email: "maira123@gmail.com",
    loginType: "Signup", // or "Login"
    streak: 7,
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  });

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🧭 Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Profile</Text>
        </View>

        {/* 🧍‍♀️ Profile Section */}
        <View style={styles.profileCard}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="camera-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.loginType}>
            {user.loginType === "Signup"
              ? "Account created via Signup"
              : "Logged in via existing account"}
          </Text>

          {/* 🔥 Streak Card */}
          <LinearGradient
            colors={["#00c6ff", "#0072ff"]}
            style={styles.streakCard}
          >
            <Ionicons name="flame" size={28} color="#fff" />
            <View>
              <Text style={styles.streakNumber}>{user.streak} Day Streak</Text>
              <Text style={styles.streakSub}>Keep your learning going!</Text>
            </View>
          </LinearGradient>
        </View>

        {/* ⚙️ Options Section */}
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="settings-outline" size={22} color="#00e5ff" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <FontAwesome5 name="user-shield" size={20} color="#00e5ff" />
            <Text style={styles.optionText}>Privacy & Security</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, styles.signOut]}>
            <MaterialIcons name="logout" size={22} color="#fff" />
            <Text style={[styles.optionText, { color: "#fff" }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 25,
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#00e5ff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 6,
    backgroundColor: "#00e5ff",
    padding: 5,
    borderRadius: 15,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 15,
  },
  email: {
    color: "#cde0ff",
    fontSize: 15,
    marginTop: 4,
  },
  loginType: {
    color: "#9be1ff",
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 6,
  },
  streakCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginTop: 20,
    gap: 10,
  },
  streakNumber: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  streakSub: {
    color: "#e3f2fd",
    fontSize: 12,
  },
  optionContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "600",
  },
  signOut: {
    backgroundColor: "#e63946",
    justifyContent: "center",
  },
});
