import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchProps {
  value: string;
  onChange: (text: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search country..."
          value={value}
          onChangeText={onChange}
          style={styles.textInput}
        />
        <Ionicons name="search" color={"#a8a8a8"} size={25} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    justifyContent: "space-between",
  },

  textInput: {
    flex: 1,
    marginRight: 10,
  },
});
