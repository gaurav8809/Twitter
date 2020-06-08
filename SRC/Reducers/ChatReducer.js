import {ChatState} from '../InitialStates';
import TYPE from './TypeConstants';

let reducer;
export default reducer = (state = ChatState, action) => {

    switch (action.type) {

        case TYPE.SAVE_CHAT_ID_LIST:
            debugger
            return state = {
                ...state,
                ChatIDList: action.payload.ChatIDList,
                ChatUsersList: action.payload.ChatUsersList
            };

        case TYPE.SAVE_CHAT_USER_LIST:
            debugger
            return state = {
                ...state,
                ChatUsersList: action.payload.ChatUsersList
            };

        case TYPE.SAVE_CHAT_LIST:
            debugger
            return state = {
                ...state,
                ChatList: action.payload
            };

        default:
            return state;
    }

}
