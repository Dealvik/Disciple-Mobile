import { View, Text, StyleSheet, SafeAreaView, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const LessonItemButton = ({lesson}) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {{
              navigation.navigate('LessonChooseItem', {
                selectedLesson: lesson
              })
              console.log(lesson + " chosen!")}
            }}
          >
            <Text style={styles.buttonText}> {lesson} </Text>
          </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

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