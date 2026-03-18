import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function Spinner() {
  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
      <ActivityIndicator size={20} color={"black"} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
