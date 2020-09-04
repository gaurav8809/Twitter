import React, { Component } from 'react';
import { View, StyleSheet, Text,  NativeModules, Platform , Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'

class VideoBackUp extends Component {
    _engine: RtcEngine;
    constructor(props) {
        super(props);
        this.state = {
            peerIds: [], //Array for storing connected peers
            uid: Math.floor(Math.random() * 100), //Generate a UID for local user
            appID: this.props.appID, //Enter the App ID generated from the Agora Website
            channelName: this.props.channelname, //Channel Name for the current session
            vidMute: false, //State variable for Video Mute
            audMute: false, //State variable for Audio Mute
            joinSucceed: false, //State variable for storing success
        };
    };

    async componentDidMount() {
        RtcEngine.on('userJoined', (data) => {
            const {peerIds} = this.state; //Get currrent peer IDs
            if (peerIds.indexOf(data.uid) === -1) { //If new user has joined
                this.setState({
                    peerIds: [...peerIds, data.uid], //add peer ID to state array
                });
            }
        });
        RtcEngine.on('userOffline', (data) => { //If user leaves
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
            });
        });
        RtcEngine.on('joinChannelSuccess', (data) => { //If Local user joins RTC channel
            RtcEngine.startPreview(); //Start RTC preview
            this.setState({
                joinSucceed: true, //Set state variable to true
            });
        });
        RtcEngine.joinChannel(this.state.channelName, this.state.uid); //Join Channel
        RtcEngine.enableAudio(); //Enable the audio

        this.init();
        await this._engine?.joinChannel(null, this.state.channelName, null, 0)
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
        })

        this._engine.addListener('UserOffline', (uid, reason) => {
            console.log('UserOffline', uid, reason)
            const {peerIds} = this.state
            this.setState({
                // Remove peer ID from state array
                peerIds: peerIds.filter(id => id !== uid)
            })
        })

        // If Local user joins RTC channel
        this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.log('JoinChannelSuccess', channel, uid, elapsed)
            // Set state variable to true
            this.setState({
                joinSucceed: true
            })
        })
    }

    toggleAudio = () => {
        let mute = this.state.audMute;
        console.log('Audio toggle', mute);
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
            audMute: !mute,
        });
    };

    toggleVideo = () => {
        let mute = this.state.vidMute;
        console.log('Video toggle', mute);
        this.setState({
            vidMute: !mute,
        });
        RtcEngine.muteLocalVideoStream(!this.state.vidMute);
    };

    async endCall() {
        // RtcEngine.destroy();
        this.props.setCall(false);

        await this._engine?.leaveChannel()
        this.setState({peerIds: [], joinSucceed: false})
    };

    videoView() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.peerIds.length > 3                                     //view for four videostreams
                        ? <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 / 2, flexDirection: 'row' }}><AgoraView style={{ flex: 1 / 2 }}
                                                                                           remoteUid={this.state.peerIds[0]}
                                                                                           mode={1} />
                                <AgoraView style={{ flex: 1 / 2 }}
                                           remoteUid={this.state.peerIds[1]}
                                           mode={1} /></View>
                            <View style={{ flex: 1 / 2, flexDirection: 'row' }}><AgoraView style={{ flex: 1 / 2 }}
                                                                                           remoteUid={this.state.peerIds[2]}
                                                                                           mode={1} />
                                <AgoraView style={{ flex: 1 / 2 }}
                                           remoteUid={this.state.peerIds[3]}
                                           mode={1} /></View>
                        </View>
                        : this.state.peerIds.length > 2                                 //view for three videostreams
                        ? <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 / 2 }}><AgoraView style={{ flex: 1 }}
                                                                     remoteUid={this.state.peerIds[0]}
                                                                     mode={1} /></View>
                            <View style={{ flex: 1 / 2, flexDirection: 'row' }}><AgoraView style={{ flex: 1 / 2 }}
                                                                                           remoteUid={this.state.peerIds[1]}
                                                                                           mode={1} />
                                <AgoraView style={{ flex: 1 / 2 }}
                                           remoteUid={this.state.peerIds[2]}
                                           mode={1} /></View>
                        </View>
                        : this.state.peerIds.length > 1                              //view for two videostreams
                            ? <View style={{ flex: 1 }}><AgoraView style={{ flex: 1 }}
                                                                   remoteUid={this.state.peerIds[0]}
                                                                   mode={1} /><AgoraView style={{ flex: 1 }}
                                                                                         remoteUid={this.state.peerIds[1]}
                                                                                         mode={1} /></View>
                            : this.state.peerIds.length > 0                             //view for videostream
                                ? <AgoraView style={{ flex: 1 }}
                                             remoteUid={this.state.peerIds[0]}
                                             mode={1} />
                                : <View />
                }
                {
                    !this.state.vidMute                                              //view for local video
                        ? <AgoraView style={styles.localVideoStyle} zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />
                        : <View />
                }
                <View style={styles.buttonBar}>
                    <Icon.Button style={styles.iconStyle}
                                 backgroundColor="#0093E9"
                                 name={this.state.audMute ? 'mic-off' : 'mic'}
                                 onPress={() => this.toggleAudio()}
                    />
                    <Icon.Button style={styles.iconStyle}
                                 backgroundColor="#0093E9"
                                 name="call-end"
                                 onPress={() => this.endCall()}
                    />
                    <Icon.Button style={styles.iconStyle}
                                 backgroundColor="#0093E9"
                                 name={this.state.vidMute ? 'videocam-off' : 'videocam'}
                                 onPress={() => this.toggleVideo()}
                    />
                </View>
            </View>
        );
    }

    render() {
        return this.videoView();
    }
}

export default VideoBackup;

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
        height: dimensions.height - 100,
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
});

