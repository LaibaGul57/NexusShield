import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000428" />

      {/* ✨ Animated Logo */}
      <Animatable.Image
        animation="fadeInDown"
        duration={1200}
        source={require("../assets/welcome.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* ✨ Text Section */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={300}
        style={styles.textContainer}
      >
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.appName}>Nexus Shield</Text>

        <View style={styles.separator} />

        <Text style={styles.subtitle}>Empowering Your Digital Safety</Text>

        {/* 🔘 Get Started Button */}
        <Animatable.View
          animation="pulse"
          easing="ease-in-out"
          iterationCount="infinite"
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Login")}
          >
            <LinearGradient
              colors={["#00c6ff", "#0072ff"]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 15,
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  textContainer: {
    alignItems: "center",
    marginTop: -5,
  },
  title: {
    fontSize: 20,
    color: "#CDE0FF",
    letterSpacing: 1,
    marginBottom: 5,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  separator: {
    width: 70,
    height: 3,
    backgroundColor: "#00c6ff",
    borderRadius: 2,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#CDE0FF",
    marginBottom: 50,
    textAlign: "center",
  },
  button: {
    width: width * 0.6,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  gradientButton: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.8,
  },
});
