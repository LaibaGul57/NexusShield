import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ArticleScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  
const fetchArticles = async () => {
  try {
    // const response = await fetch("http://127.0.0.1:8000/api/articles");
    const response = await fetch("http://192.168.100.11:8000/api/articles");
    const data = await response.json();
    setArticles(data.articles); // ✅ yahan articles array set karna hai
  } catch (err) {
    console.error("Error fetching articles:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Cyberhygiene Article</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00e5ff" style={{ marginTop: 40 }} />
      ) : articles.length === 0 ? (
        <Text style={styles.noData}>⚠️ No articles found. Try again later.</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>
                {item.description.replace(/<[^>]+>/g, "").slice(0, 150)}...
              </Text>
              <Text style={styles.date}>
                🗓 {new Date(item.pubDate).toDateString()}
              </Text>
              <Text style={styles.readMore}>Read Article →</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001F3F",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backButton: { position: "absolute", top: 50, left: 15, zIndex: 10 },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  noData: { color: "#ccc", textAlign: "center", marginTop: 20, fontSize: 16 },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  title: { color: "#fff", fontSize: 17, fontWeight: "600" },
  desc: { color: "#ddd", marginTop: 6, fontSize: 14 },
  date: { color: "#aaa", marginTop: 5, fontSize: 12 },
  readMore: { color: "#00e5ff", marginTop: 8, fontSize: 14, fontWeight: "bold" },
});
