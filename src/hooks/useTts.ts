import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { InputItem } from "../lib/digits";
import { ValuesState } from "../lib/types";

export const useTts = (values: any, language?: string) => {
  const [item, setItem] = useState({} as InputItem);
  const [speak, setSpeak] = useState("");

  function defineTextToRead(en: string, pt: string) {
    if (language === "EN-uk") return en;
    else if (language === "PT-br") return pt;
    else return "";
  }

  function defineSpeechForOperator(values: ValuesState) {
    let operatorWord: string = "";
    switch (values.operator) {
      case "+":
        operatorWord = defineTextToRead("Plus", "Mais");
        break;
      case "-":
        operatorWord = defineTextToRead("Minus", "Menos");
        break;
      case "/":
        operatorWord = defineTextToRead("Divided by", "Dividido por");
        break;
      case "*":
        operatorWord = defineTextToRead("Times", "Vezes");
        break;
      default:
        break;
    }

    console.log(values);

    values.pressedEqual
      ? setSpeak("equals" + values.result + ". " + operatorWord)
      : setSpeak(operatorWord);
  }

  function getItem(item: any) {
    switch (item.type) {
      case "number":
        setSpeak(values.display);
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
        if (values.result < 0)
          setSpeak(
            defineTextToRead("equals minus", "é igual a menos") + values.result
          );
        else setSpeak(defineTextToRead("equal", "é igual a") + values.result);
        break;
      default:
        break;
    }
  }

  useEffect(() => getItem(item), [values]);

  const options = {
    language: language,
  };

  useEffect(() => Speech.speak(speak, options), [speak]);

  return [setItem];
};
