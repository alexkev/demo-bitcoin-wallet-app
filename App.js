import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";

// Workaround for expo snack & expo router issue: https://github.com/expo/snack/issues/459
export default function ExpoRouterApp() {
  return (
    <Head.Provider>
      <ExpoRoot context={require.context("./app", true)} location="/" />
    </Head.Provider>
  );
}