import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#000428", "#004e92"]}
      style={styles.container}
    >
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Animation */}
        <Animatable.View 
          animation="fadeIn" 
          duration={1200}
          style={styles.logoContainer}
        >
          <Image
            source={require("./assets/Applogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        {/* App Name */}
        
      </View>

      {/* Circular Loader (Smaller) */}
      <Animatable.View 
        animation="fadeIn"
        duration={800}
        delay={800}
        style={styles.loaderContainer}
      >
        <ActivityIndicator size="small" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animatable.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  logo: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
    textAlign: "center",
  },
  loaderContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 13,
    opacity: 0.8,
  },
});

export default SplashScreen;


