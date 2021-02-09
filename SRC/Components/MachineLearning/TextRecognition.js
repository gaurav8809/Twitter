import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SW, SH, centertext} from '../../Global/ScreenSetting';
import {utils} from '@react-native-firebase/app';
import ColorPalate, {SystemBlue} from '../../Global/ColorPalate';
import TakePhotoPopUp from '../../Global/TakePhotoPopUp';
import {BlueWhiteButton} from '../../Global/TwitterButton';

const TextRecognition = () => {
  let [image, setImage] = useState(null);
  let [popUp, setPopUp] = useState(false);
  let [loader, setLoader] = useState(false);
  let [recognisedText, setRecognisedText] = useState('');

  const processDocument = async localPath => {
  };

  const onPressStart = () => {
    processDocument(image.uri);
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => setPopUp(true)}
          style={styles.imageSelectionView}>
          {image !== null ? (
            <Image source={{uri: image.uri}} style={styles.selectedImage} />
          ) : (
            <Text style={styles.uploadText}>Upload or choose any photo</Text>
          )}
        </TouchableOpacity>
        <Text>{recognisedText}</Text>
      </View>

      <View style={styles.startButton}>
        <BlueWhiteButton
          activeOpacity={0.5}
          activeText={loader ? 'Recognising' : 'Start'}
          btnStatus={true}
          onPress={onPressStart}
          useColor={SystemBlue}
        />
      </View>

      <TakePhotoPopUp
        visible={popUp}
        onPhotoSelect={photo => {
          setImage(photo);
          setPopUp(false);
        }}
        onRequestClose={() => setPopUp(false)}
      />
    </SafeAreaView>
  );
};

TextRecognition.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  imageSelectionView: {
    marginTop: SH(0.05),
    padding: 10,
    height: SH(0.5),
    width: SW(0.9),
    borderRadius: 5,
    borderWidth: 1,
    ...centertext,
  },
  uploadText: {
    color: ColorPalate.DarkGray,
    fontSize: SW(0.05),
  },
  selectedImage: {
    height: SH(0.5),
    width: SW(0.9),
    resizeMode: 'cover',
    borderRadius: 5,
  },
  startButton: {
    width: SW(0.3),
  },
});

export default TextRecognition;
