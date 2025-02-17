import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, StatusBar, BackHandler } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from "expo-router"; // Import router for navigation
import { enableScreens } from "react-native-screens";

enableScreens();
const Index = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Exit the app when the back button is pressed
      BackHandler.exitApp();
      return true; // Prevent default behavior (navigation)
    });

    // Cleanup on component unmount
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground 
        source={require("../assets/images/home_background.jpg")} 
        style={styles.background}
        resizeMode="cover"
      >
        <FontAwesome5 name="dumbbell" size={140} style={styles.iconStyle} />
        <Text style={styles.title}>MyFitness</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              console.log("Login Button Clicked");
              router.push('/login');  // Use router to navigate to login screen
            }}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              console.log("Signup Button Clicked")
              router.push('/signup');
            }}> 
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  iconStyle: {
    color: "#FFA500", 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 4, 
    borderBottomColor: '#FFA500',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 10
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "100",
    color: "#FFA500",
    textAlign: "center",
    letterSpacing: 2,
  },
  background: { 
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center", 
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: { 
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#FFA500",
    padding: 20, 
    borderRadius: 10, 
    marginTop: 10, 
    width: 200, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#FFA500", 
    fontSize: 20, 
    fontWeight: "100" 
  },
});

export default Index;
