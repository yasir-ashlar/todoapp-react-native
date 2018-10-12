import React,{ Component }  from 'react'
import { StyleSheet, Text, PermissionsAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container, Grid, Row, Col, Button, Content, Form, Item, Input, Label } from 'native-base';
// Your own deps
import firebase from 'react-native-firebase'
import MapView, { Marker } from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places'

import Header from '../Components/Header'
export default class TodoDetailScreen extends Component{
    constructor(props) {
        //Initial State stuff?
        super(props)
        const { navigation } = props;
        let todoItem = navigation.getParam('todoItem');
        this.state = {
            todoText: todoItem ? todoItem.text : '',
            todoID: todoItem ? todoItem.key : '',
            latitude: todoItem ? todoItem.latitude : 0 ,
            longitude: todoItem ? todoItem.longitude : 0,
            status: todoItem ? todoItem.status : 'pending'
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
    // static navigationOptions = ({navigation}) => ({
    //     title:  navigation.getParam('todoItem') ? 'Edit Todo Item' : 'Add Todo Item',
    //     tabBarIcon: <Ionicons name="ios-add-circle-outline" size={20} />
    // })

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
                <Header />
                    <Form>
                        <Item stackedLabel>
                            <Label>Title</Label>
                            <Input 
                                value={this.state.todoText} 
                                onChange={ this.handleTextChange.bind(this) } />
                        </Item>
                    </Form>

                    <Item stackedLabel style={styles.mapContainer}>
                        <Label>Map Location</Label>
                        <MapView style={styles.map}
                            zoomEnabled={false}
                            zoomControlEnabled={false}
                            rotateEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.0019,
                                longitudeDelta: 0.0019,
                            }}>
                            <Marker 
                                
                                coordinate={{
                                    latitude: this.state.latitude,
                                    longitude: this.state.longitude                                                                                                                                                                                     
                                }}
                            />   
                        </MapView>
                    </Item>
                    <Grid>
                        <Row>
                            <Col>
                                <Button block info style={styles.mx10} onPress={() => this.openSearchModal() }>
                                    <Text>Update Location</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button block success style={styles.mx10} onPress={this.updateTodoItem}>
                                    <Text>Update</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    mTop10: {
        marginTop: 10,
    },
    mx10: {
        margin: 10
    },
    mapContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    map: {
        height: 250,
        width: '100%'
    }
})