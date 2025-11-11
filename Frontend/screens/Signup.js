



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ImageBackground,
  Modal,
  FlatList,
} from "react-native";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const roles = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
    { label: "Researcher", value: "researcher" },
  ];

  const BASE_URL =
    Platform.OS === "web"
      ? "http://localhost:8000"
      : "http://192.168.1.5:8000";

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Error", "Please fill all fields");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }
try {
  const res = await axios.post(`${BASE_URL}/signup`, {
    name,
    email,
    password,
    role,
  });

  if (res.data.message === "User registered successfully") {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);

      // ✅ Redirect to Login after signup
      navigation.replace("Login");
    }, 1500);
  }

} catch (err) {
  console.error(err);
  Alert.alert("Error", err.response?.data?.message || "Signup failed");
}
  }

  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/5rXy0xP/galaxy-bg.jpg" }}
      style={styles.background}
      blurRadius={5}
    >
      <LinearGradient colors={["#000428", "#004e92"]} style={styles.overlay}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          {/* Name */}
          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {/* Email */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { flex: 1, marginVertical: 0 }]}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#00ffff"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[styles.input, { flex: 1, marginVertical: 0 }]}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={22}
                color="#00ffff"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          {/* Role Dropdown */}
          <Text style={styles.label}>Select Role</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setShowModal(true)}>
            <Text style={styles.dropdownText}>
              {roles.find((r) => r.value === role)?.label}
            </Text>
          </TouchableOpacity>

          {/* Role Selection Modal */}
          <Modal transparent visible={showModal} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <FlatList
                  data={roles}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.option,
                        item.value === role && styles.selectedOption,
                      ]}
                      onPress={() => {
                        setRole(item.value);
                        setShowModal(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          item.value === role && styles.selectedOptionText,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Signup Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* ✅ Success Modal */}
        <Modal transparent visible={showSuccessModal} animationType="fade">
          <View style={styles.successOverlay}>
            <Animatable.View
              animation="zoomIn"
              duration={800}
              style={styles.successBox}
            >
              <Ionicons name="checkmark-circle" size={60} color="#00ffcc" />
              <Text style={styles.successText}>
                Account Created Successfully!
              </Text>
            </Animatable.View>
          </View>
        </Modal>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#00ffff",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
  },
  title: {
    fontSize: 30,
    color: "#00ffff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 45,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    marginVertical: 8,
  },
  label: {
    color: "#00ffff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    justifyContent: "center",
  },
  dropdownText: { color: "#fff" },
  button: {
    backgroundColor: "#00ffff",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#001F3F",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#00ffff",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#011627",
    borderRadius: 15,
    padding: 20,
    borderColor: "#00ffff",
    borderWidth: 1,
  },
  option: {
    paddingVertical: 12,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  optionText: { color: "#fff", fontSize: 16 },
  selectedOption: {
    backgroundColor: "rgba(0,255,255,0.2)",
    borderRadius: 10,
  },
  selectedOptionText: {
    color: "#00ffff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#00ffff",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  closeText: {
    color: "#001F3F",
    textAlign: "center",
    fontWeight: "bold",
  },
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#011627",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderColor: "#00ffff",
    borderWidth: 1,
  },
  successText: {
    color: "#00ffff",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
