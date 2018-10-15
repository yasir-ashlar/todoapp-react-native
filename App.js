import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './app/Screens/HomeScreen'
import TodoDetailScreen from './app/Screens/TodoDetailsScreen'
import AddTodoScreen from './app/Screens/AddTodoScreen';

const bottomTabBar = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Add: AddTodoScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export const RootStack = createStackNavigator({
  Home: bottomTabBar,
  EditTodo: TodoDetailScreen,
},{
  initialRouteName: 'Home',
  navigationOptions: {
    headerTitle: 'TodoApp'
  }
})


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
