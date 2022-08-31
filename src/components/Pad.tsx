import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../config";
import { useCalculator } from "../hooks/use-calculator";
import { digits } from "../lib/digits";

export default function Pad(theme: { theme: boolean }) {
  let isLight = theme.theme;
  const { values, handleAllFunctions, roundedValue } = useCalculator();

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
          onPress={() => handleAllFunctions(digit)}
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
  );
}
