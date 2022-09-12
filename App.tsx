import { NavigationContainer } from "@react-navigation/native";
import { Menu, Pad } from "./src/components";
import { ColorTheme, toggleTheme } from "./src/config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { useAsyncStorage } from "./src/hooks";

export default function App() {
  const Stack = createNativeStackNavigator();
  let defaultTheme = useColorScheme();
  const [theme, setTheme] = useAsyncStorage(
    "theme",
    defaultTheme === "light" ? true : false
  );
  const [customAccent, setCustomAccent] = useAsyncStorage(
    "customAccent",
    toggleTheme(theme, "accent")
  );
  const [language, setLanguage] = useAsyncStorage("language", "PT-br");

  return (
    <ColorTheme theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calculator">
          <Stack.Screen
            name="Calculator"
            options={{
              headerStyle: {
                backgroundColor: customAccent,
              },
              headerTintColor: toggleTheme(theme, "bg"),
            }}
          >
            {(props) => (
              <Pad
                {...props}
                isLight={theme}
                language={language}
                customAccent={customAccent}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Menu"
            options={{
              headerStyle: {
                backgroundColor: customAccent,
              },
              headerTintColor: toggleTheme(theme, "bg"),
            }}
          >
            {(props) => (
              <Menu
                {...props}
                isLight={theme}
                changeTheme={() => setTheme(!theme)}
                setLanguage={setLanguage}
                setCustomAccent={setCustomAccent}
                customAccent={customAccent}
                language={language}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ColorTheme>
  );
}
