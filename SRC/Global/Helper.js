import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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
        return Promise.resolve(value);

        // return JSON.parse(value);

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


module.exports = {
    setLoader,
    AsyncStore,
    AsyncFetch,
    AsyncRemove
};
