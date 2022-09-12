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
      flex: 1,
      width: "100%",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      position: "absolute",
      left: 0,
      paddingHorizontal: 20,
    },

    menuIcon: {
      color: toggleTheme(isLight, "neutral"),
    },

    volumeIcon: {
      marginTop: 25,
      marginLeft: 5,
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

    secondary: {
      backgroundColor: toggleTheme(isLight, "toggle"),
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
    main: {
      flex: 1,
      backgroundColor: toggleTheme(isLight, "bg"),
      maxWidth: "100%",
    },

    container: {
      marginTop: 20,
      width: "100%",
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
      marginVertical: 10,
    },

    optionText: {
      color: toggleTheme(isLight, "text"),
      fontSize: 20,
    },

    colors: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    colourButton: {
      backgroundColor: "red",
      width: 60,
      height: 60,
      borderRadius: 50,
      margin: 12,
    },
  });
