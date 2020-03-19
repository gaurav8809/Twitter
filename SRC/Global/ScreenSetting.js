import {Dimensions} from 'react-native';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;


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
    // backgroundColor:'red',
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
    }
};

module.exports = {
    swidth,
    sheight,
    centertext,
    safearea,
    mainview,
    SHW,
    NHW,
    RHW
};
