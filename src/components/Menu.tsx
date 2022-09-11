import { styles, menuStyles, toggleTheme } from "../config";
import { PadValues } from "../lib/types";
import {
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";

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
          trackColor={{ false: "#767577", true: "#46D5B2" }}
          thumbColor={toggleTheme(isLight, "toggle")}
          onValueChange={onSwitchValueChange}
        />
      )}
    </TouchableOpacity>
  );
};

const Menu = ({
  isLight,
  changeTheme,
  setLanguage,
  language,
  setCustomAccent,
}: PadValues) => {
  const [langClick, setLangClick] = useAsyncStorage("boolean", false);

  useEffect(() => {
    langClick ? setLanguage("EN-uk") : setLanguage("PT-br");
  }, [langClick]);

  return (
    <SafeAreaView style={styles(isLight).main}>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>Preferences</Title>
        <Options
          isLight={isLight}
          switchValue={!isLight}
          onSwitchValueChange={changeTheme}
          withSwitch
        >
          Change theme
        </Options>

        <Options
          isLight={isLight}
          switchValue={langClick}
          onSwitchValueChange={() => setLangClick(!langClick)}
          withSwitch
        >
          Language
        </Options>
      </View>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>Preferences</Title>
        <Options
          isLight={isLight}
          switchValue={!isLight}
          onSwitchValueChange={changeTheme}
          withSwitch
        >
          Change theme
        </Options>

        <Options
          isLight={isLight}
          switchValue={langClick}
          onSwitchValueChange={() => setLangClick(!langClick)}
          withSwitch
        >
          Language
        </Options>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
