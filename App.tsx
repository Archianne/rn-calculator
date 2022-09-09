import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { Menu, Pad } from "./src/components";
import { ColorTheme, toggleTheme } from "./src/config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAsyncStorage from "./src/hooks/useAsyncStorage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [theme, setTheme] = useState(true);
  const [language, setLanguage, retrivedFromStorage] = useAsyncStorage(
    "language",
    "PT-br"
  );

  console.log(retrivedFromStorage, language);

  return (
    <ColorTheme theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calculator">
          <Stack.Screen
            name="Calculator"
            options={{
              headerStyle: {
                backgroundColor: toggleTheme(theme, "accent"),
              },
              headerTintColor: toggleTheme(theme, "bg"),
            }}
          >
            {(props) => <Pad {...props} isLight={theme} language={language} />}
          </Stack.Screen>
          <Stack.Screen
            name="Menu"
            options={{
              headerStyle: {
                backgroundColor: toggleTheme(theme, "accent"),
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
                language={language}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ColorTheme>
  );
}
