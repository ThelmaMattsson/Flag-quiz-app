import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { fetchCountryByCode } from "../../api/countries";
import Spinner from "../../components/Spinner";
import { Country } from "../../types/Country";

export default function CountryScreen() {
  const { code } = useLocalSearchParams();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!code) return;

    fetchCountryByCode(code as string).then(setCountry);
  }, [code]);

  if (!country) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currency = country.currencies
    ? Object.values(country.currencies)[0].name
    : "N/A";

  return (
    <>
      <Stack.Screen
        options={{
          title: country.name.common,
          headerBackTitle: "Back",
          headerTransparent: true,
        }}
      />
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={{ uri: country.flags.png }} style={styles.flag} />

          <View style={styles.infoBox}>
            <View
              style={[
                styles.category,
                { borderTopWidth: 0.5, borderTopColor: "#ccc" },
              ]}
            >
              <Text>Capital</Text>
              <Text>{country.capital?.[0] ?? "N/A"}</Text>
            </View>
            <View style={styles.category}>
              <Text>Region</Text>
              <Text>{country.region}</Text>
            </View>
            <View style={styles.category}>
              <Text>Population</Text>
              <Text>{country.population?.toLocaleString() ?? "N/A"}</Text>
            </View>
            <View style={styles.category}>
              <Text>Languages</Text>
              <Text style={{ maxWidth: "40%", textAlign: "right" }}>
                {languages}
              </Text>
            </View>
            <View style={styles.category}>
              <Text>Currency</Text>
              <Text>{currency}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    backgroundColor: "#d4f8ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    width: "90%",
  },
  flag: {
    width: 220,
    height: 140,
    marginBottom: 20,
  },
  infoBox: {
    width: "90%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  category: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
});
