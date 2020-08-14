import {ChatState} from '../InitialStates';
import TYPE from './TypeConstants';

let reducer;
export default reducer = (state = ChatState, action) => {

    switch (action.type) {

        case TYPE.SAVE_CHAT_IDS_LIST:
            return state = {
                ...state,
                ChatIDsList: action.payload
            };

        case TYPE.SAVE_CHAT_LIST:
            return state = {
                ...state,
                ChatList: action.payload
            };

        case TYPE.SAVE_CURRENT_CHAT:
            return state = {
                ...state,
                CurrentChat: action.payload
            };

        default:
            return state;
    }

}
