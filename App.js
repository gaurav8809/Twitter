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
import SplashScreen from './SRC/Global/SplashScreen';
import HelloScreen from './SRC/Components/HelloScreen';
import {persistStore, persistReducer} from 'redux-persist';
import RootNavigator from './SRC/Navigators/RootNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import AppReducer from './SRC/Reducers';
import storage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
// const store = createStore(applyMiddleware(thunk));



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigator/>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
