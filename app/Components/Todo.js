import React,{ Component }  from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
// Your own deps

export default class Header extends Component{
    constructor(props) {
    //Initial State stuff?
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    render(){
        const { item, onPress } = this.props;
        return(
            <TouchableOpacity onPress={() => onPress()}>
                <Text style={styles.note}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    note: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    marginTop: 10,
    fontSize: 15,
    color: '#333',
    borderBottomWidth: 0.6,
    borderBottomColor: '#555'
  },
})