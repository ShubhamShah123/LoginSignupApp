import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const HomeScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const logOut = async () => {
    console.log("Logout clicked!")
    setSidebarVisible(false)
    await AsyncStorage.removeItem('key');
    router.push('/login')
  }

  useEffect(() => {
    console.log("This executes first!")

  });
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/home_background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Pressable
          style={styles.menuButton}
          onPress={() => setSidebarVisible(true)}
        >
          <Icon name="bars" size={30} color="#FFF" />
        </Pressable>

        {/* <Text style={styles.greeting}>Welcome, Username</Text> */}
        {/* <Text style={styles.question}>How are you doing?</Text> */}

        <View style={styles.activityContainer}>
          <Pressable 
          style={styles.activityCard}
          onPress={() => {
                      router.push('/workoutSchedule')
                    }}>
            <Icon
              name="calendar-alt"
              size={30}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.activityText}>Workout Schedule</Text>
          </Pressable>
          <Pressable style={styles.activityCard}
          onPress={() => alert("Meals")}>
            <Icon
              name="utensils"
              size={30}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.activityText}>Meals Information</Text>
          </Pressable>
          <Pressable style={styles.activityCard}
          onPress={() => alert("Start Workout")}
            >
            <Icon
              name="clock"
              size={30}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.activityText}>Start Workout</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <Modal
        // animationType="slide"
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        transparent={true}
        visible={sidebarVisible}
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebar}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setSidebarVisible(false)}
          >
            <Icon name="times" size={30} color="#FFA500" />
          </Pressable>

          <Pressable style={styles.sidebarItem}
          onPress={()=>{
                      setSidebarVisible(false)
                      router.push('/profile')
                    }}>
            <Icon name="user" size={25} color="#FFA500" style={styles.icon} />
            <Text style={styles.sidebarText}>Profile</Text>
          </Pressable>

          <Pressable style={styles.sidebarItem}>
            <Icon
              name="chart-line"
              size={25}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.sidebarText}>Progress Tracker</Text>
          </Pressable>

          <Pressable style={styles.sidebarItem}
          onPress={()=>{
            setSidebarVisible(false)
            router.push('/history')
          }}>
            <Icon
              name="history"
              size={25}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.sidebarText}>Get History</Text>
          </Pressable>

          <Pressable style={styles.sidebarItem}
            onPress={logOut}
          >
            <Icon
              name="sign-out-alt"
              size={25}
              color="#FFA500"
              style={styles.icon}
            />
            <Text style={styles.sidebarText}>Logout</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  greeting: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "300",
    textAlign: "left",
    marginBottom: 20,
  },
  closeButton: {
    marginBottom: 20,
  },
  activityContainer: {
    width: "90%",
    alignItems: "center",
  },
  activityCard: {
    backgroundColor: "rgba(0,0,0,0.7)", // Darker, sleek background
    borderRadius: 12,
    borderColor: "#FFD700", // Gold outline for a premium feel
    borderWidth: 1,
    padding: 40,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: 15,
  },
  activityText: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#111", // Darker for a sleek look
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    borderRightColor: "#FFA500",
    borderTopColor: "#FFA500",
    borderBottomColor: "#FFA500",
    width: "75%",
    position: "absolute",
    height: "100%",
    left: 0,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFA500", // Placeholder color
    marginBottom: 10,
  },
  profileName: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "#111", // Subtle contrast
    borderWidth: 1,
    borderBottomColor: "#FFA500",
    borderBottomWidth: 0.5,
    borderBottomRightRadius: 25,
  },
  sidebarText: {
    color: "#E0E0E0", // Softer white for better contrast
    fontSize: 18,
    fontWeight: "100",
    marginLeft: 15,
  },
});
