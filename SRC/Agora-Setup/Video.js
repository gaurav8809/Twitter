import React, { Component } from 'react';
import { View, StyleSheet, Text,  NativeModules, Platform , Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// const { Agora } = NativeModules; //Define Agora object as a native module
// const {
//     FPS30,
//     AudioProfileDefault,
//     AudioScenarioDefault,
//     Adaptative,
// } = Agora; //Set defaults for Stream

import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'

class Video extends Component {
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

        // this._engine = RtcEngine

        // if (Platform.OS === 'android') {
        //     const config = { //Setting config of the app
        //         appID: this.state.appID, //App ID
        //         channelProfile: 0, //Set channel profile as 0 for RTC
        //         videoEncoderConfig: { //Set Video feed encoder settings
        //             width: 720,
        //             height: 1080,
        //             bitrate: 1,
        //             // frameRate: FPS30,
        //             // orientationMode: Adaptative,
        //         },
        //         // audioProfile: AudioProfileDefault,
        //         // audioScenario: AudioScenarioDefault,
        //     };
        //     RtcEngine.init(config); //Initialize the RTC engine
        // }
    };

    async componentDidMount() {
        // RtcEngine.on('userJoined', (data) => {
        //     const {peerIds} = this.state; //Get currrent peer IDs
        //     if (peerIds.indexOf(data.uid) === -1) { //If new user has joined
        //         this.setState({
        //             peerIds: [...peerIds, data.uid], //add peer ID to state array
        //         });
        //     }
        // });
        // RtcEngine.on('userOffline', (data) => { //If user leaves
        //     this.setState({
        //         peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
        //     });
        // });
        // RtcEngine.on('joinChannelSuccess', (data) => { //If Local user joins RTC channel
        //     RtcEngine.startPreview(); //Start RTC preview
        //     this.setState({
        //         joinSucceed: true, //Set state variable to true
        //     });
        // });
        // RtcEngine.joinChannel(this.state.channelName, this.state.uid); //Join Channel
        // RtcEngine.enableAudio(); //Enable the audio


        await this._engine?.joinChannel(null, this.state.channelName, null, 0)

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

    // toggleAudio = () => {
    //     let mute = this.state.audMute;
    //     console.log('Audio toggle', mute);
    //     RtcEngine.muteLocalAudioStream(!mute);
    //     this.setState({
    //         audMute: !mute,
    //     });
    // };
    //
    // toggleVideo = () => {
    //     let mute = this.state.vidMute;
    //     console.log('Video toggle', mute);
    //     this.setState({
    //         vidMute: !mute,
    //     });
    //     RtcEngine.muteLocalVideoStream(!this.state.vidMute);
    // };

    async endCall() {
        // RtcEngine.destroy();
        this.props.setCall(false);

        await this._engine?.leaveChannel()
        this.setState({peerIds: [], joinSucceed: false})
    };

    _renderVideos = () => {
        const {joinSucceed} = this.state
        return joinSucceed ? (
            <View style={styles.fullView}>
                <RtcLocalView.SurfaceView
                    style={styles.max}
                    channelId={this.state.channelName}
                    renderMode={VideoRenderMode.Hidden}/>
                {this._renderRemoteVideos()}
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
    }

    render() {
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity
                            onPress={this.startCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Start Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.endCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> End Call </Text>
                        </TouchableOpacity>
                    </View>
                    {this._renderVideos()}
                </View>
            </View>
        );
        // return this.videoView();
    }
}

export default Video;

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

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

