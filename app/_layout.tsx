import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Appearance } from "react-native";

// Define theme interface
interface Theme {
  headerBackground: string;
  text: string;
}

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.headerBackground },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        // Add animation for transitions
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Index",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerShown: false,
          // Prevent going back to signup_part1
          headerBackVisible: false,
          // Make sure user can't go back using gesture
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="signup_part1"
        options={{
          title: "Sign Up Part 1",
          headerShown: false,
          // Allow going back to index
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          // Prevent going back to login/signup
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="adminHome"
        options={{
          title: "adminHome",
          headerShown: false,
          // Prevent going back to login/signup
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          // Prevent going back to login/signup
          headerBackVisible: true,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="workoutSchedule"
        options={{
          title: "workoutSchedule",
          headerShown: false,
          // Prevent going back to login/signup
          headerBackVisible: true,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          title: 'history',
          headerShown: false,
          // Prevent going back to login/signup
          headerBackVisible: true,
          gestureEnabled: false
        }} 
      />
      <Stack.Screen 
        name="/historyDate/[id]" 
        options={{ 
          title: 'historyDate/id',
          headerShown: false,
          headerBackVisible: true,
          gestureEnabled: false
        }} 
      />
    </Stack>
  );
}
