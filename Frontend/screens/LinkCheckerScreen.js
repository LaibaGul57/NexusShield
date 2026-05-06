import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LinkCheckerScreen({ navigation }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverIP, setServerIP] = useState("192.168.100.11");

  useEffect(() => {
    if (Platform.OS === 'web') {
      setServerIP("127.0.0.1");
    } else {
      setServerIP("192.168.100.11");
    }
  }, []);

  const checkLink = async () => {
    if (!url.trim()) {
      setResult({ label: "ERROR: Enter URL" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log(`📤 Connecting to: http://${serverIP}:8000/predict`);
      
      const response = await fetch(`http://${serverIP}:8000/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();
      console.log("✅ Response:", data);
      setResult(data);
    } catch (error) {
      console.log("❌ ERROR:", error);
      setResult({ 
        label: `ERROR: Server not reachable (${serverIP})`
      });
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* ✅ Back button - sirf top corner mein, content ko affect nahi karega */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("MainTabs")}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* ✅ Content container - apni jagah center mein */}
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>🔗 Link Detector</Text>
          <Text style={styles.subtitle}>
            Paste a link below to check if it's safe
          </Text>

          <TextInput
            style={styles.input}
            placeholder="https://google.com"
            placeholderTextColor="#9ca3af"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={checkLink}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Checking..." : "Check Link"}
            </Text>
          </TouchableOpacity>

          {result && (
            <View style={styles.resultBox}>
              <Text
                style={[
                  styles.resultLabel,
                  result.label?.includes("SAFE")
                    ? styles.safeText
                    : result.label?.includes("PHISHING")
                    ? styles.phishingText
                    : styles.cautionText,
                ]}
              >
                {result.label || "Unknown"}
              </Text>
              <Text style={styles.debugText}>
                Server: {serverIP}:8000 | Mode: {Platform.OS}
              </Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071033",
  },
  
  // ✅ Back button - top corner mein fixed, content se alag
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 50,
    zIndex: 10,
    // Shadow properties
    shadowColor: "#00C6FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // ✅ Content container - center mein rahega
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  title: {
    fontSize: 26,
    color: "#e6f7ff",
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.04)",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  button: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#6b7280",
    opacity: 0.7,
  },
  buttonText: {
    color: "#022244",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  debugText: {
    fontSize: 10,
    textAlign: "center",
    color: "#6b7280",
    marginTop: 10,
  },
  safeText: {
    color: "#4ade80",
  },
  phishingText: {
    color: "#f87171",
  },
  cautionText: {
    color: "#fbbf24",
  },
});