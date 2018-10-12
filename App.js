import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './app/Screens/HomeScreen'
import TodoDetailScreen from './app/Screens/TodoDetailsScreen'

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      options: {
        title: '',
        tabBarIcon: <Ionicons name="ios-add-circle-outline" size={20} />
      }
    },
    Actions: TodoDetailScreen,
    navigationOptions: {
      title: '',
      tabBarIcon: <Ionicons name="ios-home-outline" size={20} />
    }
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
