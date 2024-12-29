import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home2/HomeScreen';
import LessonChooseItem from '../Screens/Home2/LessonChooseItem';

const Stack = createStackNavigator();

const HomeScreenStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LessonChooseItem" component={LessonChooseItem} />
    </Stack.Navigator>
  );
};

export default HomeScreenStackNavigation
