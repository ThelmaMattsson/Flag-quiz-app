import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import FilterQuiz from "../../components/FilterQuiz";
import FinishedScreen from "../../components/FinishedQuizScreen";
import Spinner from "../../components/Spinner";
import { useCountries } from "../../hooks/useCountries";
import { useQuiz } from "../../hooks/useQuiz";

export default function Flagquiz() {
  const { countries, loading, error } = useCountries();
  const [showFilter, setShowFilter] = useState(false);

  const [region, setRegion] = useState<string>("All");
  const [amount, setAmount] = useState<number>(10);

  const [tempRegion, setTempRegion] = useState<string>(region);
  const [tempAmount, setTempAmount] = useState<number>(amount);

  const {
    quizCountries,
    current,
    options,
    questionIndex,
    score,
    wrongAnswers,
    selectedAnswer,
    quizFinished,
    startQuiz,
    generateQuestion,
    answer,
  } = useQuiz(countries);

  useEffect(() => {
    if (countries.length > 0) startQuiz(region, amount);
  }, [countries, region, amount]);

  useEffect(() => {
    if (current) generateQuestion();
  }, [current, quizCountries]);

  if (loading) {
    return (
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
        <Spinner />
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.container}>
        <Text>{error}</Text>
      </LinearGradient>
    );
  }

  if (!current) return <Spinner />;

  return (
    <LinearGradient
      colors={["#4facfe", "#00f2fe"]} // blå-turkos gradient
      style={styles.container}
    >
      {quizFinished ? (
        <FinishedScreen
          score={score}
          quizLength={quizCountries.length}
          onClick={() => {
            startQuiz(region, amount);
          }}
        />
      ) : (
        <View style={styles.quizContainer}>
          <Pressable
            style={styles.filterButton}
            onPress={() => setShowFilter(true)}
          >
            <Text>Filter</Text>
          </Pressable>
          <Modal visible={showFilter} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
              <FilterQuiz
                selectedRegion={tempRegion}
                selectedAmount={tempAmount}
                onSelectRegion={setTempRegion}
                onSelectAmount={setTempAmount}
                onApply={() => {
                  setRegion(tempRegion);
                  setAmount(tempAmount);
                  setShowFilter(false);
                  startQuiz(tempRegion, tempAmount);
                }}
                onClose={() => setShowFilter(false)}
              />
            </View>
          </Modal>

          <Text style={styles.title}>Which country is this?</Text>
          <Image source={{ uri: current.flags.png }} style={styles.flag} />
          <View style={styles.optionsContainer}>
            {options.map((opt) => (
              <Pressable
                style={[
                  styles.options,
                  selectedAnswer === opt &&
                    (opt === current.name.common
                      ? styles.correct
                      : styles.wrong),
                  selectedAnswer &&
                    opt === current.name.common &&
                    styles.correct,
                ]}
                key={opt}
                onPress={() => answer(opt)}
              >
                <Text style={{ fontSize: 20, textAlign: "center" }}>{opt}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={{ margin: 10 }}>
            {questionIndex + 1} / {quizCountries.length}
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              alignContent: "space-between",
              width: "90%",
              justifyContent: "space-between",
            }}
          >
            <Text>
              Right answers:{" "}
              <Text
                style={{ color: "#3fb730", fontWeight: "bold", fontSize: 20 }}
              >
                {score}
              </Text>
            </Text>
            <Text>
              Wrong answers:{" "}
              <Text
                style={{ color: "#be1111", fontWeight: "bold", fontSize: 20 }}
              >
                {wrongAnswers}
              </Text>
            </Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  flag: { width: 200, height: 120, marginVertical: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  filterButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 8,
    marginHorizontal: 30,
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  quizContainer: {
    backgroundColor: "#d4f8ff",
    width: "90%",
    height: "auto",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "95%",
  },
  options: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    height: 80,
    width: "47%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    boxShadow: "#000",
    shadowRadius: 4,
    elevation: 3,
  },
  correct: {
    backgroundColor: "#7cfc8a",
  },
  wrong: {
    backgroundColor: "#ff7c7c",
  },
});
