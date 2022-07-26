import { StyleSheet } from 'react-native';
import {colors, dimensions} from '../../styles';
import {isLargeDevice} from "../../utils";

const isLarge = isLargeDevice();

export default StyleSheet.create({
    webView: {
        flex: 1,
    },
    empty: {
        height: 25,
        backgroundColor: colors.signInSignUpForm.backgroundColor
    },
    modal: {
        flex: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    loader: {
        marginBottom: dimensions.indent * 2,
        marginTop: dimensions.indent * 2
    },
    placeholderContainer: {
        borderBottomWidth: 1,
        borderColor: '#009576'
    },
    container: {
        marginLeft: dimensions.indent,
        marginRight: dimensions.indent,
    },
    verifiedContainer: {
        paddingLeft: dimensions.indent,
        paddingRight: dimensions.indent,
        paddingBottom: dimensions.indent,
        paddingTop: dimensions.indent,
        borderRadius: 4,
        borderColor: '#ECA90A',
        borderWidth: 1,
        backgroundColor: 'rgba(236, 169, 10, 0.06)',
    },
    verifiedContainerSuccess: {
        paddingLeft: dimensions.indent,
        paddingRight: dimensions.indent,
        paddingBottom: dimensions.indent,
        paddingTop: dimensions.indent,
        borderRadius: 4,
        borderColor: '#009576',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 149, 118, 0.06)',
    },
    buttonVerifiedTextSuccess: {

    },
    buttonVerifiedText: {
        textTransform: 'uppercase',
        color: colors.textTouchable.textColorGreen,
        marginTop: dimensions.indent * 0.7,
        fontWeight: "500",
    },
    title: {
        marginTop: dimensions.indent * 2,
        marginBottom: dimensions.indent * 2,
    },
    infoStripeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: dimensions.indent
    },
    infoLink: {
      color: colors.textTouchable.textColorCustom,
      textDecorationLine: 'underline'
    },
    dropDownContainer: {
        top: dimensions.indent * 3,
        height: dimensions.indent * 9,
    },
    inputContainer: {
        marginBottom: dimensions.indent * 1.1,
    },
    buttonContainer: {
        marginTop: dimensions.indent * 1.3,
        marginBottom: isLarge
          ? dimensions.indent * 1.4
          : dimensions.indent,
    },
    subTitle: {
        color: colors.text.gray,
        marginTop: dimensions.indent,
        marginBottom: dimensions.indent
    },
});
