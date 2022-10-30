import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import React from "react";
import DrawerNavigation from "./src/components/drawer";
import { store, persistor } from "./src/store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DrawerNavigation />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
