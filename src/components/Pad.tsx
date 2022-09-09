import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../config";
import { useCalculator } from "../hooks/use-calculator";
import { digits } from "../lib/digits";
import { PadValues } from "../lib/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTts } from "../hooks/use-tts";
import { useEffect } from "react";

const Pad = ({ isLight, navigation }: PadValues) => {
  const { values, handleAllFunctions, roundedValue } = useCalculator();
  const [setItem] = useTts(values);

  // if (!values.waitingForOperand && values.display.length > 0)
  //   useTts(values.display);
  // else if (values.waitingForOperand && values.operator) useTts(values.operator);

  const chooseButtonStyle = (type: string) => {
    switch (type) {
      case "operator":
        return styles(isLight).operators;
      case "equal":
        return styles(isLight).operators;
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
        {/* <Ionicons
          name="settings-outline"
          size={40}
          style={styles(isLight).menuIcon}
        /> */}
        <MaterialCommunityIcons
          name="settings-helper"
          size={50}
          style={styles(isLight).menuIcon}
        />
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
            {roundedValue(values.result, 2)}
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
