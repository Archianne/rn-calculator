import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

export const useTts = (values: any) => {
  const [item, setItem] = useState("");
  const [speak, setSpeak] = useState("");

  //  item: { type: "delete", value: "del", title: "⌫" },

  function getItem(item: any) {
    switch (item.type) {
      case "number":
        setSpeak(values.display);
        break;
      case "operator":
        if (values.operator === "+") setSpeak("plus");
        if (values.operator === "-") setSpeak("minus");
        if (values.operator === "*") setSpeak("times");
        if (values.operator === "/") setSpeak("divided by");
        break;
      case "+/-":
        setSpeak(values.display);
        break;
      case "percentage":
        break;
      case "equal":
        setSpeak("equals" + values.result);
        break;
      default:
        break;
    }
  }

  useEffect(() => getItem(item), [values.display]);

  const options = {
    language: "EN-uk",
  };

  // useEffect(() => setSpeak(values.display), [values.display]);
  useEffect(() => Speech.speak(speak, options), [speak]);

  return [setItem];

  //if (action.type === "number") Speech.speak(values.display, options);

  // if (!values.waitingForOperand && values.display.length > 0)
  //   useTts(values.display);
  // else if (values.waitingForOperand && values.operator) useTts(values.operator);

  //   if (action === "=") Speech.speak("=", options);

  //   if (values.waitingForOperand && values.operator) {
  //     Speech.speak(values.operator, options);
  //   } else if (!values.waitingForOperand && values.display.length > 0) {
  //     Speech.speak(values.display, options);
  //   }
};

// export const useTts = (textOnDisplay: string) => {
//   useEffect(() => {
//     console.log(textOnDisplay);
//   }, [textOnDisplay]);

//   const options = {
//     language: "EN-uk",
//   };

//   Speech.speak(textOnDisplay, options);
// };
