import { StyleSheet } from "react-native";
import { toggleTheme } from "./ThemeContext";

export const styles = (isLight?: boolean) =>
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: toggleTheme(isLight, "bg"),
      alignItems: "center",
      justifyContent: "flex-start",
    },

    menu: {
      position: "absolute",
      left: 0,
      paddingHorizontal: 20,
    },

    menuIcon: {
      color: toggleTheme(isLight, "neutral"),
    },

    container: {
      marginTop: 8,
      flexDirection: "row",
      flexWrap: "wrap",
      width: "90%",
    },

    smallTextDark: {
      fontSize: 32,
      color: "white",
    },

    number: {
      backgroundColor: toggleTheme(isLight, "button"),
    },

    operators: {
      backgroundColor: toggleTheme(isLight, "accent"),
      color: "black",
    },

    secondary: {
      backgroundColor: toggleTheme(isLight, "neutral"),
    },

    clear: {
      backgroundColor: toggleTheme(isLight, "important"),
    },

    digits: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: "19%",
      justifyContent: "center",
      alignItems: "center",
      width: 72,
      height: 72,
      margin: "2%",
      borderRadius: 24,
    },

    smallTextLight: {
      fontSize: 32,
      color: toggleTheme(isLight, "text"),
    },

    viewBottom: {
      position: "absolute",
      bottom: 50,
    },

    display: {
      width: "95%",
    },

    resultText: {
      color: toggleTheme(isLight, "text"),
      fontWeight: "300",
      alignSelf: "flex-end",
      fontSize: 96,
    },

    equationText: {
      fontSize: 50,
      color: toggleTheme(isLight, "neutral"),
      fontWeight: "300",
      alignSelf: "flex-end",
      paddingRight: 10,
    },
  });

export const menuStyles = (isLight?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      width: "100%",
      alignItems: "flex-start",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },

    titleSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: "#428947",
      marginBottom: 20,
      width: "100%",
    },

    title: {
      fontSize: 25,
      fontWeight: "500",
      color: toggleTheme(isLight, "text"),
    },

    option: {
      // backgroundColor: toggleTheme(!isLight, "bg"),
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },

    optionText: {
      color: toggleTheme(isLight, "text"),
      fontSize: 20,
    },
  });
