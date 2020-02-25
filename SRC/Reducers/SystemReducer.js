import {SystemState} from '../InitialStates';

export default reducer = (state = SystemState, action) => {

    switch (action.type) {

        case 'SAVEDATA':
            return state = {
                ...state,
                SystemData: action.payload
            };

        default:
            return state;
    }

}
