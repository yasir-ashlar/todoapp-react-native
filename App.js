import React from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './app/Screens/HomeScreen'
import TodoDetailScreen from './app/Screens/TodoDetailsScreen'
import AddTodoScreen from './app/Screens/AddTodoScreen';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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
