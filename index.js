/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GLOBAL from './SRC/Global/Initialization';

AppRegistry.registerComponent(appName, () => App);
