import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { Menu, Pad } from "./src/components";
import { ColorTheme, toggleTheme } from "./src/config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [theme, setTheme] = useState(true);

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
            {(props) => <Pad {...props} isLight={theme} />}
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
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ColorTheme>
  );
}
