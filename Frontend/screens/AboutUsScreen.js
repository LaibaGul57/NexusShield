
// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function AboutUsScreen({ navigation }) {
//   return (
//     <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <StatusBar barStyle="light-content" />
        
//         {/* --- Custom Header with Circular Back Button --- */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.circularBackButton} 
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="arrow-back" size={24} color="#fff" />
//           </TouchableOpacity>
          
//           <Text style={styles.headerTitle}>ABOUT US</Text>
//           <View style={{ width: 45 }} /> {/* Title ko center rakhne ke liye balance */}
//         </View>

//         <ScrollView 
//           contentContainerStyle={styles.content}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* --- Shield Logo --- */}
//           <View style={styles.logoContainer}>
//             <Ionicons name="shield-checkmark" size={80} color="#00e5ff" />
//             <Text style={styles.appName}>NEXUS SHIELD</Text>
//           </View>

//           {/* --- Mission Card --- */}
//           <View style={styles.card}>
//             <Text style={styles.subHeading}>Our Mission</Text>
//             <Text style={styles.description}>
//               Nexus Shield aik comprehensive AI-powered Cyber Hygiene Assistant hai jo digital hifazat ke jadeed taqazon ko poora karne ke liye banaya gaya hai. Hamara maqsad sirf threats ko rokna nahi, balki users ke digital rawayye (behavior) ko behtar banana hai. AI-driven behavioral nudging technology ka istemal karte hue, Nexus Shield users ki security habits ka mushahida karta hai aur unhein bar-waqt real-time alerts aur guides faraham karta hai.
//             </Text>
            
//             <View style={styles.divider} />

//             <Text style={styles.description}>
//               Humara nizam Technical security aur Social Engineering awareness ke darmiyan aik pul ka kaam karta hai, taake har user—chahe wo technical ho ya na ho—khud ko phishing, malware, aur data breaches se mehfooz rakh sakay. Nexus Shield ke saath, hum aik aisa digital mahool paida kar rahe hain jahan hifazat sirf aik feature nahi, balki har user ki aadat ban jaye.
//             </Text>
//           </View>

//           <Text style={styles.footerText}>Version 1.0.0 | Nexus Shield Team</Text>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1 
//   },
//   header: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-between', 
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginTop: 5,
//   },
//   // Image ke mutabiq circular back button
//   circularBackButton: {
//     width: 45,
//     height: 45,
//     borderRadius: 22.5,
//     backgroundColor: 'rgba(255, 255, 255, 0.12)', // Subtle glass effect
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   headerTitle: { 
//     color: '#fff', 
//     fontSize: 18, 
//     fontWeight: 'bold', 
//     letterSpacing: 1.5,
//     textAlign: 'center',
//     flex: 1,
//   },
//   content: { 
//     padding: 20,
//     alignItems: 'center'
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//     marginTop: 10
//   },
//   appName: {
//     color: '#00e5ff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 10,
//     letterSpacing: 2
//   },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.08)',
//     borderRadius: 25,
//     padding: 25,
//     borderWidth: 1,
//     borderColor: 'rgba(0, 229, 255, 0.2)',
//     width: '100%'
//   },
//   subHeading: { 
//     color: '#00e5ff', 
//     fontSize: 22, 
//     fontWeight: 'bold', 
//     marginBottom: 15 
//   },
//   description: { 
//     color: '#e0e0e0', 
//     fontSize: 15, 
//     lineHeight: 24, 
//     textAlign: 'justify' 
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(0, 229, 255, 0.1)',
//     marginVertical: 20
//   },
//   footerText: { 
//     color: 'rgba(255,255,255,0.3)', 
//     textAlign: 'center', 
//     marginTop: 40, 
//     fontSize: 12,
//     letterSpacing: 1
//   }
// });
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutUsScreen({ navigation }) {
  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        
        {/* --- Header: Move arrow further down --- */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.circularBackButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Shield Logo --- */}
          <View style={styles.logoContainer}>
            <Ionicons name="shield-checkmark" size={80} color="#00e5ff" />
            <Text style={styles.appName}>NEXUS SHIELD</Text>
          </View>

          {/* --- Content Card in English --- */}
          <View style={styles.card}>
            <Text style={styles.subHeading}>Our Mission</Text>
            <Text style={styles.description}>
              Nexus Shield is a comprehensive AI-powered Cyber Hygiene Assistant designed to meet the modern demands of digital security. Our goal is not just to prevent threats, but to improve users' digital behavior. Using AI-driven behavioral nudging technology, Nexus Shield monitors security habits and provides real-time alerts and expert guidance.
            </Text>
            
            <View style={styles.divider} />

            <Text style={styles.description}>
              Our system acts as a bridge between technical security and social engineering awareness, ensuring that every user, whether technical or not can protect themselves from phishing, malware, and data breaches. With Nexus Shield, we are creating a digital environment where safety is not just a feature, but a habit for every user.
            </Text>
          </View>

          <Text style={styles.footerText}>Version 1.0.0 | Nexus Shield Team</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: { 
    paddingHorizontal: 20,
    // Arrow height adjusted to be lower
    marginTop: 60, 
    width: '100%',
    alignItems: 'flex-start',
  },
  circularBackButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: { 
    padding: 20,
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10
  },
  appName: {
    color: '#00e5ff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 2
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    width: '100%'
  },
  subHeading: { 
    color: '#00e5ff', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  description: { 
    color: '#e0e0e0', 
    fontSize: 15, 
    lineHeight: 24, 
    textAlign: 'justify' 
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    marginVertical: 20
  },
  footerText: { 
    color: 'rgba(255,255,255,0.3)', 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 12,
    letterSpacing: 1
  }
});