import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useCalculator, useTts } from "../hooks";
import { styles } from "../config";
import { digits, PadValues } from "../lib";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const Pad = ({ isLight, navigation, language, customAccent }: PadValues) => {
  const { values, handleAllFunctions, roundedValue } = useCalculator();
  const [volume, setVolume] = useState(true);
  const [setItem] = useTts(values, language, volume);

  //useEffect(() => console.log(volume));

  const chooseButtonStyle = (type: string) => {
    switch (type) {
      case "operator":
        return {
          backgroundColor: customAccent,
          color: "black",
        };
      case "equal":
        return {
          backgroundColor: customAccent,
          color: "black",
        };
      case "number":
        return styles(isLight).number;
      case "clear":
        return styles(isLight).clear;
      default:
        return styles(isLight).secondary;
    }
  };

  return (
    <SafeAreaView style={styles(isLight).main}>
      <TouchableOpacity
        style={styles().menu}
        onPress={() => navigation.navigate("Menu")}
      >
        <MaterialCommunityIcons
          name="settings-helper"
          size={50}
          style={styles(isLight).menuIcon}
        />
        {/* //volume */}
        <TouchableOpacity onPress={() => setVolume(!volume)}>
          {volume ? (
            <Feather
              name="volume-2"
              size={42}
              style={[styles(isLight).volumeIcon, { color: customAccent }]}
            />
          ) : (
            <Feather
              name="volume"
              size={40}
              style={styles(isLight).volumeIcon}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={[styles().container, styles().viewBottom]}>
        <View style={styles().display}>
          <Text
            ellipsizeMode="head"
            numberOfLines={2}
            style={styles(isLight).equationText}
          >
            {values.equation}
            {values.display}
          </Text>
        </View>
        <View style={styles(isLight).display}>
          <Text
            style={styles(isLight).resultText}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {roundedValue(values.result, 3)}
          </Text>
        </View>
        {digits.map((digit, index) => (
          <TouchableOpacity
            key={index}
            style={[chooseButtonStyle(digit.type), styles(isLight).digits]}
            onPress={() => {
              handleAllFunctions(digit);
              setItem(digit);
            }}
          >
            <Text
              style={
                digit.type === "number"
                  ? styles(isLight).smallTextLight
                  : styles(isLight).smallTextDark
              }
            >
              {digit.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Pad;
