/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import bgMessaging from './bgMessaging';
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
// Current main application
AppRegistry.registerComponent('ReactNativeFirebaseDemo', () => bootstrap);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
AppRegistry.registerComponent(appName, () => App);
