import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity, PermissionsAndroid,  ToastAndroid } from 'react-native';

import { NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Todo from '../Components/Todo';
import haversine from 'haversine-distance';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    this.state = {
      todos: [],
      loading: true,
      canAccessLocation: false,
      todoText: '',
      nearest: '',
      prevDistance: 0,
      currentDistance: 0,
    };
  }
  requestLocationPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'TodoApp Location Services Permission',
          'message': 'Cool Photo App needs access to your current location ' +
                     'so you can have the best experience.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    accessToLocation = this.requestLocationPermissions();
    if(accessToLocation){
      this.watchID = navigator.geolocation.watchPosition(
      
        position => {
          const { latitude, longitude } = position.coords;

           this.setState({
             latitude,
             longitude
           });
           ToastAndroid.showWithGravity(
            `Lat: ${this.state.latitude} Long: ${this.state.longitude}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
           this.calculateDistance()
         },
         error => console.log(error),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1 }
      );
    } else {
      ToastAndroid.showWithGravity(
        'Sorry, Can\'t access location',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }

  calculateDistance =() => {
    // Check if nearest item has been set or not? 
    let { text, location} = this.state.nearest;
     if(!text || !location){
        this.calculateNearest({
          lat: this.state.latitude,
          lng: this.state.longitude
        }, this.state.todos);
     }
     //Now, the distance calculation, on the move
     let { nearest } = this.state
     currentDistance = haversine({lat: this.state.latitude, lng: this.state.longitude}, {lat: nearest.location.latitude, lng: nearest.location.longitude})

     if(currentDistance > 0 ){
       ToastAndroid.showWithGravity(
         `Current Distance: ${currentDistance}.`,
         ToastAndroid.SHORT,
         ToastAndroid.BOTTOM
       )
     } else {
       ToastAndroid.showWithGravity(
         'Looks like distance is negative!',
         ToastAndroid.SHORT,
         ToastAndroid.BOTTOM
       )
     }
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
   }, () => {
      this.calculateNearest({
        lat: this.state.latitude,
        lng: this.state.longitude
      }, this.state.todos);
   });
  }

  calculateNearest = (currentLocation, listOfLocations) => {
    let distances = [], nearest = '';
    for(item of listOfLocations){
      if(item.location && (item.location.latitude && item.location.longitude)){
        distance = haversine(currentLocation, {lat: item.location.latitude, lng: item.location.longitude});
        distance && distances.push({
          distance: distance,
          todo : item
        })
      }
    }
      
    if(distances.length > 0){
      if(distances.length >= 2){
        distances.sort((a, b) => a.distance - b.distance);
      } 

      nearest = distances[0];
      this.setState({
        'nearest': nearest.todo,
        'currentDistance': nearest.distance,
        'prevDistance': nearest.distance
      }, () => {
        ToastAndroid.showWithGravity(
          'Nearest: ' + nearest.distance + ' is ' + nearest.todo.text,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
    } else {
      ToastAndroid.showWithGravity(
        'You Missed Something!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
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
