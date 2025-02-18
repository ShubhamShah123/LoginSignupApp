import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  StatusBar,
  Alert
} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface SignupParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface UserData extends SignupParams {
  email: string;
  password: string;
  role: string;
}

const Signup = () => {
  const params = useLocalSearchParams<SignupParams>();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Password validation (minimum 8 characters, including numbers and special characters)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Error', 
        'Password must be at least 8 characters long and contain at least one number'
      );
      return;
    }

    const userData: UserData = {
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      role: 'client',
      email: email,
      password: password
    };

    const ip = "192.168.224.36:8080";
    const url = "http://" + ip + "/signup";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log("Response from server: " + JSON.stringify(data));

    if (data.status_code === 200) {
      // Successfully logged in, store the key
      alert(data.msg)
      await AsyncStorage.setItem('key', data.key);
      router.push('/login')
    } else {
      // Handle login failure
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground
        source={require("../assets/images/home_background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <FontAwesome5 name="dumbbell" size={40} color="#FFA500" style={styles.iconStyle} />
            <Text style={styles.title}>Complete Signup</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="envelope" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="my.fitness@gmail.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="lock" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="lock" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
              <Text style={styles.signInText}>Sign Up</Text>
              <FontAwesome5 name="arrow-right" size={16} color="#FFA500" />
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.signupLink}>Login now</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  label: {
    color: 'white',
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '100',
    marginLeft: 4,
    letterSpacing: 1,
  },
  iconStyle: {
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    borderBottomColor: '#FFA500',
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFA500',
    marginTop: 16,
    fontWeight: '200',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  signInButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#FFA500',
    fontSize: 16,
    marginRight: 8,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#FFF',
    fontSize: 14,
  },
  signupLink: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Signup;