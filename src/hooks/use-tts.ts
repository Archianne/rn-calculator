import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

export const useTts = (textOnDisplay: string) => {
  const options = {
    language: "EN-uk",
  };

  Speech.speak(textOnDisplay, options);
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
