
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); // ✅ Email validation message
  const [backendError, setBackendError] = useState(""); // ✅ Backend errors

  const BASE_URL =
    Platform.OS === "web"
      ? "http://localhost:8000"
      : "http://192.168.1.5:8000";

  const validateEmail = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError("Email cannot be empty ❌");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setEmailError("Email is not valid ❌");
      } else {
        setEmailError(""); // valid email
      }
    }
  };

  const handleLogin = async () => {
    setBackendError(""); // Clear previous backend error

    // Prevent login if email invalid
    if (!email || emailError) return;

    if (!password) {
      setBackendError("Password cannot be empty ❌");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      const msg = res.data.message;

      if (msg.includes("Login successful")) {
        setBackendError("");
        navigation.replace("MainTabs", { user: res.data.user });
      } else if (msg.includes("User not found")) {
        setBackendError("User not registered ❌");
      } else if (msg.includes("Incorrect password")) {
        setBackendError("Incorrect password ❌");
      } else {
        setBackendError(msg || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      setBackendError(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/5rXy0xP/galaxy-bg.jpg" }}
      style={styles.background}
      blurRadius={5}
    >
      <LinearGradient colors={["#001F3F", "#011627"]} style={styles.overlay}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={email}
            onChangeText={validateEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          {backendError ? <Text style={styles.errorText}>{backendError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Don’t have an account? Sign up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: { fontSize: 26, color: "#fff", fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 15,
    color: "#fff",
    marginBottom: 5,
  },
  errorText: {
    color: "#FF4136",
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
  },
  button: { backgroundColor: "#007AFF", borderRadius: 10, paddingVertical: 12, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
  link: { color: "#1E90FF", marginTop: 15, textAlign: "center" },
});

