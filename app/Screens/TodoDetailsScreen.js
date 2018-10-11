import React,{ Component }  from 'react'
import { StyleSheet, Text, PermissionsAndroid } from 'react-native'
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
// Your own deps
import firebase from 'react-native-firebase'
import MapView, { Marker } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places'
export default class TodoDetailScreen extends Component{
    constructor(props) {
        //Initial State stuff?
        super(props)
        const { navigation } = props;
        let todoItem = navigation.getParam('todoItem')
        const {text, key} = todoItem
        this.state = {
            todoText: text,
            todoID: key,
            latitude: 0,
            longitude: 0,
        }
    }

    componentDidMount() {
        canUseLocation = this.requestLocationPermissions();
        
        if(canUseLocation){
            RNGooglePlaces.getCurrentPlace()
            .then((results) => { this.setState({ latitude: results[0].latitude, longitude: results[0].longitude}) })
            .catch((error) => alert(error.message));
        }
    }
    static navigationOptions = {
        title: 'Edit Todo Item'
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
            return;
          }
        } catch (err) {
          return;
        }
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

    openSearchModal() {
        RNGooglePlaces.openPlacePickerModal()
        .then((place) => {
            // alert(JSON.parse(place));
            // place represents user's selection from the
            // suggestions and it is a simplified Google Place object.
            const {latitude, longitude} = place; 
            this.setState({
                latitude,
                longitude
            })
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
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

                        
                            <Button onPress={() => this.openSearchModal() }>
                                <Text>Update Location</Text>
                            </Button>

                         
                    </Form>
                    <MapView style={styles.map}
                        showUserLocation
                        loadingEnabled
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0019,
                            longitudeDelta: 0.0019,
                        }}
                    >
                        <Marker 
                            
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude                                                                                                                                                                                     
                            }}
                        />   
                    </MapView>

                    <Button style={styles.updateButton} onPress={this.updateTodoItem}>
                            <Text>Update</Text>
                    </Button>
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
        
    },
    map: {
        height: 250,
        width: '100%'
    }
})