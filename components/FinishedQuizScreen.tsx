import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  score: number;
  quizLength: number;
  onClick: () => void;
}

export default function FinishedScreen({ score, quizLength, onClick }: Props) {
  return (
    <View style={styles.finishedContainer}>
      <Text style={styles.finishedText}>
        Quiz finished! Score: {score} / {quizLength}
      </Text>
      <Pressable style={styles.restartButton} onPress={onClick}>
        <Text style={{ color: "#fff" }}>Restart</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  finishedContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4f8ff",
    width: 300,
    height: 400,
    borderRadius: 20,
  },
  finishedText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  restartButton: {
    backgroundColor: "#4facfe",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
