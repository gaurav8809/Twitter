import {StyleSheet} from "react-native";
import {swidth} from "../../../Global/ScreenSetting";
import COLOR from "../../../Global/ColorPalate";

const style = StyleSheet.create({
    mainView: {
        flex: 1,
        width: swidth,
        backgroundColor: COLOR.BackGrayColor
    },
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        flex: 1,
        backgroundColor: '#ffffff',
    },
    formLabel: {
        paddingBottom: 10,
        paddingTop: 10,
        color: '#0093E9',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    submitButton: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25,
    },
    formInput: {
        height: 40,
        backgroundColor: '#f5f5f5',
        color: '#0093E9',
        borderRadius: 4,
        paddingLeft: 20,
    },
});
export default style;
