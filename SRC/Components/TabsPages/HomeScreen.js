import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    Modal,
    Image
} from 'react-native';
import {safearea, mainview, swidth} from '../../Global/ScreenSetting';
import {connect} from 'react-redux';
import COLOR from '../../Global/ColorPalate';
import {BlueText} from '../../Global/TwitterText';
import {ProfileInfoBadge,TweetBadge} from '../../Global/TwitterBadges';
import HELPER, {PreviewImageView} from '../../Global/Helper';
import {
    GetLoginUserData,
    FollowUser,
    UnFollowUser,
    LikeUnlikeTweet
} from '../../Actions/UserAction';
import {GetTweets} from '../../Actions/GeneralAction';
import {SelectAll} from '../../Actions/FireBaseDBAction';
import {BubbleButton} from '../../Global/TwitterButton';
import {IOSIndicator} from "../../Global/Indicators";

class HomeScreen extends Component{

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            currentUser:{},
            wtfList:[],
            tweetList:[],
            refreshLoader:false,
            loader:false,
            preview: false,
            PreviewImage: null,
        };

    }

    componentDidMount(){

        this._isMounted = true;
        this._isMounted && this.getCurrentLogedInData();

    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.LogedInUserData !== prevState.currentUser)
        {
            return{
                currentUser : nextProps.LogedInUserData
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentUser !== this.state.currentUser){
            //Perform some operation here
            this.setState({currentUser:prevState.currentUser});
            // this.getWhoToFollowList();
        }
    }

    getCurrentLogedInData = () => {

        HELPER.AsyncFetch('AsyncLogedInUserData')
            .then(response => {
                this.props.GetLoginUserData('users',response.id)
                    .then(response => {
                        this.setState({
                            currentUser: response.data
                        },() => this.getWhoToFollowList());
                    })
                    .catch(error => {
                        console.log(error);
                        alert(error);
                    });
            })
            .catch(error => {
                console.log(error)
            });
    };

    getWhoToFollowList = () => {
        this.props.SelectAll('users')
            .then(response => {
                let wtfList = [];
                for(let item of response.data)
                {
                    if(!item.followers.includes(this.state.currentUser.id))
                    {
                        if(item.id !== this.state.currentUser.id)
                            wtfList.push(item);
                    }
                }
                this.setState({wtfList,refreshLoader:false},() =>  this.getTweetList());
            })
            .catch(error => {
                console.log(error)
            });

    };

    getTweetList = () => {
        let STD = this.state;
        this.props.GetTweets('tweets', STD.currentUser)
            .then(response => {
                this.setState({
                    refreshLoader:false,
                    tweetList: response.data
                });
            })
            .catch(error => {
                console.log(error)
            });
    };

    followButtonPress = (item) => {
        let Obj = {
            UserId: this.state.currentUser.id,
            Username: this.state.currentUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.FollowUser('users', Obj, this.state.currentUser)
            .catch(error => {
                console.log(error)
            });
    };

    unfollowButtonPress = (item) => {
        let Obj = {
            UserId: this.state.currentUser.id,
            Username: this.state.currentUser.username,
            OpUserId: item.id,
            OpUsername: item.username,
        };

        this.props.UnFollowUser('users', Obj, this.state.currentUser)
            .catch(error => {
                console.log(error)
            });
    };

    renderWhoToFollowList = (item,index) => {

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
                    btnFlag={true}
                    btnStatus={false}
                    btnText={"Follow"}
                    btnActiveText={"Following"}
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

    openImage = (url) => {
        Image.getSize(url, (width, height) => {
            this.setState({
                preview: true,
                PreviewImage:{
                    pImageHeight: height,
                    pImageWidth: width,
                    pImagePath: url
                }
            })
        });
    };

    LikePress = (flag, item) => {
        this.props.LikeUnlikeTweet(flag, item, this.state.currentUser)
            .catch(error => {
                console.log(error)
            });
    };

    renderTweetList = (item,index) => {
        return (
            <View key={index} style={{marginTop: swidth * 0.02}}>
                <TweetBadge
                    JSONData={item}
                    profilePress={() => this.props.navigation.navigate('ProfilePage',{NavUser: item})}
                    imagePress={(url) => this.openImage(url)}
                    LikePress={(flag) => this.LikePress(flag,item,)}
                />
            </View>
        );
    };

    WTFFlatList = () => {

        let {
            wholabelcontainer,
            wholabeltext,
            seemorecontainer
        } = Styles;

      return(
          <FlatList
              refreshing={this.state.refreshLoader}
              onRefresh={() => this.setState({refreshLoader:true},() => this.getWhoToFollowList())}
              data={this.state.wtfList !== [] && this.state.wtfList}
              keyExtractor={item => item.id}
              ListHeaderComponent={
                  <View style={wholabelcontainer}>
                      <Text style={wholabeltext}>
                          {"Who to follow"}
                      </Text>
                  </View>
              }
              renderItem={({item,index}) => this.renderWhoToFollowList(item,index)}
              ListFooterComponent={
                  <View style={seemorecontainer}>
                      <BlueText
                          text={'See more'}
                          onPress={() => alert("Work in progress")}
                      />
                  </View>
              }
          />
      );
    };

    closePreviewImage = () => {
        this.setState({
            preview: false,
            PreviewImage: null,
        })
    };

    render(){
        let {
            preview,
            PreviewImage
        } = this.state;
        return(
            <SafeAreaView style={[safearea]}>
                <View style={{...Styles.mainview}}>
                    <FlatList
                        ListHeaderComponent={() => this.WTFFlatList()}
                        refreshing={this.state.refreshLoader}
                        onRefresh={() => this.setState({refreshLoader:true},() => this.getWhoToFollowList())}
                        data={this.state.tweetList !== [] && this.state.tweetList}
                        keyExtractor={item => item.tweetID}
                        renderItem={({item,index}) => this.renderTweetList(item,index)}
                    />

                    <BubbleButton
                        screen={'HOME'}
                        IconDetails={{
                                type: 'MaterialCommunityIcons',
                                name: 'feather',
                                color: 'white',
                                size: swidth * 0.065,
                            }}
                        uri={require('../../Assets/Images/FeatherWhite.png')}
                        onPress={() => this.props.navigation.navigate("CreateTweetPage")}
                    />
                </View>
                <PreviewImageView
                    preview={preview}
                    PreviewImage={PreviewImage}
                    backPress={() => this.closePreviewImage()}
                />
                <Modal
                    visible={this.state.loader}
                    transparent={true}
                >
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
        backgroundColor: COLOR.BackGrayColor
    },
    wholabelcontainer:{
        padding: swidth * 0.027,
        backgroundColor: 'white',
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
    },
    wholabeltext:{
        fontSize: swidth * 0.05,
        fontWeight: "bold",
    },
    seemorecontainer:{
        height: swidth * 0.13,
        padding: swidth * 0.030,
        backgroundColor: 'white',
        borderBottomWidth: 0.8,
        borderColor: 'lightgray',
        justifyContent:'center'
    },
    pImaheView:{
        flex:1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

});

const mapStateToProps = state => {
    const {
        UserInfo,
        LogedInUserData
    } = state.UserReducer;

    return {
        UserInfo,
        LogedInUserData
    };
};

const mapDispatchToProps = {
    GetLoginUserData,
    FollowUser,
    SelectAll,
    UnFollowUser,
    GetTweets,
    LikeUnlikeTweet
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

