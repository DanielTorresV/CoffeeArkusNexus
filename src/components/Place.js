import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import { Left, Body, Right, Button, Text, Thumbnail, View } from 'native-base';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Place extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:{},
        };
      }
    
    componentDidMount(){
        this.setState({data: this.props.data})
    }

    render() {
        return (
            <>
                <Left>
                    <Thumbnail large square source={{ uri: this.state.data.Thumbnail }} />
                </Left>
                <Body>
                    <Text>{this.state.data.PlaceName}</Text>
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
                    <Text large note>{this.state.data.AddressLine1}</Text>
                    <Text large note>{this.state.data.AddressLine2}</Text>
                </Body>
                <Right style={{flexDirection:"column", alignItems:"flex-end"}}>
                    <Text style={styles.textDistance}>
                        {this.state.data.Distance ? this.state.data.Distance > 1000 ? 
                        (this.state.data.Distance/1000).toFixed(1) + " Km" :
                        this.state.data.Distance.toFixed(1) + " m" : null }
                    </Text>
                    {this.state.data.IsPetFriendly ? 
                        <>
                            <Button transparent>
                                <Icon name="dog" size={40} color={'#70dbdb'}/>
                            </Button>
                            <Text style={styles.textPet}>
                                Pet Friendly
                            </Text>
                        </>
                        :
                        null
                    }
                </Right>
            </>
        )
    }
}

const styles = StyleSheet.create({
    textDistance: {
        fontSize: 10,
        marginTop: -10
    },
    textPet: {
        fontSize: 10,
    },
    stars:{
        width:40,
        marginBottom:10
    },
  });