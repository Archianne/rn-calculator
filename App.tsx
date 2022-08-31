import { useState } from "react";
import { SafeAreaView, StyleSheet, Switch } from "react-native";
import { Pad } from "./src/components";
import { ColorTheme, toggleTheme } from "./src/config";

export default function App() {
  const [theme, setTheme] = useState(true);

  return (
    <ColorTheme theme={theme}>
      <SafeAreaView style={styles(theme).container}>
        <Switch
          value={theme === false}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setTheme(!theme)}
          style={styles().switch}
        />

        <Pad theme={theme} />
      </SafeAreaView>
    </ColorTheme>
  );
}

const styles = (isLight?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: toggleTheme(isLight, "bg"),
      alignItems: "center",
      justifyContent: "flex-start",
    },

    switch: {
      alignSelf: "flex-end",
      margin: 25,
    },
  });
