import {ProfileState} from '../InitialStates';
import {LOGEDIN_USER} from './TypeConstants';

export default reducer = (state = ProfileState, action) => {

    switch (action.type) {

        case LOGEDIN_USER:
            return state = {
                ...state,
                LogedInUserData: action.payload
            };

        default:
            return state;
    }

}
