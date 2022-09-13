import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { InputItem } from "../lib/digits";
import { Operator } from "../lib/types";

export const useTts = (values: any, language?: string, volume?: boolean) => {
  const [item, setItem] = useState({} as InputItem);
  const [speak, setSpeak] = useState("");
  //useEffect(() => console.log(speak));

  function defineTextToRead(en: string, pt: string) {
    // console.log(language);
    if (language === "EN-gb") return en;
    else if (language === "PT-br") return pt;
    else return "";
  }

  function defineSpeechForOperator(operator: Operator) {
    let operatorWord: string = "";

    switch (operator) {
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

    values.pressedEqual
      ? setSpeak("equals" + values.result + ". " + operatorWord)
      : setSpeak(operatorWord);
  }

  function getItem(item: InputItem) {
    let fixedValue: string;

    switch (item.type) {
      case "number":
        setSpeak(values.display);
        break;
      case "operator":
        defineSpeechForOperator(values.operator);
        break;
      case "+/-":
        setSpeak(values.display);
        break;
      case "percentage":
        break;
      case "equal":
        if (values.result.toString().includes("."))
          fixedValue = values.result
            .toFixed(3)
            .replace(/\./g, defineTextToRead("point", "ponto"));
        else fixedValue = values.result;

        if (values.result < 0)
          setSpeak(
            defineTextToRead("equals minus", "é igual a menos") + fixedValue
          );
        else setSpeak(defineTextToRead("equals ", "é igual a ") + fixedValue);
        break;
      case "clear":
        Speech.stop();
      default:
        break;
    }
  }

  useEffect(() => getItem(item), [values]);

  useEffect(() => {
    volume &&
      Speech.speak(speak, {
        language: language,
      });
  }, [speak, volume]);

  return [setItem];
};
