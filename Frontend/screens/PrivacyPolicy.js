// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";

// const PrivacyPolicy = ({ navigation }) => {
//   return (
//     <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
//             <Ionicons name="arrow-back" size={26} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerText}>Privacy Policy</Text>
//         </View>

//         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
//           <View style={styles.policyCard}>
//             <Ionicons name="shield-checkmark" size={40} color="#00C6FF" style={{alignSelf: 'center', marginBottom: 10}} />
//             <Text style={styles.title}>Your Security is Our Priority</Text>
//             <Text style={styles.lastUpdated}>Last Updated: April 2026</Text>
            
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>1. Data We Collect</Text>
//               <Text style={styles.text}>
//                 Nexus Shield collects basic profile information (Name, Email) and device usage patterns to detect potential cyber threats. We do not sell your personal data.
//               </Text>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>2. AI Analysis</Text>
//               <Text style={styles.text}>
//                 Our AI-driven "Cyber Hygiene Assistant" analyzes app permissions and digital behavior locally and on our secure servers to provide real-time security nudges.
//               </Text>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>3. Data Protection</Text>
//               <Text style={styles.text}>
//                 We use end-to-end encryption for any data transmitted to our backend. Your "Nexus Shield" experience is designed with human-centered security at its core.
//               </Text>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>4. Your Rights</Text>
//               <Text style={styles.text}>
//                 You have the right to request your data or ask for account deletion at any time through the "Report Issue" or "Help Assistant" options.
//               </Text>
//             </View>

//             <Text style={styles.footerNote}>
//               By using Nexus Shield, you agree to our terms of proactive digital protection.
//             </Text>
//           </View>

//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 50, marginBottom: 10 },
//   headerText: { fontSize: 20, color: "#fff", fontWeight: "bold", marginLeft: 15 },
//   scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
//   policyCard: { 
//     backgroundColor: "rgba(255,255,255,0.05)", 
//     borderRadius: 20, 
//     padding: 20, 
//     borderWidth: 1, 
//     borderColor: "rgba(0,198,255,0.2)" 
//   },
//   title: { fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 5 },
//   lastUpdated: { fontSize: 12, color: "#00C6FF", textAlign: "center", marginBottom: 20 },
//   section: { marginBottom: 20 },
//   sectionTitle: { fontSize: 17, fontWeight: "bold", color: "#00C6FF", marginBottom: 8 },
//   text: { fontSize: 14, color: "#d0d0d0", lineHeight: 22, textAlign: "justify" },
//   footerNote: { 
//     fontSize: 13, 
//     color: "#999", 
//     fontStyle: "italic", 
//     textAlign: "center", 
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(255,255,255,0.1)",
//     paddingTop: 15
//   },
// });

// export default PrivacyPolicy;
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Privacy Policy</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.policyCard}>
            <Ionicons name="shield-checkmark" size={40} color="#00C6FF" style={{alignSelf: 'center', marginBottom: 10}} />
            
            <Text style={styles.title}>Secure Your Digital Identity</Text>
            <Text style={styles.lastUpdated}>Updated: April 2026</Text>
            
            <Text style={styles.introText}>
              Nexus Shield is committed to protecting your data with transparency and advanced AI security.
            </Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>1. Information We Collect</Text>
              <Text style={styles.text}>
                We collect your name, email, and device permission patterns to analyze risks. This data helps our AI provide personalized security nudges.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>2. AI & Data Usage</Text>
              <Text style={styles.text}>
                Our "Cyber Hygiene Assistant" uses your data locally to improve your security score. We never sell your personal information to third parties.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>3. Security Standards</Text>
              <Text style={styles.text}>
                Using end-to-end encryption, we ensure your data remains private. Your security is designed into the core of the Nexus Shield experience.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>4. User Control</Text>
              <Text style={styles.text}>
                You can view or delete your data anytime via the "Report Issue" section. You stay in full control of your digital footprint.
              </Text>
            </View>

            <View style={styles.footerBranding}>
              <Text style={styles.footerNote}>
                Thank you for trusting Nexus Shield.
              </Text>
              <Text style={styles.brandName}>Team Nexus Shield</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    marginTop: 40, 
    marginBottom: 10 
  },
  headerText: { 
    fontSize: 20, 
    color: "#fff", 
    fontWeight: "bold", 
    marginLeft: 15 
  },
  scrollContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 30 
  },
  policyCard: { 
    backgroundColor: "rgba(255,255,255,0.06)", 
    borderRadius: 20, 
    padding: 20, 
    borderWidth: 1, 
    borderColor: "rgba(0,198,255,0.2)" 
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#fff", 
    textAlign: "center", 
    marginBottom: 4 
  },
  lastUpdated: { 
    fontSize: 12, 
    color: "#00C6FF", 
    textAlign: "center", 
    marginBottom: 15 
  },
  introText: { 
    fontSize: 14, 
    color: "#ccc", 
    textAlign: "center", 
    marginBottom: 20, 
    lineHeight: 20 
  },
  section: { 
    marginBottom: 15 // Gaps kam karne ke liye spacing kam ki
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#00C6FF", 
    marginBottom: 5 
  },
  text: { 
    fontSize: 13, 
    color: "#d0d0d0", 
    lineHeight: 18, // Text lines ke darmiyan gap kam kiya
    textAlign: "justify",
    letterSpacing: 0.2 // Words ke darmiyan gap control kiya
  },
  footerBranding: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    alignItems: 'center'
  },
  footerNote: { 
    fontSize: 12, 
    color: "#888" 
  },
  brandName: { 
    fontSize: 13, 
    color: "#00C6FF", 
    fontWeight: 'bold', 
    marginTop: 4 
  },
});

export default PrivacyPolicy;