import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  StyleSheet, 
  StatusBar, 
  BackHandler 
} from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from "expo-router";

interface SignupData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const SignupPart1 = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      router.push('/');
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleSignup = () => {
    if (!firstName || !lastName || !phoneNumber) {
      alert('Please fill all fields');
      return;
    }

    const signupData: SignupData = {
      firstName,
      lastName,
      phoneNumber,
    };

    router.push({
      pathname: '/signup',
      params: signupData
    });
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
            <Text style={styles.title}>Signup</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="wpforms" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#666"
                  keyboardType="default"
                  autoCapitalize="words"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="wpforms" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#666"
                  autoCapitalize="words"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contact Number</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome5 name="phone" size={16} color="#FFA500" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#666"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
              <Text style={styles.signInText}>Next</Text>
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

export default SignupPart1;