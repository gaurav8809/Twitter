import {Dimensions} from 'react-native';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;
const centertext = {
    alignItems:'center',
    justifyContent:'center'
};
const safearea = {
    flex: 1,
    alignItems:'center'
};
const mainview= {
    // backgroundColor:'red',
    flex: 1,
    alignItems:'center',
    // width: swidth * 0.85,
    width: swidth * 0.9,
    // justifyContent:'center'
};

module.exports = {
    swidth,
    sheight,
    centertext,
    safearea,
    mainview
};
