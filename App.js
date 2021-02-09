import React, {Component} from 'react';
import {Alert, YellowBox} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import RootNavigator from './SRC/Navigators/RootNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import AppReducer from './SRC/Reducers';
import storage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import HELPER from './SRC/Global/Helper';

// console.disableYellowBox = true;

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
// const store = createStore(applyMiddleware(thunk));

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.checkPermission();
    let FCM_TOKEN = await HELPER.AsyncFetch('FCM_TOKEN');
    if (!FCM_TOKEN) {
      this.getDeviceToken();
    }
    this.checkMessage();
    // this.checkNotification();
  }

  checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  getDeviceToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        HELPER.AsyncStore('FCM_TOKEN', token);
      })
      .catch(error => {
        console.log(error);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      HELPER.AsyncStore('FCM_TOKEN', token);
    });
  };

  checkMessage = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('NEW MESSAGE', remoteMessage);
      let data = remoteMessage.data;
      Alert.alert(
        'Twitter',
        data.message,
        [{text: 'Thank you', onPress: () => console.log('User clicked')}],
        {cancelable: false},
      );
    });

    return unsubscribe;
  };

  checkNotification = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
