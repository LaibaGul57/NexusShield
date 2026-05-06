// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Linking,
//   ActivityIndicator,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function NewsScreen({ navigation }) {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);


// //  const fetchNews = async () => {
// //   try {
// //     const response = await fetch("http://127.0.0.1:8000/api/news");
// //     const data = await response.json();
// //     setNews(data.news); // <-- yahan news array set karna hai
// //   } catch (err) {
// //     console.error("Error fetching news:", err);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// const fetchNews = async () => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/news");
//     const data = await response.json();
//     setNews(data.news); // ✅ ab ye kaam karega
//   } catch (err) {
//     console.error("Error fetching news:", err);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchNews();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* 🔙 Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="arrow-back" size={26} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.header}>Latest News</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#00e5ff" style={{ marginTop: 40 }} />
//       ) : news.length === 0 ? (
//         <Text style={styles.noData}>⚠️ No news found. Try again later.</Text>
//       ) : (
//         <FlatList
//           data={news}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => {
            
//              const imageUrl = item.image || null;

//             return (
//               <TouchableOpacity
//                 style={styles.card}
//                 onPress={() => Linking.openURL(item.link)}
//               >
                
//                    <Image
//                      source={
//                         imageUrl
//                         ? { uri: imageUrl }
//                        : require("../assets/news.png") // fallback local image
//                            }  
  

//   style={styles.image}
//   resizeMode="cover" 
// />

//                 <View style={styles.textBox}>
//                   <Text style={styles.title}>{item.title}</Text>
//                   <Text style={styles.desc}>
//                     {item.description.replace(/<[^>]+>/g, "").slice(0, 120)}...
//                   </Text>
//                   <Text style={styles.date}>
//                     🗓 {new Date(item.pubDate).toDateString()}
//                   </Text>
//                   <Text style={styles.readMore}>Read More →</Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#001F3F",
//     paddingTop: 60,
//     paddingHorizontal: 16,
//   },
//   backButton: { position: "absolute", top: 50, left: 15, zIndex: 10 },
//   header: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   noData: { color: "#ccc", textAlign: "center", marginTop: 20, fontSize: 16 },
//   card: {
//     backgroundColor: "rgba(255,255,255,0.08)",
//     borderRadius: 15,
//     overflow: "hidden",
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.1)",
//   },
//   image: {
//     width: "100%",
//     height: 180,
//   },
//   textBox: { padding: 12 },
//   title: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   desc: { color: "#ccc", marginTop: 5, fontSize: 14 },
//   date: { color: "#aaa", marginTop: 6, fontSize: 12 },
//   readMore: { color: "#00e5ff", marginTop: 8, fontSize: 14, fontWeight: "bold" },
// });
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

export default function NewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
     // const response = await fetch("http://127.0.0.1:8000/api/news");
         const response = await fetch("http://192.168.100.11:8000/api/news");
      const data = await response.json();
      setNews(data.news);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
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

      <Text style={styles.header}>Latest News</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00e5ff" style={{ marginTop: 40 }} />
      ) : news.length === 0 ? (
        <Text style={styles.noData}>⚠️ No news found. Try again later.</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => Linking.openURL(item.link)}
              >
                <View style={styles.textBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc}>
                    {item.description.replace(/<[^>]+>/g, "").slice(0, 120)}...
                  </Text>
                  <Text style={styles.date}>
                    🗓 {new Date(item.pubDate).toDateString()}
                  </Text>
                  <Text style={styles.readMore}>Read More →</Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  textBox: { padding: 12 },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  desc: { color: "#ccc", marginTop: 5, fontSize: 14 },
  date: { color: "#aaa", marginTop: 6, fontSize: 12 },
  readMore: { color: "#00e5ff", marginTop: 8, fontSize: 14, fontWeight: "bold" },
});
