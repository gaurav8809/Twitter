import React,{Component} from 'react';
import {Platform} from 'react-native';
import HELPER, {DynamicTopBar} from "../../Global/Helper";
import {FlatList, Modal, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {ProfileInfoBadge, TweetBadge} from "../../Global/TwitterBadges";
import {safearea, swidth} from "../../Global/ScreenSetting";
import {BlackBigText, BlueText} from "../../Global/TwitterText";
import {BubbleButton} from "../../Global/TwitterButton";
import {IOSIndicator} from "../../Global/Indicators";
import {FollowUser, GetLoginUserData, UnFollowUser} from "../../Actions/UserAction";
import {SelectAll} from "../../Actions/FireBaseDBAction";
import {GetFollowingList} from "../../Actions/GeneralAction";
import {connect} from "react-redux";
import {SystemBlue} from "../../Global/ColorPalate";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {TopHeader} from "./TopHeader";

class FollowersListPage extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerShown: false,
    });

    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            LogedInUser: this.props.LogedInUserData,
            allFollowers: [],
        };

    }

    componentDidMount(){

        let STD = this.state;

        this.props.GetFollowingList('users', STD.LogedInUser.followers)
            .then(response => {

                this.setState({
                    refreshLoader:false,
                    allFollowers: response.data
                });

            })
            .catch(error => {
                console.log(error)
            });

    }

    renderFollowersList = (item,index) => {

        let {LogedInUser} = this.state;

        let FST = LogedInUser.following.includes(item.id);

        return (
            <View key={index}>
                <ProfileInfoBadge
                    imageurl={
                        item.profileImage
                    }
                    PROFILE_INFO={
                        {
                            username:item.username,
                            profilename:item.profilename,
                            bio:item.bioDetails,
                            official: item.official && item.official,
                        }
                    }
                    btnStatus={FST}
                    btnText={FST ? "Following" : "Follow"}
                    btnActiveText={FST ? "Follow" : "Following"}
                    BtnPress={(flag) => flag
                        ? this.unfollowButtonPress(item)
                        : this.followButtonPress(item)
                    }
                    imagePress={() => this.props.navigation.navigate('ProfilePage',{
                        NavUser: item
                    })}
                />
            </View>
        );
    };

    followButtonPress = (item) => {

        let Obj = {
            UserId: this.state.LogedInUser.id,
            Username: this.state.LogedInUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.FollowUser('users', Obj, this.state.LogedInUser)
            .catch(error => {
                console.log(error)
            });

    };

    unfollowButtonPress = (item) => {

        let Obj = {
            UserId: this.state.LogedInUser.id,
            Username: this.state.LogedInUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.UnFollowUser('users', Obj, this.state.LogedInUser)
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            });

    };

    render(){

        let {
        } = Styles;

        let {
            allFollowers
        } = this.state;

        return(
            <SafeAreaView style={[safearea]}>

                <View style={{...Styles.mainview}}>
                    <TopHeader text={"Followers"} nav={this.props.navigation}/>

                    <FlatList
                        data={allFollowers !== [] && allFollowers}
                        keyExtractor={item => item.username}
                        renderItem={({item,index}) => this.renderFollowersList(item,index)}
                    />
                </View>

                <Modal visible={this.state.loader} transparent={true} onRequestClose={false}>
                    <IOSIndicator />
                </Modal>
            </SafeAreaView>
        )
    }

}

let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        width: swidth,
    },
    followingText:{
        fontSize: swidth * 0.045,
        fontWeight: Platform.OS === 'ios' ? "500" : 'bold'
    }

});

const mapStateToProps = state => {
    const {
        LogedInUserData
    } = state.UserReducer;

    return {
        LogedInUserData
    };
};

const mapDispatchToProps = {
    GetLoginUserData,
    FollowUser,
    SelectAll,
    UnFollowUser,
    GetFollowingList
};

// export default CodeVerification;
export default connect(mapStateToProps, mapDispatchToProps)(FollowersListPage);
