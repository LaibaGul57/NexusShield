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

export default function BlogScreen({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ RSS sources focusing on cybersecurity awareness, hygiene, and education
  // const rssFeeds = [
  //   "https://api.rss2json.com/v1/api.json?rss_url=https://security.googleblog.com/feeds/posts/default",
  //   "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
  //   "https://api.rss2json.com/v1/api.json?rss_url=https://www.securityweek.com/rss",
  //   "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/KasperskySecurityBlog",
  // ];

  // const fetchBlogs = async () => {
  //   try {
  //     let allBlogs = [];

  //     for (let feed of rssFeeds) {
  //       const response = await fetch(feed);
  //       const data = await response.json();

  //       if (data.items) {
  //         // Filter to only keep awareness, hygiene, and education-related posts
  //         const filtered = data.items.filter((item) =>
  //           /(cyber hygiene|awareness|education|security tips|safe online|privacy|phishing|data protection|ransomware)/i.test(
  //             item.title + " " + item.description
  //           )
  //         );
  //         allBlogs = [...allBlogs, ...filtered];
  //       }
  //     }

  //     setBlogs(allBlogs);
  //   } catch (err) {
  //     console.error("Fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
//   const fetchBlogs = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/blogs");
//     const data = await response.json();
//     setBlogs(data.blogs); // ✅ 
//   } catch (err) {
//     console.error("Error fetching blogs:", err);
//   } finally {
//     setLoading(false);
//   }
// };
const fetchBlogs = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/blogs");
    const data = await response.json();
    setBlogs(data.blogs); // ✅ ab ye kaam karega
  } catch (err) {
    console.error("Error fetching blogs:", err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchBlogs();
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

      <Text style={styles.header}> Awareness Blogs</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00e5ff" style={{ marginTop: 40 }} />
      ) : blogs.length === 0 ? (
        <Text style={styles.noData}>⚠️ No blogs found. Try again later.</Text>
      ) : (
        <FlatList
          data={blogs}
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
              <Text style={styles.readMore}>Read Blog →</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001F3F", paddingTop: 60, paddingHorizontal: 16 },
  backButton: { position: "absolute", top: 50, left: 15, zIndex: 10 },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 15 },
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
  readMore: { color: "#00e5ff", marginTop: 8, fontSize: 14, fontWeight: "bold" },
});
