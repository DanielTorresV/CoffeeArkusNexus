import React, { Component } from 'react'
import { FlatList, StyleSheet, Image } from 'react-native';
import { Container, Header, Left, List, ListItem, Item } from 'native-base';
import { getDistance } from 'geolib';
import GetLocation from 'react-native-get-location'
import Place from './Place.js';

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
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            this.setState({latitude:location.latitude, longitude:location.longitude},()=>this.getLocations())
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }

    getDistanceLocation(){
        let result = [...this.state.data]
        result.forEach((item) =>{
            let distance = getDistance(
                { latitude: item.Latitude, longitude: item.Longitude },
                { latitude: this.state.latitude, longitude: this.state.longitude }
            )
            item["Distance"] = distance
        })
        result.sort(function(a, b) {
            return a.Distance - b.Distance;
        });
        this.setState({data:result})
        
    }

    getLocations(){
        fetch('http://www.mocky.io/v2/5bf3ce193100008900619966')
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json },()=>this.getDistanceLocation());
        })
        .catch((error) => console.error(error))
    }

    render() {
        return (
            <Container style={styles.containerBase}>
                <Header androidStatusBarColor="#BBBBBB" style={styles.headerBase}>
                    <Left>
                    </Left>
                    <Item>
                        <Image style={styles.imgHeader} source={require('../img/arkus-logo.png')}/>
                        {/* <Title style={styles.titleBase}>Arkus Nexus</Title> */}
                    </Item>
                </Header>
                <FlatList
                    data={this.state.data}
                    renderItem={({item})=>(
                        <List style={styles.listBase}>
                            <ListItem thumbnail button onPress={()=>this.props.navigation.navigate('Detail', {data: item})}>
                                <Place data={item}/>
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
    imgHeader:{
        resizeMode: "contain",
        height:30
    },
  });
