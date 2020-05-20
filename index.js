/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GLOBAL from './SRC/Global/Initialization';
import messaging from '@react-native-firebase/messaging';


// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//     doOnMessage(remoteMessage)
// });
//
// messaging().onMessage(async remoteMessage => {
//     doOnMessage(remoteMessage)
// });
//
// const doOnMessage = (remoteMessage) => {
//     let data = remoteMessage.data;
//     Alert.alert(
//         'Twitter',
//         data.message,
//         [
//             {text: 'Thank you', onPress: () => console.log('User clicked')},
//         ],
//         {cancelable: false},
//     );
//
//     console.log(remoteMessage);
// };

AppRegistry.registerComponent(appName, () => App);
