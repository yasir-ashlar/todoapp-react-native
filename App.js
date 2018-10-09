import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
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
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((todo) => {
      const { text, date } = todo.data();
      todos.push({
        key: todo.id, // Todo ID
        todo,
        text,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            TodoApp
          </Text>
        </View>
        <View style={styles.body}>
          { this.state.todos ?
            <FlatList
              data={this.state.todos}
              renderItem={({item}) => item.text?<Text style={styles.note}>{item.text}</Text>: null}
            /> : <Text>No Items Added to the list yet!</Text> 
          }
        </View>
        <View style={styles.footer}>
          <TextInput 
            style={styles.addTodoText}
            placeholder={'Add Todo Item'}
            onChangeText={ (todoText) => this.setState({ todoText })}
            value={ this.state.todoText }
            />
          <TouchableOpacity 
            stlye={styles.addTodoButton}
            onPress={() => this.addTodo()}>
            <Text >Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  
  },
  header : {
    height: 60,
    backgroundColor: '#ea5a4b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#eaeaea',
    fontSize: 16,
    alignSelf: 'center'
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
  
  },
  addTodoText: {
    paddingLeft: 10,
    width: '80%',
  },
  note: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingLeft: 7,
    marginTop: 10,
    fontSize: 15,
    color: '#333',
    borderBottomWidth: 0.6,
    borderBottomColor: '#555'
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
