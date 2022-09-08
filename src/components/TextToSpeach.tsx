import { View, StyleSheet, Button } from "react-native";
import * as Speech from "expo-speech";
import { useEffect } from "react";

export default function TextToSpeech(props: { PT: boolean }) {
  const options = {
    language: props.PT ? "PT-br" : "EN-uk",
  };

  const speak = () => {
    const thingToSay = "eu gosto de manteiga";
    Speech.speak(thingToSay, options);
    console.log(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
