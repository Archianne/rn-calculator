import { useEffect } from "react";
import { styles, menuStyles, toggleTheme } from "../config";
import { PadValues } from "../lib/types";
import {
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { colors } from "../lib/colors";

const Title = ({ children, isLight }: PadValues) => {
  return (
    <View style={menuStyles(isLight).titleSeparator}>
      <Text style={menuStyles(isLight).title}>{children}</Text>
    </View>
  );
};

const Options = ({
  children,
  isLight,
  switchValue,
  withSwitch,
  onSwitchValueChange,
  customAccent,
}: PadValues) => {
  return (
    <TouchableOpacity
      style={menuStyles(isLight).option}
      onPress={onSwitchValueChange}
    >
      <Text style={menuStyles(isLight).optionText}>{children}</Text>

      {withSwitch && (
        <Switch
          value={switchValue}
          trackColor={{ false: "#767577", true: "#b0b0b0" }}
          thumbColor={customAccent}
          onValueChange={onSwitchValueChange}
        />
      )}
    </TouchableOpacity>
  );
};

const PickColour = ({ isLight, setCustomAccent }: PadValues) => {
  return (
    <View style={menuStyles(isLight).colors}>
      {colors.map((color) => (
        <TouchableOpacity
          style={[menuStyles(isLight).colourButton, { backgroundColor: color }]}
          onPress={() => setCustomAccent(color)}
        />
      ))}
    </View>
  );
};

const Menu = ({
  isLight,
  changeTheme,
  setLanguage,
  setCustomAccent,
  customAccent,
}: PadValues) => {
  const [langClick, setLangClick] = useAsyncStorage("boolean", false);

  useEffect(() => {
    langClick ? setLanguage("EN-uk") : setLanguage("PT-br");
  }, [langClick]);

  return (
    <SafeAreaView style={styles(isLight).main}>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>{langClick ? "Language" : "Idioma"}</Title>

        <Options
          isLight={isLight}
          switchValue={langClick}
          customAccent={customAccent}
          onSwitchValueChange={() => setLangClick(!langClick)}
          withSwitch
        >
          {langClick ? "English" : "Português"}
        </Options>
      </View>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>{langClick ? "Theme" : "Tema"}</Title>
        <Options
          isLight={isLight}
          switchValue={!isLight}
          customAccent={customAccent}
          onSwitchValueChange={changeTheme}
          withSwitch
        >
          {langClick ? "Change Theme" : "Troque o tema"}
        </Options>
      </View>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>{langClick ? "Colours" : "Cores"}</Title>
        <PickColour isLight={isLight} setCustomAccent={setCustomAccent} />
      </View>
    </SafeAreaView>
  );
};

export default Menu;
