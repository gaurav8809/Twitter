import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';

const setLoader = (flag) => {
    // state.setState({
    //     loader: flag
    // });
    const [loader, set] = useState(false);
    set(flag);

};

const AsyncStore = async (key,data) => {
    try {
        let dataObj = JSON.stringify(data);
        await AsyncStorage.setItem(key, dataObj);
    } catch (e) {
        // saving error
        console.log(e);
    }
};

const AsyncFetch = async (key) => {
    try {

        let value = await AsyncStorage.getItem(key);
        return Promise.resolve(JSON.parse(value));

    } catch(e) {
        alert("Error = " + e);
        return Promise.reject(e);
    }
};

const AsyncRemove = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

export const DismissKeyboardView = ({ children , actionCallback}) => (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        actionCallback && actionCallback
    }}>
        {children}
    </TouchableWithoutFeedback>
);

export const DynamicBottomBar = ({ children }) => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}  >
        {children}
    </KeyboardAvoidingView>
);


module.exports = {
    setLoader,
    AsyncStore,
    AsyncFetch,
    AsyncRemove,
    DismissKeyboardView,
    DynamicBottomBar
};
