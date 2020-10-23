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
import ListView from './src/components/ListView.js'

export default class App extends Component {
  render(){ 
    return (
      <Root>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={styles.safeAreaView}>
          <ListView/>
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
