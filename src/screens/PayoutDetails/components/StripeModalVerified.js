import React from 'react';
import {WebView} from "react-native-webview";
import s from "../styles";
import Modal from "react-native-modal";
import {View} from "react-native";

const StripeModalVerified = ({isVisible, onCloseModal, stripeUrl}) => (
  <Modal isVisible={isVisible && !!stripeUrl} style={s.modal}>
    <View style={s.empty}></View>
    <WebView
      style={s.webView}
      startInLoadingState
      source={{uri: stripeUrl}}
      onNavigationStateChange={e => {
        if (e.url !== stripeUrl) {
          onCloseModal()
        }
      }}
    />
  </Modal>
);

export default StripeModalVerified;