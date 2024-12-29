import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const LessonChooseItem = ({ route }) => {
  const { lessonTitle, lessonDetails } = route.params;

  if (!lessonDetails || lessonDetails.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No lesson details available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{lessonTitle}</Text>
      <FlatList
        data={lessonDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonCardTitle}>{item.lessons.title}</Text>
            <Text style={styles.lessonCardBody}>{item.lessons.body}</Text>
            <Text
              style={[
                styles.lessonCardStatus,
                item.completed ? styles.completed : styles.notCompleted,
              ]}
            >
              {item.completed ? 'Completed' : 'Not Completed'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'purple',
  },
  lessonCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonCardBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  lessonCardStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  completed: {
    color: 'green',
  },
  notCompleted: {
    color: 'red',
  },
});

export default LessonChooseItem;
