import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  selectedRegion: string;
  selectedAmount: number;
  onSelectRegion: (region: string) => void;
  onSelectAmount: (amount: number) => void;
  onApply: () => void;
  onClose: () => void;
}

export default function FilterQuiz({
  selectedRegion,
  selectedAmount,
  onSelectRegion,
  onSelectAmount,
  onApply,
  onClose,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Region</Text>
      <View style={styles.row}>
        {[
          "All",
          "Europe",
          "Asia",
          "Americas",
          "Africa",
          "Oceania",
          "Antarctic",
        ].map((region) => (
          <Pressable
            key={region}
            style={[styles.button, selectedRegion === region && styles.active]}
            onPress={() => onSelectRegion(region)}
          >
            <Text>{region}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>How many flags?</Text>

      <View style={styles.row}>
        {[10, 20, 30, 249].map((amount) => (
          <Pressable
            key={amount}
            style={[styles.button, selectedAmount === amount && styles.active]}
            onPress={() => onSelectAmount(amount)}
          >
            <Text>{amount === 249 ? "All" : amount}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomButtonsContainer}>
        <Pressable style={styles.bottomButtonCancel} onPress={onClose}>
          <Text style={{ color: "#6f6f6f" }}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.bottomButton} onPress={onApply}>
          <Text>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4f8ff",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 30,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 10,
    margin: 4,
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  active: {
    backgroundColor: "#4facfe",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  bottomButton: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 3,
  },
  bottomButtonCancel: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 3,
  },
});
