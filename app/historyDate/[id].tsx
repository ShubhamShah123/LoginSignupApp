import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HistoryDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();  // Get the id parameter from the URL
  const [historyDetail, setHistoryDetail] = useState(null);
  const parseDate = (argdate: string) => {
    // Parse the input string to a Date object
    const date = new Date(argdate);
  
    // Ensure the date is in local time
    const options: Intl.DateTimeFormatOptions = { 
      month: "long", 
      day: "2-digit" 
    };
  
    // Get the date string for the local timezone
    return date.toLocaleDateString("en-US", options);
  };
  // Fetch history details from the Flask API
  useEffect(() => {
    const getHistoryDetail = async () => {
      if (!id) return;

      const ip = "192.168.224.36:8080";  // Replace with actual IP
      const url = `http://${ip}/get_history_details/${id}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status_code === 200) {
          setHistoryDetail(data.data[0]);  // Assuming the data has the history object
        } else {
          console.error("Error fetching history details:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching history details:", error);
      }
    };
    getHistoryDetail();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        {historyDetail ? (
          <>
            <Text style={styles.header}>{historyDetail.name}</Text>
            <Text style={styles.subHeader}>{historyDetail.day} - {historyDetail.date}</Text>
            <Text style={styles.text}>Total Time: {historyDetail.totalTimeTaken}</Text>
            <Text style={styles.subHeader}>Exercises:</Text>
            {Object.entries(historyDetail.exercise).map(([exercise, status]) => (
              <View key={exercise} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise}</Text>
                <Text style={styles.exerciseStatus}>{status}</Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
        <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to History</Text>
      </TouchableOpacity>
      </ScrollView>

      {/* Fixed Back Button */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,  // Increase top padding for spacing from the status bar
    paddingHorizontal: 16,
    backgroundColor: '#111',
  },
  content: {
    paddingBottom: 100,  // Increased space for the button at the bottom
  },
  header: {
    fontSize: 24,
    fontWeight: '100',
    marginBottom: 30,
    marginTop: 20,
    color: 'white',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 5,
    color: 'white',
    // marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '100',
    marginBottom: 5,
    color: 'white',
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    margin: 15,
  },
  exerciseName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '100',
  },
  exerciseStatus: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFA500', // Yellow color for status
  },
  backButton: {
    backgroundColor: 'black',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#FFA500',
    // marginBottom: 20,
    position: 'absolute',
    bottom: 20,  // Keep the button at the bottom of the screen
    left: '50%',
    transform: [{ translateX: -100 }],  // Center align the button
    width: 200,
    alignItems: 'center',
    
  },
  backButtonText: {
    color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "100",
		textAlign: "center",
  },
});
