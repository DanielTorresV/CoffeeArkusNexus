import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, List, ListItem, Thumbnail, View, Item, Image } from 'native-base';
import { getDistance } from 'geolib';
import GetLocation from 'react-native-get-location'
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:{},
            latitude:0,
            longitude:0
        };
      }

    componentDidMount(){
        this.getLocations()
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState({latitude:location.latitude, longitude:location.longitude})
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    getLocations(){
        fetch('http://www.mocky.io/v2/5bf3ce193100008900619966')
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json });
        })
        .catch((error) => console.error(error))
    }

    render() {
        return (
            <Container style={styles.containerBase}>
                <Header androidStatusBarColor="#BBBBBB" style={styles.headerBase}>
                    <Left>
                    </Left>
                    <Body>
                        {/* <Image style={styles.imgHeader} source={{uri: '../img/arkus-logo.png'}}/> */}
                        <Title style={styles.titleBase}>Arkus Nexus</Title>
                    </Body>
                </Header>
                <FlatList
                    data={this.state.data}
                    renderItem={({item})=>(
                        <List style={styles.listBase}>
                            <ListItem thumbnail button onPress={()=>console.log(item.PlaceId)}>
                            <Left>
                                <Thumbnail large square source={{ uri: item.Thumbnail }} />
                            </Left>
                            <Body>
                                <Text>{item.PlaceName}</Text>
                                <View style={styles.stars}>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={item.Rating}
                                        fullStarColor={'#ffcc00'}
                                        emptyStarColor={'#ffeb99'}
                                        starSize={20}
                                    />
                                </View>
                                <Text large note numberOfLines={2}>{item.Address}</Text>
                            </Body>
                            <Right style={{flexDirection:"column", alignItems:"flex-end"}}>
                                {this.state.latitude ?
                                    <Text style={styles.textDistance}>
                                        {getDistance(
                                            { latitude: item.Latitude, longitude: item.Longitude },
                                            { latitude: this.state.latitude, longitude: this.state.longitude }
                                        ) > 1000 ? 
                                        (getDistance(
                                            { latitude: item.Latitude, longitude: item.Longitude },
                                            { latitude: this.state.latitude, longitude: this.state.longitude }
                                        )/1000).toFixed(1) + " Km" :
                                        getDistance(
                                            { latitude: item.Latitude, longitude: item.Longitude },
                                            { latitude: this.state.latitude, longitude: this.state.longitude }
                                        ).toFixed(1) + " m" }
                                    </Text>
                                :
                                    <Text></Text>
                                }
                                {item.IsPetFriendly ? 
                                    <>
                                        <Button transparent>
                                            <Icon name="dog" size={35} color={'#b3e0ff'}/>
                                        </Button>
                                        <Text style={styles.textPet}>
                                            Pet Friendly
                                        </Text>
                                    </>
                                    :
                                    null
                                }
                            </Right>
                            </ListItem>
                        </List>
                    )}
                    keyExtractor={(item) => item.PlaceId}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    containerBase:{
        flex:1
    },
    headerBase: {
      backgroundColor:'#FDFDFD'
    },
    titleBase: {
        color: '#1F1F1F'
    },
    listBase:{
        flex:1,
    },
    textDistance: {
        fontSize: 10,
        marginTop: -10
    },
    textPet: {
        fontSize: 10,
    },
    stars:{
        width:40
    },
    imgHeader:{
        resizeMode: "contain",
    },
  });
