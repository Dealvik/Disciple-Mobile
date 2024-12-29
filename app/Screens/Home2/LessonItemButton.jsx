import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../Utils/supabaseConfig';


const LessonItemButton = ({ lessonId, lessonTitle }) => {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      // Fetch levels for the selected lesson
      const { data: lessonDetails, error } = await supabase
        .from('user_lessons') 
        .select('id, lesson_id, completed, lessons(title, body)')
        .eq('lesson_id', lessonId);

      if (error) {
        console.error('Error fetching lesson details:', error);
        return;
      }

      if (!lessonDetails || lessonDetails.length === 0) {
        console.log('No lesson details available for this lesson');
      } else {
        console.log('Lesson Details:', lessonDetails); // Log the fetched data
      }

      // Navigate to LessonChooseItem screen with the fetched data
      navigation.navigate('LessonChooseItem', {
        lessonTitle, // Pass lesson title
        lessonDetails, // Pass fetched levels
      });
      console.log(`${lessonTitle} chosen!`);
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={handlePress} // Trigger fetch logic
        >
          <Text style={styles.buttonText}>{lessonTitle}</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'purple',
    padding: 20,
    borderRadius: 25,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
});

export default LessonItemButton;
