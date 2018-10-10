import React from 'react';
import { StyleSheet, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './app/Screens/HomeScreen'
import TodoDetailScreen from './app/Screens/TodoDetailsScreen'

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    TodoDetail: TodoDetailScreen
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
