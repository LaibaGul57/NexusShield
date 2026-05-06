
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Platform,
// } from "react-native";
// import * as Animatable from "react-native-animatable";
// import { LinearGradient } from "expo-linear-gradient";
// import axios from "axios";
// import * as Notifications from 'expo-notifications';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState(""); 
//   const [backendError, setBackendError] = useState(""); 

//   const BASE_URL =
//     Platform.OS === "web"
//       ? "http://localhost:8000"
//       : "http://192.168.100.11:8000"; 

//   const validateEmail = (text) => {
//     setEmail(text);
//     if (!text) {
//       setEmailError("Email cannot be empty ❌");
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(text)) {
//         setEmailError("Email is not valid ❌");
//       } else {
//         setEmailError(""); 
//       }
//     }
//   };

//   const handleLogin = async () => {
//     setBackendError(""); 
//     if (!email || emailError) return;
//     if (!password) {
//       setBackendError("Password cannot be empty ❌");
//       return;
//     }

//     try {
//       console.log("Attempting login to:", `${BASE_URL}/login`);
//       const token = (await Notifications.getDevicePushTokenAsync()).data;
//       console.log("🚀 Sending Token to Backend:", token);

//       const res = await axios.post(`${BASE_URL}/login`, { 
//         email, 
//         password, 
//         fcm_token: token 
//       });  
      
//       const user = res.data.user;
//       const message = res.data.message;

//       if (res.status === 200 && user) {
//         setBackendError("");
//         if (user.surveyDone === false || user.surveyDone === undefined) {
//           navigation.replace("Survey", { userId: user.user_id });
//         } else {
//           await AsyncStorage.setItem('userName', user.name);
//           navigation.replace("MainTabs", { user: user });
//         }
//       } else {
//         setBackendError(message || "Login failed ❌");
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Invalid credentials ❌";
//       setBackendError(errorMsg);
//     }
//   };

//   return (
//     <ImageBackground
//       source={{ uri: "https://i.ibb.co/5rXy0xP/galaxy-bg.jpg" }}
//       style={styles.background}
//       blurRadius={5}
//     >
//       {/* ✅ Theme Colors updated to match Signup */}
//       <LinearGradient colors={["#000428", "#004e92"]} style={styles.overlay}>
//         <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
//           <Text style={styles.title}>Login</Text>

//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#aaa"
//             style={styles.input}
//             value={email}
//             onChangeText={validateEmail}
//             autoCapitalize="none"
//           />
//           {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#aaa"
//             secureTextEntry
//             style={styles.input}
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//           />

//           {backendError ? <Text style={styles.errorText}>{backendError}</Text> : null}

//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//             <Text style={styles.link}>Don’t have an account? Sign up</Text>
//           </TouchableOpacity>
//         </Animatable.View>
//       </LinearGradient>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: { flex: 1 },
//   overlay: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     width: "85%",
//     backgroundColor: "rgba(255, 255, 255, 0.1)", // Signup jesa transparent card
//     borderRadius: 20,
//     padding: 25,
//     shadowColor: "#00ffff",
//     shadowOpacity: 0.4,
//     shadowOffset: { width: 0, height: 5 },
//     shadowRadius: 15,
//   },
//   title: {
//     fontSize: 30,
//     color: "#00ffff",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: "rgba(255, 255, 255, 0.15)",
//     color: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginVertical: 8,
//     height: 45,
//   },
//   button: {
//     backgroundColor: "#00ffff",
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#001F3F",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   link: {
//     marginTop: 15,
//     color: "#00ffff",
//     textAlign: "center",
//   },
//   errorText: {
//     color: "#FF4136",
//     marginTop: 5,
//     marginBottom: 5,
//     textAlign: "left",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
// });
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
import { Entypo } from "@expo/vector-icons"; // Eye icon ke liye
import axios from "axios";
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Eye icon state
  const [emailError, setEmailError] = useState(""); 
  const [backendError, setBackendError] = useState(""); 

  const BASE_URL = Platform.OS === "web" ? "http://localhost:8000" : "http://192.168.100.11:8000"; 

  const validateEmail = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError("Email cannot be empty ❌");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        setEmailError("Email is not valid ❌");
      } else {
        setEmailError(""); 
      }
    }
  };

  const handleLogin = async () => {
  setBackendError(""); 
  
  // Validation checks
  if (!email || emailError) return;
  if (!password) {
    setBackendError("Password cannot be empty ❌");
    return;
  }

  try {
    // 1. Notification token get karein
    let token = null;
    try {
      token = (await Notifications.getDevicePushTokenAsync()).data;
    } catch (tokenErr) {
      console.log("Notification token error:", tokenErr);
    }

    // 2. Login Request
    const res = await axios.post(`${BASE_URL}/login`, { 
      email, 
      password, 
      fcm_token: token 
    }); 

    const user = res.data.user;

    // 3. Success Logic
    if (res.status === 200 && user) {
      // Data save karein
      await AsyncStorage.setItem('userName', user.name);
      await AsyncStorage.setItem('userId', user.user_id); 
      
      // Seedha Dashboard par bhejein (Kyunki Survey ab Sign Up par hai)
      navigation.replace("MainTabs", { user: user });
    }
  } catch (err) {
    // 4. Error handling (Ye missing tha pehle)
    setBackendError(err.response?.data?.message || "Invalid credentials ❌");
  }
};    
  

  return (
    <ImageBackground source={{ uri: "https://i.ibb.co/5rXy0xP/galaxy-bg.jpg" }} style={styles.background} blurRadius={5}>
      <LinearGradient colors={["#000428", "#004e92"]} style={styles.overlay}>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
          <Text style={styles.title}>Login</Text>

          {/* Email Field with Red Border logic */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            style={[styles.input, emailError ? styles.errorBorder : null]}
            value={email}
            onChangeText={validateEmail}
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Password Field with Eye Icon */}
          <View style={[styles.passwordContainer, backendError && !password ? styles.errorBorder : null]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Entypo name={showPassword ? "eye" : "eye-with-line"} size={20} color="#00ffff" />
            </TouchableOpacity>
          </View>

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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    height: 45,
    borderWidth: 1,
    borderColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
  },
  errorBorder: {
    borderColor: "#FF4136",
    borderWidth: 1,
  },
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
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: "#00ffff",
    textAlign: "center",
  },
  errorText: {
    color: "#FF4136",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
});






