import SystemReducer from './SystemReducer';
import UserRsducer from './UserRsducer';
import {combineReducers} from 'redux';

export default combineReducers({
    SystemReducer:SystemReducer,
    UserRsducer:UserRsducer,
});
