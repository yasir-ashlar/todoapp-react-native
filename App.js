import React from 'react';
import { StyleSheet, TextInput, Text, View, FlatList } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  componentDidMount() {
    // firebase things?
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
          <FlatList
          data={[{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},{key: 'Todo Item here!'}, {key: 'Todo Item here!'},]}
          renderItem={({item}) => <Text style={styles.note}>{item.key}</Text>}
        />
        </View>
        <View style={styles.footer}>
          <TextInput 
            style={styles.addTodoText}
            placeholder={'Add Todo Item'} 
            />
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
    backgroundColor: '#fff'
  },
  addTodoText: {
    paddingLeft: 10
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
  }
});
