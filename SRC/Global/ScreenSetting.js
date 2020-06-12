import {Dimensions,Platform} from 'react-native';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

const SW = (width) => {
    return swidth * width;
};

const SH = (height) => {
    return sheight * height;
};

const centertext = {
    alignItems:'center',
    justifyContent:'center'
};
const safearea = {
    flex: 1,
    alignItems:'center',
    backgroundColor:'white',
    width: swidth,
};
const mainview = {
    flex: 1,
    alignItems:'center',
    // width: swidth * 0.85,
    width: swidth * 0.9,
    // justifyContent:'center'
};

const SHW = (he, wi) => {
    return {
        height: swidth * he,
        width: swidth * wi,
    }
};

const NHW = (he, wi) => {
    return {
        height: sheight * he,
        width: swidth * wi,
    }
};

const RHW = (size) => {
    return {
        height: swidth * size,
        width: swidth * size,
        borderRadius: 100,
    }
};

const TransIT = () => {
    return {
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
};

const IS_IOS = () => {

    return Platform.OS === 'ios';

};

module.exports = {
    SW,
    SH,
    swidth,
    sheight,
    centertext,
    safearea,
    mainview,
    SHW,
    NHW,
    RHW,
    TransIT,
    IS_IOS
};
