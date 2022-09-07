import { createContext } from "react";
export const ThemeContext = createContext(true);

//if true: light mode //if false: dark mode
export const ColorTheme = (props: { theme: boolean; children: any }) => {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// export const toggleTheme = (isLight?: boolean, object?: string) => {
//   return isLight ? lightMode[`${object}`] : darkMode[`${object}`];
// };

function isPropertyOfLightMode(
  property: any
): property is keyof typeof lightMode {
  return Object.hasOwn(lightMode, property);
}

function isPropertyOfDarkMode(
  property: any
): property is keyof typeof darkMode {
  return Object.hasOwn(darkMode, property);
}

export const toggleTheme = (isLight?: boolean, object?: string) => {
  const property = `${object}`;

  if (isLight && isPropertyOfLightMode(property)) return lightMode[property];
  else if (!isLight && isPropertyOfDarkMode(property))
    return darkMode[property];
  else throw new Error(`Invalid property ${property}`);
};

const lightMode = {
  white: "#f5f5f5",
  black: "#333",
  important: "#8b0000",
  bg: "#F1F2F3",
  text: "#17171C",
  button: "white",
  buttonFeedback: "#4B5EFC",
  accent: "#4B5EFC",
  neutral: "#878787",
  toggle: "#4B5EFC",
};

const darkMode = {
  white: "#f5f5f5",
  black: "#333",
  important: "#8b0000",
  bg: "#17171C",
  text: "#F1F2F3",
  button: "black",
  buttonFeedback: "#46D5B2",
  accent: "#46D5B2",
  neutral: "#51525b",
  toggle: "#F1F2F3",
};
