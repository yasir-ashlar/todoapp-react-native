import React,{ Component }  from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Header extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render(){
        return(
        <View style={styles.header}>
          <Text style={styles.headerText}>
            TodoApp
          </Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
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
})