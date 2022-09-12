import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { InputItem } from "../lib/digits";
import { ValuesState } from "../lib/types";

export const useTts = (values: any, language?: string, volume?: boolean) => {
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
    let fixedValue: string;

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
      default:
        break;
    }
  }

  useEffect(() => getItem(item), [values]);

  const options = {
    language: language,
  };

  useEffect(() => {
    volume && Speech.speak(speak, options);
  }, [speak, volume]);

  return [setItem];
};
