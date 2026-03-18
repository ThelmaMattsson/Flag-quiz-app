import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../../components/SearchBar";
import Spinner from "../../components/Spinner";
import { useCountries } from "../../hooks/useCountries";

export default function Practice() {
  const { query, search, shown, error, loading } = useCountries();

  const router = useRouter();

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.center}>
        <Text>{error}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
      <Search value={query} onChange={search} />
      {query.length > 0 && shown.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No countries found, try another search term...
        </Text>
      ) : (
        <FlatList
          data={shown}
          keyExtractor={(item) => item.name.common}
          renderItem={({ item }) => (
            <Pressable
              style={styles.countryContainer}
              onPress={() =>
                router.push({
                  pathname: "/country/[code]",
                  params: { code: item.cca2 },
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.flags.png }}
                  style={{ width: 60, height: 40, marginRight: 10 }}
                />
                <Text>{item.name.common}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  countryContainer: {
    backgroundColor: "#d4f8ff",
    height: "auto",
    borderRadius: 20,
    margin: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
