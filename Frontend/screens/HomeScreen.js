
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
 import { LinearGradient } from "expo-linear-gradient";
 

import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
const route = useRoute();
//  const userName = route.params?.user?.name || "Guest";
// In lines ko update karein
const userName =  route.params?.user?.name ||  route.params?.signupData?.name ||     
  route.params?.name ||                 
  "Guest";                              
 
// const userName = route.params?.user?.name 
//   || route?.params?.params?.user?.name 
//   || "Guest";

  const images = [
    require("../assets/banner1.png"),
    require("../assets/banner2.png"),
    require("../assets/banner3.png"),
    require("../assets/banner4.png"),
  ];

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 2500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔔 Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.greeting}>Hello, {userName}</Text>

          {/* Clickable Notification Icon */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            activeOpacity={0.7} style={{ marginTop: 23 }}
          >
            <Ionicons name="notifications-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 🔍 Search Bar */}
        {/* <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#fff" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#ccc"
            style={styles.searchInput}
          />
        </View> */}

        {/* 🖼️ Image Slider */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
        >
          {images.map((img, index) => (
            <Image key={index} source={img} style={styles.slideImage} resizeMode="cover" />
          ))}
        </ScrollView>

        {/* ✨ Glowing Transparent Boxes */}
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.boxContainer}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("TrainingLesson")}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="shield-check" size={32} color="#fff" />
            <Text style={styles.boxText}>Training</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("ProgressReport")}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="chart-line" size={30} color="#fff" />
            <Text style={styles.boxText}>Progress Report</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("Incidents")}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="alert-octagram-outline" size={32} color="#fff" />
            <Text style={styles.boxText}>Previous Attack</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate("LinkChecker")}
            activeOpacity={0.8}
          > */}
          <TouchableOpacity
  style={styles.box}
  onPress={() => navigation.navigate("LinkCheckerScreen")}
  activeOpacity={0.8}
>
  <MaterialCommunityIcons name="link-lock" size={32} color="#fff" />
            <Text style={styles.boxText}>Link Scanner</Text>
</TouchableOpacity>

            
      
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "rgba(255,255,255,0.15)",
  //   margin: 20,
  //   borderRadius: 25,
  //   paddingHorizontal: 15,
  //   borderWidth: 1,
  //   borderColor: "rgba(255,255,255,0.3)",
  // },
  // searchInput: {
  //   flex: 1,
  //   color: "#fff",
  //   fontSize: 16,
  //   paddingVertical: 8,
  // },
  slider: {
    width: "100%",
    height: 200,
    marginTop: 30,
  },
  slideImage: {
    width: width,
    height: 200,
    borderRadius: 15,
  },
  boxContainer: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 40,
  },
  box: {
    width: width * 0.4,
    height: 130,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00e5ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  boxText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 8,
  },
});

export default HomeScreen;
