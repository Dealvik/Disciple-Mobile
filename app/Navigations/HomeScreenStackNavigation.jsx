import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screens/Home2/HomeScreen';
import LessonChooseItem from '../Screens/Home2/LessonChooseItem';

const Stack = createStackNavigator();

const HomeScreenStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="LessonChooseItem"
          component={LessonChooseItem}
          options={{ title: 'Lesson Details' }}
        />
    </Stack.Navigator>
  )
}

export default HomeScreenStackNavigation