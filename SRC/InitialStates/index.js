const SystemState = {
    SystemData:{}
};

const ProfileState = {
    LogedInUserData:{},
    UserInfo:{}
};

const ChatState = {
    ChatIDList: [],
    ChatUsersList: [],
    ChatList: [],
    CurrentChat: {},
};

module.exports = {
    SystemState,
    ProfileState,
    ChatState
};
