import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'; // Correct import
import { supabase } from '../../Utils/supabaseConfig';

const LessonChooseItem = () => {
  const route = useRoute(); 
  const lesson = route.params; 

  const [lessonDetails, setLessonDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate fetching lesson details based on the lesson name
  //   setLessonDetails([`Details for ${lesson.selectedLesson}`]);
  //   console.log(lesson);
  // }, [lesson]);

  useEffect(() => {
    // Fetch lesson details from Supabase
    const fetchLessonDetails = async () => {
      try {
        
        // map and print all data in lesson obj
        // {Object.entries(lesson).map(([key, value]) => (
        //   console.log(`${key} ${value}`)
        // ))}

        console.log(`lesson is ${lesson.selectedLesson}`);

        const { data: lessons , error } = await supabase
          .from('lessons') // Replace with your Supabase table name
          .select('*') // Select the necessary fields
          .eq('title', lesson.selectedLesson); // Filter by lesson ID or name
        
        if (error) {
          console.error('Error fetching lesson details:', error);
          return;
        }

        setLessonDetails(lessons || []); // Set the lesson details to the fetched data
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchLessonDetails();
  }, [lesson]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderLessonItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardBody}>{item.body}</Text>
      <Text style={styles.cardCompleted}>
        {item.completed ? 'Completed' : 'Not Completed'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lessonDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLessonItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    paddingTop: 50, // Add padding to avoid overlap

    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBody: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardCompleted: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default LessonChooseItem;
