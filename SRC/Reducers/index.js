import SystemReducer from './SystemReducer';
import UserReducer from './UserReducer';
import ChatReducer from './ChatReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    SystemReducer:SystemReducer,
    UserReducer:UserReducer,
    ChatReducer:ChatReducer,
});

// const appReducer = combineReducers({
//     user: UserReducer,
//     club: ClubReducer,
//     common: CommonReducer,
//     roster: RosterReducer,
//     chat: ChatReducer,
//     event: EventReducer,
// });
//
// export default function rootReducer(state, action) {
//     let finalState = appReducer(state, action);
//     if (action.type === RESET_STORE) {
//         finalState = appDefaultReducer; //resetReducer(finalState, action);
//         UserReducer(finalState, action);
//         ClubReducer(finalState, action);
//         RosterReducer(finalState, action);
//         ChatReducer(finalState, action);
//         EventReducer(finalState, action);
//     }
//     return finalState;
// }
