import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, StatusBar, BackHandler } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { enableScreens } from "react-native-screens";
import { router, useNavigation } from "expo-router";

enableScreens();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const navigation = useNavigation();
	
	useEffect(() => {
	const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		// Navigate directly to Index page instead of going back
		navigation.navigate('index');
		return true; // Prevent default behavior
	});

	// Cleanup the event listener on component unmount
	return () => backHandler.remove();
	}, [navigation]);
  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
		{/* Logo and Title Section */}
		<View style={styles.logoContainer}>
		  <FontAwesome5 name="dumbbell" size={40} color="#FFA500" style={styles.iconStyle} />
		  <Text style={styles.title}>Login</Text>
		</View>

		{/* Login Form */}
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

		  {/* Login Button */}
		  <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
		    <Text style={styles.signInText}>Sign In</Text>
		    <FontAwesome5 name="arrow-right" size={16} color="#FFA500" />
		  </TouchableOpacity>

		  <TouchableOpacity>
		    <Text style={styles.forgotPassword}>Forgot Password?</Text>
		  </TouchableOpacity>
		</View>

		{/* Social Media Links */}
		<View style={styles.socialContainer}>
		  <TouchableOpacity style={styles.socialButton}>
		    <FontAwesome5 name="google" size={20} color="#FFA500" />
		  </TouchableOpacity>
		  <TouchableOpacity style={styles.socialButton}>
		    <FontAwesome5 name="facebook-f" size={20} color="#FFA500" />
		  </TouchableOpacity>
		  <TouchableOpacity style={styles.socialButton}>
		    <FontAwesome5 name="twitter" size={20} color="#FFA500" />
		  </TouchableOpacity>
		</View>

		{/* Sign Up Link */}
		<View style={styles.signupContainer}>
		  <Text style={styles.signupText}>Don't have account? </Text>
		  <TouchableOpacity
		   onPress={() => {
			router.push('/signup');
		   }}> 
		    <Text style={styles.signupLink}>Sign up now</Text>
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
  label: {
	color: 'white',
	marginBottom: 8,
	fontSize: 18,
	fontWeight: '100',
	marginLeft: 4,
	letterSpacing: 1
   },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
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
  forgotPassword: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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

export default Login;