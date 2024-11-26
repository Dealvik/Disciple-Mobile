import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './../Screens/Home/HomeScreen';
import SearchScreen from './../Screens/Search/SearchScreen';
import AddScreen from './../Screens/Add/AddScreen';
import ProfileScreen from './../Screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from './../Utils/Colors';
import AddScreenNavigation from './AddScreenNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
        <Tab.Navigator 
            independent={true}
            screenOptions={{
                tabBarActiveTintColor:Colors.BLACK,
                headerShown: false,
            }}
        >
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Search' component={SearchScreen}
                options={{
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="search" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Add' component={AddScreenNavigation} 
                options={{
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="add-circle" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    tabBarIcon:({color, size}) => (
                        <Ionicons name="people" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation