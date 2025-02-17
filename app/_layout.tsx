import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Stack screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: theme.headerBackground },
      headerTintColor: theme.text,
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}
