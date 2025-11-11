import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function IncidentScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const rssFeeds = [
    "https://api.rss2json.com/v1/api.json?rss_url=https://security.googleblog.com/feeds/posts/default",
    "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/KasperskySecurityBlog",
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.darkreading.com/rss.xml",
  ];

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const responses = await Promise.all(
          rssFeeds.map((url) => fetch(url).then((res) => res.json()))
        );

        // Combine feeds
        const mergedArticles = responses
          .flatMap((data) => data.items || [])
          .slice(0, 6);

        const cleanedArticles = mergedArticles.map((item) => {
          let imageUrl = item.thumbnail || item.enclosure?.link || null;

          // try extracting image from HTML description
          if (!imageUrl && item.description) {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) imageUrl = imgMatch[1];
          }

          return {
            title: item.title,
            link: item.link,
            description: item.description
              ? item.description.replace(/<[^>]+>/g, "")
              : "No description available.",
            imageUrl,
          };
        });

        // ✅ If no articles found, show fallback samples
        if (cleanedArticles.length === 0) {
          setArticles([
            {
              title: "Phishing Attack Targets Corporate Emails",
              description:
                "A new phishing campaign was discovered targeting corporate users with fake Microsoft 365 login pages.",
              link: "https://www.cybersecuritynews.com/",
              imageUrl:
                "https://cdn.pixabay.com/photo/2016/11/19/14/00/hacker-1839348_1280.jpg",
            },
            {
              title: "Malware Campaign Spreads via Fake PDF Invoices",
              description:
                "Cybercriminals are distributing malware through fake invoice emails disguised as PDFs.",
              link: "https://thehackernews.com/",
              imageUrl:
                "https://cdn.pixabay.com/photo/2016/12/09/17/57/security-1896110_1280.jpg",
            },
          ]);
        } else {
          setArticles(cleanedArticles);
        }
      } catch (error) {
        console.error("Error fetching feeds:", error);
        // fallback data on error
        setArticles([
          {
            title: "Cyber Attack Detected on Banking Sector",
            description:
              "Authorities have identified a ransomware attack on a major financial institution.",
            link: "https://www.cybersecuritynews.com/",
            imageUrl:
              "https://cdn.pixabay.com/photo/2017/01/31/17/44/hacker-2025123_1280.png",
          },
          {
            title: "Data Breach Exposes Customer Records",
            description:
              "Over 10,000 customer records were leaked due to misconfigured cloud storage.",
            link: "https://thehackernews.com/",
            imageUrl:
              "https://cdn.pixabay.com/photo/2018/05/08/08/42/hacker-3385403_1280.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Previous Attacks</Text>
        </View>

        {/* Category Boxes */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => navigation.navigate("Article")}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={36}
              color="#00e5ff"
            />
            <Text style={styles.categoryText}>Articles</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => navigation.navigate("Blog")}
          >
            <FontAwesome5 name="blog" size={32} color="#00e5ff" />
            <Text style={styles.categoryText}>Blogs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => navigation.navigate("News")}
          >
            <Ionicons name="newspaper-outline" size={34} color="#00e5ff" />
            <Text style={styles.categoryText}>News</Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Choose a category to view and read related attack reports and updates.
        </Text>

        {/* Recently Updated */}
        <Text style={styles.sectionTitle}>Recently Updated</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#00e5ff" style={{ marginTop: 30 }} />
        ) : (
          articles.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.articleCard}
              onPress={() => Linking.openURL(item.link)}
            >
              <Image
                source={
                  item.imageUrl
                    ? { uri: item.imageUrl }
                    : require("../assets/news.png")
                }
                style={styles.articleImage}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.articleTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.articleDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  categoryBox: {
    width: "30%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  categoryText: {
    color: "#fff",
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
    color: "#CDE0FF",
    marginTop: 10,
    marginBottom: 25,
    fontSize: 14,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  articleCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    marginBottom: 15,
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: 180,
  },
  textContainer: {
    padding: 12,
  },
  articleTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  articleDescription: {
    color: "#CDE0FF",
    fontSize: 13,
  },
});
