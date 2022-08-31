import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { Pad } from "./src/components";
import { ColorTheme, toggleTheme } from "./src/config";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Menu() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();
  const [theme, setTheme] = useState(true);

  return (
    <ColorTheme theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Calculator">
          {/* <Switch
              value={theme === false}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={theme ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => setTheme(!theme)}
              style={styles().switch}
            /> */}
          <Stack.Screen name="Calculator">
            {(props) => <Pad {...props} theme={theme} />}
          </Stack.Screen>
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Navigator>
      </NavigationContainer>
    </ColorTheme>
  );
}
