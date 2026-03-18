import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffff",
        tabBarStyle: {
          backgroundColor: "#0a2252",
        },
        headerStyle: {
          backgroundColor: "#0a2252",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Flagster",
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flagquiz"
        options={{
          title: "Flag Quiz",
          tabBarLabel: "Quiz",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "flag" : "flag-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarLabel: "Practice",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
