import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable"; 
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Updated!"); // ✅ Dynamic Success Message
  const [showErrorModal, setShowErrorModal] = useState(false); // ✅ New Error Modal State
  const [errorMsg, setErrorMsg] = useState("");

  const [helpSheetVisible, setHelpSheetVisible] = useState(false); 
  const [reportModalVisible, setReportModalVisible] = useState(false); 
  const [reportMessage, setReportMessage] = useState(""); 
  const [isSending, setIsSending] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://192.168.100.11:8000"; 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      if (!storedId) {
        navigation.replace("Login");
        return;
      }
      const response = await axios.get(`${API_URL}/api/user/${storedId}`);
      const { name, email } = response.data;
      setUser({ name, email });
      setEditName(name);
      setEditEmail(email);
    } catch (error) {
      triggerError("Data fetch nahi ho saka.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to show success
  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  // Helper to show error
  const triggerError = (msg) => {
    setErrorMsg(msg);
    setShowErrorModal(true);
    setTimeout(() => setShowErrorModal(false), 2500);
  };

  const handleSendReport = async () => {
    if (!reportMessage.trim()) {
      triggerError("Please write something to report.");
      return;
    }

    setIsSending(true);
    try {
      const storedId = await AsyncStorage.getItem('userId');
      await axios.post(`${API_URL}/api/report-content`, {
        userId: storedId,
        userName: user.name,
        message: reportMessage,
        timestamp: new Date()
      });

      setReportModalVisible(false);
      setReportMessage("");
      triggerSuccess("Report Sent!"); // ✅ Styled Success
    } catch (error) {
      triggerError("Could not send report."); // ✅ Styled Error
    } finally {
      setIsSending(false);
    }
  };

  const handleSave = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      const response = await axios.put(`${API_URL}/api/update-profile/${storedId}`, {
        name: editName,
        email: editEmail
      });
      if (response.data.status === "success") {
        setUser({ name: editName, email: editEmail });
        setEditModalVisible(false);
        triggerSuccess("Updated!"); 
      }
    } catch (error) {
      triggerError("Update failed.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="#00C6FF" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Account</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.editIcon} onPress={() => setEditModalVisible(true)}>
              <Feather name="edit-2" size={20} color="#00C6FF" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionBox}>
            <Option icon="settings-outline" text="Settings" />
            <Option icon="color-palette-outline" text="Theme" />
            {/* <Option icon="information-circle-outline" text="About us" /> */}
            <Option 
      icon="information-circle-outline" 
      text="About us" 
      onPress={() => navigation.navigate('AboutUs')} 
    />
            <Option icon="help-circle-outline" text="Help & Resources" onPress={() => setHelpSheetVisible(true)} />
            {/* <Option icon="lock-closed-outline" text="Privacy & Security" /> */}
            <Option 
  icon="star-outline" 
  text="Rate and Reviews" />
  // onPress={() => navigation.navigate("PrivacyPolicy")} 

          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={async () => { await AsyncStorage.clear(); navigation.replace("Login"); }}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* --- Help & Resources Bottom Sheet --- */}
        <Modal transparent visible={helpSheetVisible} animationType="fade" onRequestClose={() => setHelpSheetVisible(false)}>
          <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={() => setHelpSheetVisible(false)}>
            <Animatable.View animation="slideInUp" duration={400} style={styles.bottomSheet}>
              <View style={styles.sheetHandle} />
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Help and resources</Text>
                <TouchableOpacity onPress={() => setHelpSheetVisible(false)}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
              </View>

              <View style={styles.sheetContent}>
                <TouchableOpacity style={styles.sheetOption} onPress={() => {
                    setHelpSheetVisible(false);
                    Linking.openURL('mailto:support@nexusshield.com?subject=Help Assistant');
                }}>
                  <Ionicons name="mail-outline" size={22} color="#00C6FF" />
                  <Text style={styles.sheetOptionText}>Help Assistant</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sheetOption} onPress={() => {
                    setHelpSheetVisible(false);
                    setReportModalVisible(true);
                }}>
                  <Ionicons name="chatbubble-ellipses-outline" size={22} color="#00C6FF" />
                  <Text style={styles.sheetOptionText}>Report content</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sheetOption} onPress={() => {
                    setHelpSheetVisible(false);
                    navigation.navigate("PrivacyPolicy");
                }}>
                  <Ionicons name="shield-checkmark-outline" size={22} color="#00C6FF" />
                  <Text style={styles.sheetOptionText}>Privacy policy</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </TouchableOpacity>
        </Modal>

        {/* ✏ Edit Modal */}
        <Modal transparent visible={editModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#ccc" value={editName} onChangeText={setEditName} />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ccc" value={editEmail} onChangeText={setEditEmail} />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModalVisible(false)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* ✅ Styled Success Modal (Used for both updates and reports) */}
        <Modal transparent visible={showSuccessModal} animationType="fade">
          <View style={styles.successOverlay}>
            <Animatable.View animation="zoomIn" style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={60} color="#00ffcc" />
              <Text style={styles.successText}>{successMsg}</Text>
            </Animatable.View>
          </View>
        </Modal>

        {/* ❌ Styled Error Modal (New) */}
        <Modal transparent visible={showErrorModal} animationType="fade">
          <View style={styles.successOverlay}>
            <Animatable.View animation="zoomIn" style={[styles.successBox, {borderColor: '#ff4d4d'}]}>
              <Ionicons name="close-circle" size={60} color="#ff4d4d" />
              <Text style={[styles.successText, {color: '#ff4d4d'}]}>{errorMsg}</Text>
            </Animatable.View>
          </View>
        </Modal>

        {/* ✅ Report Modal */}
        <Modal transparent visible={reportModalVisible} animationType="slide">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
            <View style={styles.modalBox}> 
              <View style={styles.chatHeader}>
                <Text style={styles.modalTitle}>Report Issue</Text>
                <TouchableOpacity onPress={() => setReportModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <TextInput 
                style={[styles.input, { height: 120, textAlignVertical: "top" }]} 
                placeholder="Describe the content or issue..." 
                placeholderTextColor="#ccc" 
                multiline
                value={reportMessage}
                onChangeText={setReportMessage}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setReportModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSendReport} disabled={isSending}>
                  {isSending ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Send Report</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
};

const Option = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.6}>
    <View style={styles.optionLeft}>
      <Ionicons name={icon} size={22} color="#00C6FF" />
      <Text style={styles.optionText}>{text}</Text>
    </View>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="#00C6FF" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 50, marginBottom: 10 },
  headerText: { fontSize: 20, color: "#fff", fontWeight: "bold", marginLeft: 15 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 50 },
  profileCard: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  avatar: { width: 55, height: 55, borderRadius: 50, backgroundColor: "#00C6FF", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  userInfo: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: "700", color: "#fff" },
  email: { fontSize: 14, color: "#d0d0d0" },
  editIcon: { padding: 6 },
  optionBox: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 20, paddingVertical: 10, marginBottom: 25, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  option: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)" },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionText: { color: "#fff", fontSize: 16, marginLeft: 12 },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.15)", paddingVertical: 14, borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  
  sheetOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "flex-end" },
  bottomSheet: { backgroundColor: "#011c3a", borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 20, paddingBottom: 40, borderTopWidth: 1, borderColor: "rgba(0,198,255,0.3)" },
  sheetHandle: { width: 40, height: 5, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, alignSelf: "center", marginVertical: 12 },
  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)" },
  sheetTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  sheetOption: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  sheetOptionText: { color: "#fff", fontSize: 16, marginLeft: 15 },

  chatHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },

  modalContainer: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "85%", backgroundColor: "#012a5e", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#00C6FF" },
  modalTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 15, textAlign: "center" },
  input: { backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", padding: 10, marginVertical: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  cancelBtn: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", padding: 12, borderRadius: 10, alignItems: "center", marginRight: 10 },
  saveBtn: { flex: 1, backgroundColor: "#00C6FF", padding: 12, borderRadius: 10, alignItems: "center", marginLeft: 10 },
  cancelText: { color: "#fff" },
  saveText: { color: "#fff", fontWeight: "bold" },
  
  successOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.8)", // Thoda zyada dark overlay
    justifyContent: "center", 
    alignItems: "center" 
  },
  successBox: { 
    width: "80%", // Size thoda set kiya
    backgroundColor: "#012a5e", // ✅ EXACT SAME as your Report Modal
    borderRadius: 20, 
    padding: 30, 
    alignItems: "center", 
    borderColor: "#00C6FF", // ✅ SAME Light Blue Border
    borderWidth: 1 
  },
  successText: { 
    color: "#fff", // Text white kar diya taake dark bg par nazar aaye
    marginTop: 15, 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: 'center' 
  },
});

export default ProfileScreen;