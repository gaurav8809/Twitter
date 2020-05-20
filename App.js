import React, {Component} from 'react';
import {
    Alert
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
// import inAppMessaging from '@react-native-firebase/in-app-messaging';
import messaging from '@react-native-firebase/messaging';
import firebase from "react-native-firebase";
import HELPER from "./SRC/Global/Helper";

async function requestUserPermission() {
    const settings = await messaging().requestPermission();

    if (settings) {
        console.log('Permission settings:', settings);
    }
}

async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
    } else {
        console.log('User has notification permissions disabled');
    }
}

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);
// const store = createStore(applyMiddleware(thunk));

async function bootstrap() {
    await inAppMessaging().setMessagesDisplaySuppressed(true);
}

async function onSetup(user) {
    await setupUser(user);
    // Allow user to receive messages now setup is complete
    inAppMessaging().setMessagesDisplaySuppressed(false);
}


class App extends Component {

    constructor(props) {
        super(props);
        // checkApplicationPermission();

        // requestUserPermission();
        // messaging().onNotificationOpenedApp(remoteMessage => {
        //     console.log(
        //         'Notification caused app to open from background state:',
        //         remoteMessage.notification,
        //     );
        //     this.props.navigation.navigate(remoteMessage.data.type);
        // });
    }

    componentDidMount(){
        this.getDeviceTocken();
        this.checkMessage();
        // this.checkNotification();
        messaging().onNotificationOpenedApp(remoteMessage => {
            debugger
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            // navigation.navigate(remoteMessage.data.type);
        });
    }

    getDeviceTocken = async () => {
        messaging()
            .getToken()
            .then(token => {
                HELPER.AsyncFetch('AsyncLogedInUserData')
                    .then(response => {
                        const DBRef = firebase.firestore().collection('users').doc(response.id);
                        DBRef.update({tokens: token})
                        // DBRef.update({tokens: firebase.firestore.FieldValue.arrayUnion(token)})
                            .then(response => {
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                debugger
                console.log(error);
            });

        // Listen to whether the token changes
        return messaging().onTokenRefresh(token => {
            // saveTokenToDatabase(token);
        });
    };

    checkMessage = () => {
        messaging().onMessage(async remoteMessage => {
            debugger
            doOnMessage(remoteMessage)
        });

        const doOnMessage = (remoteMessage) => {
            let data = remoteMessage.data;
            Alert.alert(
                'Twitter',
                data.message,
                [
                    {text: 'Thank you', onPress: () => console.log('User clicked')},
                ],
                {cancelable: false},
            );

            console.log(remoteMessage);
        };
        // return unsubscribe;
    };

    checkNotification = async () => {
        // firebase.notifications().onNotification((notification) => {// <-- this line cann't be invoke
        //     console.log("notification receive..");
        //     const { title, body } = notification;
        //     debugger
        //     // this.showNotification(title, body);
        // });

        debugger
        messaging().onNotificationOpenedApp(remoteMessage => {
            debugger
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            // navigation.navigate(remoteMessage.data.type);
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                debugger
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                setLoading(false);
            });
    };

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
