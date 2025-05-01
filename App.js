import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
  // Өмнөхөн кодыг ашиглахад:
  //   <PaperProvider>
  //   <NavigationContainer>
  //     <StatusBar barStyle="dark-content" />
  //     <AppNavigator />
  //   </NavigationContainer>
  // </PaperProvider>
}
