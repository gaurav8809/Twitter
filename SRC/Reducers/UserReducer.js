import {ProfileState} from '../InitialStates';
import TYPE from './TypeConstants';

let reducer;
export default reducer = (state = ProfileState, action) => {

    switch (action.type) {

        case TYPE.LOGEDIN_USER:
            return state = {
                ...state,
                LogedInUserData: action.payload
            };
        case TYPE.USER_INFO:
            return state = {
                ...state,
                UserInfo: action.payload
            };
        case TYPE.USER_LOGEDOUT:
            return state = {
                state:undefined
            };


        default:
            return state;
    }

}
