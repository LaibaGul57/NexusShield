
import 'react-native-gesture-handler';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IncidentScreen from './screens/IncidentScreen';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import TrainingLessonScreen from './screens/TrainingLessonScreen';
import ProgressReportScreen from './screens/ProgressReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import BlogScreen from './screens/BlogScreen';
import NewsScreen from './screens/NewsScreen';
import ArticleScreen from './screens/ArticleScreen';
import FlashCardScreen from "./screens/FlashCardScreen";  

const RootView = Platform.OS === 'web' ? React.Fragment : GestureHandlerRootView;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Footer Tabs (appear after login)
function MainTabs({ route }) {
  const user = route.params?.user; // user data from login
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#011627',
          borderTopColor: '#00ffff',
        },
        tabBarActiveTintColor: '#00ffff',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Training') iconName = 'school';
          else if (route.name === 'Progress') iconName = 'bar-chart';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ user }} />
      <Tab.Screen name="Training" component={TrainingLessonScreen} />
      <Tab.Screen name="Progress" component={ProgressReportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ✅ Main App
export default function App() {
  return (
    <RootView style={{ flex: 1 }}>
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Incidents" component={IncidentScreen} /> 
          <Stack.Screen name="Blog" component={BlogScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
          <Stack.Screen name="Article" component={ArticleScreen} />
          <Stack.Screen name="TrainingLesson" component={TrainingLessonScreen} />
          <Stack.Screen name="ProgressReport" component={ProgressReportScreen} />
          <Stack.Screen name="FlashCard" component={FlashCardScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
    </RootView>
  );
}
