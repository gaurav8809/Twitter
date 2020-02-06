import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import SplashScreen from './SRC/Components/SplashScreen';
import HelloScreen from './SRC/Components/HelloScreen';
import RootNavigator from './SRC/Navigators/RootNavigator';

const store = createStore(applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    );
  }
}

export default App;
