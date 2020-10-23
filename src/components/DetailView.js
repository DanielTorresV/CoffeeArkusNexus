import React, { Component } from 'react'
import { FlatList, StyleSheet, Image, Linking } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text, List, ListItem, Thumbnail, View, Item } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';
import MapView, {Marker} from 'react-native-maps';

export default class detailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
        };
    }

    componentDidMount(){
        this.setState({data: this.props.route.params.data})
    }

    getTimeDistance(distance){
        let result = distance/90000
        if (result <= 1) {
            return result.toFixed(1)*60 == 60 ? `1 hr drive` : `${result.toFixed(1)*60} min drive`
        } else {
            return `${result.toFixed(1)} hr drive`
        }
    }

    render() {
        return (
            <Container style={styles.containerBase}>
                <Header androidStatusBarColor="#BBBBBB" style={styles.headerBase}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-left" size={25}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.textTitle}>Details</Title>
                    </Body>
                </Header>
                {
                    this.state.data.Latitude ?
                        <MapView
                            style={styles.maps}
                            initialRegion={{
                            latitude: this.state.data.Latitude,
                            longitude: this.state.data.Longitude,
                            latitudeDelta:0.0050,
                            longitudeDelta:0.0045
                            }}
                            showsUserLocation={true}
                        >
                            <Marker
                                coordinate={{
                                    latitude: this.state.data.Latitude,
                                    longitude: this.state.data.Longitude,
                                }}
                                description={this.state.data.PlaceName}
                            />
                        </MapView>
                    :
                        null
                }
                <View style={styles.informationContent}>
                    <View style={styles.information}>
                        <Text style={styles.placeName}>{this.state.data.PlaceName}</Text>
                        <View style={styles.stars}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={this.state.data.Rating}
                                fullStarColor={'#ffcc00'}
                                emptyStarColor={'#ffeb99'}
                                starSize={20}
                            />
                        </View>
                        {this.state.data.IsPetFriendly ? <Text style={styles.placeInfo}>American, Dogs Allowed</Text> : null}
                        <Text style={styles.placeInfo}>{this.state.data.AddressLine1}</Text>
                        <Text style={styles.placeInfo}>{this.state.data.AddressLine2}</Text>
                    </View>
                    <View style={styles.distanceInfo}>
                        <Text style={styles.textDistance}>{this.state.data.Distance ? this.state.data.Distance > 1000 ? 
                                        (this.state.data.Distance/1000).toFixed(1) + " Km" :
                                        this.state.data.Distance.toFixed(1) + " m" : null }</Text>
                        {this.state.data.IsPetFriendly ?
                            <Item style={styles.petIcon}>
                                <Icon name="dog" size={40} color={'#70dbdb'}/>
                            </Item>
                        :
                            null
                        }
                    </View>
                </View>
                <View style={styles.accessOptions}>
                    <Item style={styles.access}>
                        <Button transparent style={styles.petIcon}>
                            <Icon name="directions" size={35} color={'#70dbdb'}/>
                        </Button>
                        <View style={styles.accessDesc}>
                            <Text style={styles.accessTitle}>Directions</Text>
                            <Text style={styles.accessSub}>{this.getTimeDistance(this.state.data.Distance)}</Text>
                        </View>
                        <Button transparent style={styles.goArrow} onPress={()=> Linking.openURL(`geo:${this.state.data.Latitude},${this.state.data.Longitude}`)}>
                            <Icon name="angle-right" size={40} color={'#808080'}/>
                        </Button>
                    </Item>
                    <Item style={styles.access}>
                        <Button transparent style={styles.petIcon}>
                            <Icon name="phone-alt" size={35} color={'#70dbdb'}/>
                        </Button>
                        <View style={styles.accessDesc}>
                            <Text style={styles.accessTitle}>Call</Text>
                            <Text style={styles.accessSub}>{this.state.data.PhoneNumber}</Text>
                        </View>
                        <Button transparent style={styles.goArrow} onPress={()=>Linking.openURL(`tel:${this.state.data.PhoneNumber}`)}>
                            <Icon name="angle-right" size={40} color={'#808080'}/>
                        </Button>
                    </Item>
                    <Item style={styles.access}>
                        <Button transparent style={styles.petIcon}>
                            <Icon name="link" size={35} color={'#70dbdb'}/>
                        </Button>
                        <View style={styles.accessDesc}>
                            <Text style={styles.accessTitle}>Visit Website</Text>
                            <Text style={styles.accessSub}>{this.state.data.Site}</Text>
                        </View>
                        <Button transparent style={styles.goArrow} onPress={()=>Linking.openURL(this.state.data.Site)}>
                            <Icon name="angle-right" size={40} color={'#808080'}/>
                        </Button>
                    </Item>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    headerBase: {
        backgroundColor:'#FDFDFD'
      },
    maps:{
        width:'100%', 
        height:220
    },
    textTitle:{
        color:'#151515',
    },
    informationContent:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
    },
    information:{
        flex: 3,
        padding: 20,
    },
    placeName:{
        fontSize: 33,
        color: '#006bb3'
    },
    stars:{
        width:70,
        marginBottom:10
    },
    placeInfo:{
        fontSize:18,
        color:'#737373'
    },
    distanceInfo:{
        flex: 1,
        paddingTop: 40,
        paddingRight: 20,
        alignItems: 'flex-end',
    },
    textDistance:{
        fontSize: 15,
        color: '#808080'
    },
    petIcon:{
        borderBottomWidth:0
    },
    accessOptions:{
        paddingHorizontal: 45
    },
    access:{
        paddingVertical: 15
    },
    accessIcon:{
        borderBottomWidth:0,
        flex: 1
    },
    accessDesc:{
        paddingHorizontal:14,
        flex: 6
    },
    accessTitle:{
        fontSize: 20
    },
    accessSub:{
        fontSize: 14,
        color: '#808080'
    },
    goArrow:{
        flex: 1
    }
});