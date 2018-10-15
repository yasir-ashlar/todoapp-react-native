import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';

import { NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Todo from '../Components/Todo';

import { stackNavigation } from '../../App';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    this.state = {
      todos: [],
      loading: true,
      todoText: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.watchID = navigator.geolocation.watchPosition(
      
      position => {
        const { latitude, longitude } = position.coords;

         this.setState({
           latitude,
           longitude
         }, () => {
          ToastAndroid.showWithGravity(
            'Lat: ' + this.state.latitude + ' Long: ' + this.state.longitude,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
         });
       },
       error => console.log(error),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((todo) => {
      const { text, date, location } = todo.data();
      todos.push({
        key: todo.id, // Todo ID
        todo,
        text,
        location,
        date
      });
    });
    this.setState({
      todos,
      loading: false,
   });
  }

  addTodo = () => {
    if(this.state.todoText == ''){
      alert('Please type in your todo item!')
      return;
    }
    date = new Date();
    date = date.getFullYear()+'/'+(date.getMonth() + 1)+'/'+date.getDate();
    this.ref.add({
      text: this.state.todoText,
      date
    });
    this.setState({
      todoText: ''
    })
  }

  updateTodo = (todoItem) => {
    const navigateAction = NavigationActions.navigate({routeName: 'EditTodo', 'params': { todoItem } });
    this.props.navigation.dispatch(navigateAction);
  }

  static navigationOptions = {
    title: 'Home',
    tabBarIcon: <Ionicons name="ios-home-outline" size={20} />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          { this.state.todos ?
            <FlatList
              data={this.state.todos}
              renderItem={({item}) => item.text?<Todo item={item} onPress={() => this.updateTodo(item)}/>: null}
            /> : <Text>No Items Added to the list yet!</Text> 
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  body: {
    backgroundColor: '#dedede',
  },
  footer: {
    position: "absolute",
    bottom:0,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 60
  },
  addTodoText: {
    paddingLeft: 10,
    width: '80%',
  },
  addTodoButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cacaca',
    width: '20%'
  }
});
