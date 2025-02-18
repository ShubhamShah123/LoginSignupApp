import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

enableScreens();
const Profile = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    height: number;
    weight: number;
    age: number;
    email?: string;
    phoneNumber?: string;
  } | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      console.log("Check Profile");
      const userData = await AsyncStorage.getItem("profile");
      if (userData) {
        const userJson = JSON.parse(userData)
        console.log(userJson)
        setUser(userJson);
      }
    };
    checkProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../assets/images/home_background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="user-circle" size={60} color="#FFF" />
          </View>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
            <Icon name="id-card" size={20} color="#FFA500" style={styles.icon} />
            <View>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoText}>
                {user?.firstName || 'Not provided'} {user?.lastName || 'Not provided'}
              </Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Icon name="envelope" size={20} color="#FFA500" style={styles.icon} />
            <View>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoText}>{user?.email || 'Not provided'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color="#FFA500" style={styles.icon} />
            <View>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoText}>{user?.phoneNumber || 'Not provided'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Back Button Clicked");
              router.push("/login");
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
    width: 25,
  },
  
  title: {
    fontSize: 32,
    fontWeight: "200",
    color: "#FFA500",
    textAlign: "center",
    letterSpacing: 1,
  },
  infoContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFA500'
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 165, 0, 0.4)',
  },
  infoLabel: {
    color: '#FFA500',
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
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
    alignItems: "center",
  },
  buttonText: {
    color: "#FFA500",
    fontSize: 20,
    fontWeight: "100",
  },
});

export default Profile;