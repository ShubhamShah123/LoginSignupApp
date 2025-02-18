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
import { data } from "@/data/workoutSchedule";

export default function ContactScreen() {
  const router = useRouter();
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const getDetails = (id: any) => {
    alert("Workout ID: " + id);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => getDetails(item.id)} style={({ pressed }) => [styles.dataItem, pressed && styles.pressedItem]}>
      <Text style={styles.dataText}>{item.day} - {item.name}</Text>
    </Pressable>
  );

  return (
    <ImageBackground
            source={require("../assets/images/home_background.jpg")}
            style={styles.background}
            resizeMode="cover"
          >
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
      backgroundColor: 'rgba(0,0,0,0.8)',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    listContainer: {
      flexGrow: 1,
      paddingTop: 20,
      paddingBottom: 80,
    },
    dataItem: {
      
    //   paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 10,
      marginBottom: 10,
      padding: 25,
      borderBottomColor: '#FFA500',
      borderBottomWidth: 1,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40
    },
    pressedItem: {
      backgroundColor: colorScheme === "dark" ? "#1F1F1F" : "#E0E0E0",
    },
    dataText: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "100",
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
        marginTop: 10,
        width: 200,
        alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "100",
    },
  });
}
