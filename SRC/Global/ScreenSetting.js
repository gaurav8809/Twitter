import {Dimensions} from 'react-native';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;
const centertext = {
    alignItems:'center',
    justifyContent:'center'
};

module.exports = {
    swidth,
    sheight,
    centertext
};
