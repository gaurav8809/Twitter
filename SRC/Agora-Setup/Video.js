import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView} from 'react-native';

import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import {swidth, SW, SH, centertext} from "../Global/ScreenSetting";
import {SlateGray, SystemBlue} from "../Global/ColorPalate";

class Video extends Component {

    static navigationOptions = {
        header: null,
    };

    _engine: RtcEngine;
    constructor(props) {
        super(props);

        const channelName = props.navigation.state.params.channelName;
        console.log("Channel name: ",channelName);
        this.state = {
            peerIds: [], //Array for storing connected peers
            uid: Math.floor(Math.random() * 100), //Generate a UID for local user
            appID: 'f9c84db8385946fa9e6a27a1099279ac', //Enter the App ID generated from the Agora Website
            channelName: 'Test', //Channel Name for the current session
            vidMute: true, //State variable for Video Mute
            audMute: true, //State variable for Audio Mute
            switchCamera: true, //State variable for camera
            joinSucceed: false, //State variable for storing success
        };
    };

    componentDidMount() {
        this.init();
    };

    init = async () => {
        const {appID} = this.state
        this._engine = await RtcEngine.create(appID)
        await this._engine.enableVideo()

        this._engine.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)
            // Get current peer IDs
            const {peerIds} = this.state
            // If new user
            if (peerIds.indexOf(uid) === -1) {
                this.setState({
                    // Add peer ID to state array
                    peerIds: [...peerIds, uid]
                })
            }
        });

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            const {peerIds} = this.state
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            })
        });

        // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            // Set state variable to true
            this.setState({
                joinSucceed: true
            })
        });

        await this._engine?.joinChannel(null, this.state.channelName, null, 0)
    };

    endCall = async () => {
        // RtcEngine.destroy();
        await this._engine?.leaveChannel();
        this.setState({peerIds: [], joinSucceed: false}, () => this.props.navigation.goBack())
        // this.setState({peerIds: [], joinSucceed: false}, () => this.props.setCall(false))
    };

    toggleCamera = () => {
        this.setState({
            switchCamera: !this.state.switchCamera,
        }, () => {
            this._engine?.switchCamera();
        });
    };


    toggleAudio = () => {
        this.setState({
            audMute: !this.state.audMute,
        }, () => {
            this.state.audMute ? this._engine?.enableAudio() : this._engine?.disableAudio();
        });
    };

    toggleVideo = () => {
        this.setState({
            vidMute: !this.state.vidMute,
        }, () => {
            this.state.vidMute ? this._engine?.enableVideo() : this._engine?.disableVideo();
        });
    };

    _renderVideos = () => {
        const {joinSucceed} = this.state;
        return joinSucceed ? (
            <View style={styles.fullView}>
                <RtcLocalView.SurfaceView
                    style={styles.max}
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}/>
                {this._renderRemoteVideos()}
                <View style={[styles.optionMainView, styles.fullView]}>
                    <View style={styles.upperOptionContainer}>
                        <TouchableOpacity style={styles.optionCircle} onPress={this.toggleCamera}>
                            <Icon name={"camera-party-mode"} type={"MaterialCommunityIcons"} size={swidth * 0.06} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lowerOptionContainer}>
                        <TouchableOpacity style={styles.optionCircle} onPress={this.toggleAudio}>
                            <Icon name={this.state.audMute ? "microphone" : "microphone-slash"} type={"FontAwesome"} size={swidth * 0.06} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.optionCircle, {backgroundColor: 'red'}]} onPress={this.endCall}>
                            <Icon name={"call"} type={"MaterialIcons"} size={swidth * 0.07} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionCircle} onPress={this.toggleVideo}>
                            <Icon name={this.state.vidMute ? "videocam" : "videocam-off"} type={"MaterialIcons"} size={swidth * 0.07} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ) : null
    }

    _renderRemoteVideos = () => {
        const {peerIds} = this.state
        return (
            <ScrollView
                style={styles.remoteContainer}
                contentContainerStyle={{paddingHorizontal: 2.5}}
                horizontal={true}>
                {peerIds.map((value, index, array) => {
                    return (
                        <RtcRemoteView.SurfaceView
                            style={styles.remote}
                            uid={value}
                            channelId={this.state.channelName}
                            renderMode={VideoRenderMode.Hidden}
                            zOrderMediaOverlay={true}/>
                    )
                })}
            </ScrollView>
        )
    };

    render() {
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                    {this._renderVideos()}
                </View>
            </View>
        );
    }
}

Video.navigationOptions = {
    headerShown: false,
};

export default Video;

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
    buttonBar: {
        height: 50,
        backgroundColor: '#0093E9',
        display: 'flex',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    localVideoStyle: {
        width: 140,
        height: 160,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 100,
    },
    iconStyle: {
        fontSize: 34,
        paddingTop: 15,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        borderRadius: 0,
    },
    max: {
        flex: 1,
    },
    buttonHolder: {
        height: 100,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height,
    },
    optionMainView: {
        position: 'absolute',
        flex: 1, zIndex: 1000,
        // backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5
    },
    remote: {
        width: 150,
        height: 150,
        marginHorizontal: 2.5
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9',
    },
    upperOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: SW(0.05),
        width: SW(1)
    },
    lowerOptionContainer: {
        bottom: SH(0.03),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SW(0.1),
        width: SW(1)
    },
    optionCircle: {
        height: SW(0.13),
        width: SW(0.13),
        backgroundColor: SystemBlue,
        borderRadius: 100,
        ...centertext,
    },
});

