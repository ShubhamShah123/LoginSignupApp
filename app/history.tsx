import { Fontisto } from "@expo/vector-icons";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Appearance,
  FlatList,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { parse } from "@babel/core";

export default function ContactScreen() {
  const router = useRouter();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const [historyData, setHistoryData] = useState([]);


  useEffect(() => {
    const getHistory = async () => {
	 console.log("History Page");
	 const ip = "192.168.224.36:8080";
	 const url = "http://" + ip + "/get_history";
	 try {
	   const response = await fetch(url, { method: "GET" });
	   const data = await response.json();
	   if (data.status_code === 200) {
		setHistoryData(data.data);
	   }
	 } catch (error) {
	   console.error("Error fetching history:", error);
	 }
    };
    getHistory();
  }, []);

  const getDetails = (key) => {
    console.log("Workout Key: ", key)
	router.push(`/historyDate/${key}`);  // Redirect to the id page
  };

  const renderItem = ({ item }) => (
    <Pressable
	 onPress={() => getDetails(item.key)}
	 style={({ pressed }) => [styles.dataItem, pressed && styles.pressedItem]}
    >
	 <Text style={styles.dataText}>{item.histVal}</Text>

    </Pressable>
  );

  return (
    <ImageBackground
	 source={require("../assets/images/home_background.jpg")}
	 style={styles.background}
	 resizeMode="cover"
    >
	 <SafeAreaView style={styles.container}>
	   <View style={styles.listWrapper}>
		<FlatList
		  data={historyData}
		  renderItem={renderItem}
		  keyExtractor={(item) => item.key}
		  contentContainerStyle={styles.listContainer}
		/>
	   </View>
	   <View style={styles.buttonContainer}>
		<TouchableOpacity
		  style={styles.button}
		  onPress={() => router.push("/login")}
		>
		  <Text style={styles.buttonText}>BACK</Text>
		</TouchableOpacity>
	   </View>
	 </SafeAreaView>
    </ImageBackground>
  );
}

function createStyles(theme, colorScheme) {
	return StyleSheet.create({
	  background: {
		...StyleSheet.absoluteFillObject,
	  },
	  container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.8)",
		paddingHorizontal: 16,
		paddingTop: 40,
		textAlign: 'center',
	  },
	  listWrapper: {
		flex: 1,
		marginBottom: 150, // Ensures list doesn't overflow the button
	  },
	  listContainer: {
		flexGrow: 1,
		paddingTop: 20,
	  },
	  dataItem: {
		paddingHorizontal: 16,
		borderRadius: 10,
		marginBottom: 10,
		padding: 25,
		borderBottomColor: "#FFA500",
		borderBottomWidth: 1,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		justifyContent: "center", // Ensure content is centered within each item
		alignItems: "center", // Center content horizontally
	  },
	  pressedItem: {
		backgroundColor: colorScheme === "dark" ? "#1F1F1F" : "#E0E0E0",
	  },
	  dataText: {
		color: theme.text,
		fontSize: 18,
		fontWeight: "100",
		textAlign: "center", // Center align the text
	  },
	  buttonContainer: {
		position: "absolute",
		bottom: 30,
		left: 0,
		right: 0,
		alignItems: "center",
	  },
	  button: {
		backgroundColor: "black",
		borderWidth: 2,
		borderColor: "#FFA500",
		padding: 20,
		borderRadius: 10,
		width: 200,
		alignItems: "center",
	  },
	  buttonText: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "100",
		textAlign: "center", // Center align the button text
	  },
	});
  }
  
