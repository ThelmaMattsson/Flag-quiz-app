import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]} // blå-turkos gradient
      style={styles.container}
    >
      <Text style={styles.title}>🌍Flagster</Text>
      <Text style={styles.subtitle}>
        Test your knowledge of flags and countries{"\n"}
        Learn, search and challenge yourself!
      </Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/(tabs)/flagquiz")}
        >
          <Text>🎯Go to flag quiz!</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/(tabs)/practice")}
        >
          <Text>📝Practice flags and country trivia!</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 24,
    color: "#f0f0f0",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    marginVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
});
