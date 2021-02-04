/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import functions from '@react-native-firebase/functions';

const functionsForRegion = functions();
if (__DEV__) {
    functionsForRegion.useFunctionsEmulator('http://localhost:5001');
}

console.disableYellowBox = true

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    doOnMessage(remoteMessage)
});

AppRegistry.registerComponent(appName, () => App);
