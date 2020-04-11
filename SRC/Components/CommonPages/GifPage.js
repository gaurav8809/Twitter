import {FlatList, Modal, StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import {sheight, swidth, RHW, SHW} from "../../Global/ScreenSetting";
import Icon from "react-native-dynamic-vector-icons/lib/components/Icon";
import React, {useEffect,useState} from "react";
import {SystemBlue} from "../../Global/ColorPalate";
import Image from "react-native-image-progress";
import {SafeAreaView} from "react-native-safe-area-context";
import axios from "axios";
import {IS_IOS} from "../../Global/Helper";
import {GetLoginUserData} from "../../Actions/UserAction";
import {NavigationActions, StackActions} from "react-navigation";
import {IOSIndicator} from "../../Global/Indicators";

const MENULIST = [
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FAgree.gif?alt=media&token=17fc8dd9-bf69-4705-80fd-4f91f77ef543',
        title:'Agree',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FApplause.gif?alt=media&token=2f77b775-fe55-4a04-ae95-128e6720d524',
        title:'Applause',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FAwww.gif?alt=media&token=435096b3-7eb8-458e-b4bd-115ae2bd4e14',
        title:'Awww',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FDance.gif?alt=media&token=a8195a7c-1cc9-4c25-8421-9f86d9e08e99',
        title:'Dance',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FDeal%20with%20it.gif?alt=media&token=4cefe694-bada-4afc-bb06-f9a83c2d4b9b',
        title:'Deal with it',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FDO%20not%20want.gif?alt=media&token=e290c07f-92f7-4858-a464-f60041604eae',
        title:'Do not want',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FEww.gif?alt=media&token=76be9dce-7c26-4fd4-921b-204ca7ae6d94',
        title:'Eww',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FRoll%20eye.gif?alt=media&token=30ec809a-2180-4863-ab3c-11e8f1497897',
        title:'Eye roll',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2Fface%20palm.gif?alt=media&token=011ab81c-d4a6-4657-9d81-a9db6cd8b3d5',
        title:'Face palm',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FGoo%20luck.gif?alt=media&token=ecb6f8ae-c7c7-40e5-9373-8b9940fe6945',
        title:'Good luck',
    },
    {
        gifPath:'https://firebasestorage.googleapis.com/v0/b/twitter-13dd2.appspot.com/o/GifSupport%2FHigh%20five.gif?alt=media&token=f0805561-c517-499c-a0be-1743a8f1e92c',
        title:'High five',
    },
];

const API_KEY = '&key=MOAF0HON3GCO';

export const GifCategoryView = (props) => {

    let {
        gifPreview,
        backPress,
        setGifState
        // PreviewImage
    } = props;

    const [GifArray,setGifArray] = useState(null);
    const [loader,setLoader] = useState(false);
    const [SearchText,setSearchText] = useState('');

    const GetGifs = (API) => {

        setLoader(true);
        axios.get(API + API_KEY)
            .then(response => {

                let final = response.data.results
                    // .filter(item => item)
                    .map(item => item.media[0]);

                setGifArray(final);
                setLoader(false);

            })
            .catch((err) => {
                setLoader(false);
                console.log("Error - ", err);
            });

    };

    useEffect(() => {

        // GetGifs('https://api.tenor.com/v1/trending?media_filter=basic&limit=2');

    },null);

    const onGifPress= (item) => {

        if(GifArray === null)
            GetGifs('https://api.tenor.com/v1/search?media_filter=basic&q=' + item.title);
        else
        {
            setGifState(item);
            backPress();
        }
    };

    const renderCategoryList = (item,index) => {
        return(
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onGifPress(item)}
                style={
                {
                    ...RHW(0.495),
                    // backgroundColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
                    marginLeft: (index % 2) !== 0 ? (swidth * 0.011) : 0
                }}
                key={index}
            >
                <Image
                    style={{...RHW(0.495)}}
                    source={{
                        uri: GifArray !== null ? item.nanogif.url : item.gifPath
                    }}
                    // source={{uri:item.nanogif.url}}
                />
                {
                    GifArray === null &&
                    <View style={Styles.categoryTextView}>
                        <Text style={Styles.categoryText}>
                            {item.title}
                        </Text>
                    </View>
                }

            </TouchableOpacity>
        );
    };

    let {
        mainview
    } = Styles;

    return (
        <Modal
            visible={gifPreview}
            transparent={true}
            animationType="slide"
            onRequestClose={backPress}
        >
            <SafeAreaView style={mainview}>
                <View style={Styles.topPanelView}>
                    <Icon
                        name={"arrowleft"}
                        type={"AntDesign"}
                        color={SystemBlue}
                        size={swidth * 0.06}
                        onPress={backPress}
                    />
                    <TextInput
                        placeholder={"Search for GIFs"}
                        style={Styles.searchBox}
                        value={SearchText}
                        onChangeText={text => setSearchText(text)}
                        returnKeyType={'search'}
                        onSubmitEditing={
                            () => SearchText === ''
                                ? setGifArray(null)
                                : GetGifs('https://api.tenor.com/v1/search?media_filter=basic&q=' + SearchText)
                        }
                        underlineColorAndroid={'slategray'}
                    />
                </View>
                <View style={Styles.GifListView}>
                    <FlatList
                        contentContainerStyle={{paddingBottom: swidth * (IS_IOS() ? 0.08 : 0.13)}}
                        // data={MENULIST}
                        data={GifArray !== null ? GifArray : MENULIST}
                        renderItem={({item,index}) => renderCategoryList(item,index)}
                        keyExtractor={item => GifArray !== null ? item.nanogif.url : item.title}
                        numColumns={2}
                        ItemSeparatorComponent={() => <View style={{height: swidth * 0.011}}/>}
                    />
                </View>
            </SafeAreaView>

            <Modal visible={loader} transparent={true} onRequestClose={false}>
                <IOSIndicator
                    size={swidth * 0.05}
                    viewStyle={{
                        marginTop: swidth * (IS_IOS() ? 0.2 : 0.17),
                        backgroundColor: 'white'
                    }}
                />
            </Modal>

        </Modal>
    );

};

let Styles = StyleSheet.create({

    mainview:{
        flex:1,
        backgroundColor: 'white'
    },
    topPanelView:{
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: swidth * 0.03,
        top: swidth * 0.04,
    },
    searchBox:{
        // backgroundColor: 'pink',
        marginLeft: swidth * 0.02,
        width: swidth * 0.89
    },
    categoryTextView:{
        ...SHW(0.495,0.495),
        backgroundColor: 'rgba(0,0,0,0.1)',
        position: 'absolute'
    },
    categoryText:{
        position: 'absolute',
        bottom: 15,
        left: 15,
        color: 'white',
        fontSize: swidth * 0.035,
        fontFamily: 'Roboto-Bold'
    },
    GifListView:{
        // justifySelf: 'center',
        // alignSelf: 'center',
        marginTop: swidth * 0.055
    },


});
