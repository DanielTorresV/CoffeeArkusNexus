/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListView from './src/components/ListView.js'
import DetailView from './src/components/DetailView.js';

const Stack = createStackNavigator();
export default class App extends Component {
  render(){ 
    return (
      <Root>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={styles.safeAreaView}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={ListView} options={{ headerShown: false }}/>
              <Stack.Screen name="Detail" component={DetailView} options={{ headerShown: false }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Root>
    );
  }
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex:1
  }
});
