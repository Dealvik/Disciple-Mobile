import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from './../Utils/Colors';
import AddScreenNavigation from './AddScreenNavigation';
import HomeScreenStackNavigation from './HomeScreenStackNavigation';
import SearchScreen from './../Screens/Search/SearchScreen';
import ProfileScreen from './../Screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      independent={true}
      screenOptions={{
        tabBarActiveTintColor: Colors.BLACK,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"  // This name can remain as "Home" in the Tab Navigator
        component={HomeScreenStackNavigation} // HomeScreenStackNavigation will manage its own screens
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation
