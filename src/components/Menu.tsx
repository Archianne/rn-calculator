import { styles, menuStyles, toggleTheme } from "../config";
import { PadValues } from "../lib/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Title = ({ children, isLight }: PadValues) => {
  return (
    <View style={menuStyles(isLight).titleSeparator}>
      <Text style={menuStyles(isLight).title}>{children}</Text>
    </View>
  );
};

const Options = ({ children, isLight, withSwitch, changeTheme }: PadValues) => {
  return (
    <TouchableOpacity style={menuStyles(isLight).option} onPress={changeTheme}>
      <Text style={menuStyles(isLight).optionText}>{children}</Text>

      {withSwitch && (
        <Switch
          value={isLight === false}
          trackColor={{ false: "#767577", true: "#46D5B2" }}
          thumbColor={toggleTheme(isLight, "toggle")}
          onValueChange={changeTheme}
        />
      )}
    </TouchableOpacity>
  );
};

const Menu = ({ isLight, changeTheme }: PadValues) => {
  return (
    <SafeAreaView style={styles(isLight).main}>
      <View style={menuStyles(isLight).container}>
        <Title isLight={isLight}>Preferences</Title>
        <Options isLight={isLight} changeTheme={changeTheme} withSwitch>
          Change theme
        </Options>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
