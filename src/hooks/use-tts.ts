import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { InputItem } from "../lib/digits";
import { ValuesState } from "../lib/types";

export const useTts = (values: any) => {
  let operatorWord: string;
  const [item, setItem] = useState({} as InputItem);
  const [speak, setSpeak] = useState("");

  // console.log(item);
  // item: { type: "delete", value: "del", title: "⌫" },

  function defineSpeechForOperator(values: ValuesState) {
    if (values.operator === "+") operatorWord = "Plus";
    if (values.operator === "-") operatorWord = "Minus";
    if (values.operator === "*") operatorWord = "Times";
    if (values.operator === "/") operatorWord = "Divided by";

    values.pressedEqual
      ? setSpeak("equals" + values.result + ". " + operatorWord)
      : setSpeak(values.result + operatorWord);
  }

  function getItem(item: any) {
    console.log(values);
    switch (item.type) {
      case "number":
        setSpeak(item.title);
        break;
      case "operator":
        defineSpeechForOperator(values);
        break;
      case "+/-":
        setSpeak(values.display);
        break;
      case "percentage":
        break;
      case "equal":
        if (values.result < 0) setSpeak("equals minus" + values.result);
        else setSpeak("equals" + values.result);
        break;
      default:
        break;
    }
  }

  useEffect(() => getItem(item), [values]);

  const options = {
    language: "EN-uk",
  };

  useEffect(() => Speech.speak(speak, options), [speak]);

  return [setItem];
};
