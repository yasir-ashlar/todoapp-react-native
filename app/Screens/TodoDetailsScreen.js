import React,{ Component }  from 'react'
import { StyleSheet, Text } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
// Your own deps
import firebase from 'react-native-firebase'

export default class TodoDetailScreen extends Component{
    constructor(props) {
        //Initial State stuff?
        super(props)
        const { navigation } = props;
        let todoItem = navigation.getParam('todoItem')
        const {text, key} = todoItem
        this.state = {
            todoText: text,
            todoID: key
        }
    }

    componentDidMount() {
        
    }
    static navigationOptions = {
        title: 'Edit Todo Item'
    }

    updateTodoItem = () => {
        const { navigation } = this.props;

        let date = new Date();
        date = date.getFullYear()+'/'+(date.getMonth() + 1)+'/'+date.getDate();
        firebase.firestore().collection('todos').doc(this.state.todoID).set({
            text: this.state.todoText,
            date
        });
        navigation.navigate('Home');
    }

    handleTextChange(event){
        this.setState({todoText: event.target.value})
    }

    render(){
       
        return(
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input value={this.state.todoText} onChange={ () => this.setState({todoText: event.target.value})  } />
                        </Item>

                         <Button style={styles.updateButton} onPress={this.updateTodoItem}>
                                <Text>Update</Text>
                        </Button>
                    </Form>
                    
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    updateButton: {
        marginTop: 10, 
        width: '100%',
        backgroundColor: "#ea5a4b",
        padding: 10,

        alignItems: 'center'
        
    }
})