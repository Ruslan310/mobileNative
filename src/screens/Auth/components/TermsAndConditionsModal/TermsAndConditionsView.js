import React from 'react';
import {ScrollView, View} from 'react-native';
import Modal from 'react-native-modal';
import T from 'prop-types';
import {Button, Text} from '../../../../components';
import s from './styles';
import i18n from "../../../../i18n";
import IconCard from "../../../../components/IconCard/IconSvg";

const TermsAndConditionsModal = ({isVisible, onCloseModal,}) => (
  <Modal isVisible={isVisible} style={s.modal} avoidKeyboard>
    <View style={s.container}>
      <IconCard type="close" style={{alignItems: "flex-end", marginBottom: 24}} onPress={() => onCloseModal()}/>
      <ScrollView style={{marginBottom: 15}}>
        <View>
          <Text largeSize bold black style={s.heading}>
            {i18n.t('TermsAndConditions.titleView')}
          </Text>
          <Text largeSize bold black style={s.heading}>
            {i18n.t('TermsAndConditions.subTitleView')}
          </Text>
        </View>
        <Text xmedium bold black style={s.textDate}>
          Last updated: October 5th, 2017
        </Text>
        <Text medium lightBlack style={s.text}>
          Welcome to Saunatime.io, a peer-to-peer water
          sports equipment rental marketplace and
          online service provided by Sharetribe Oy.
          ("Saunatime," "we," or "us"). This Terms of Service
          Agreement ("Agreement") describes the terms and
          conditions that govern your use of and participation
          in Saunatime services. By accessing or using the
          Service, you signify that you have read, understood,
          and agree to be bound by this Agreement. If you do
          not agree to any of these terms or any future
          amendments, do not use or access (or continue to
          access) the Service. This Agreement applies to all
          visitors, users, and others who access the Service
          ("Users").
        </Text>
        <Text medium lightBlack style={s.text}>
          Please read this agreement carefully to ensure that
          you understand each provision. You understand and
          agree that Saunatime is not a party to any
          agreements entered into between renters and
          owners, nor is Saunatime an agent or insurer.
          Saunatime has no control over the conduct of
          renters or other users of the service and disclaims
          all liability in this regard. This agreement contains
        </Text>
        <Text medium lightBlack style={s.text}>
          Welcome to Saunatime.io, a peer-to-peer water
          sports equipment rental marketplace and
          online service provided by Sharetribe Oy.
          ("Saunatime," "we," or "us"). This Terms of Service
          Agreement ("Agreement") describes the terms and
          conditions that govern your use of and participation
          in Saunatime services. By accessing or using the
          Service, you signify that you have read, understood,
          and agree to be bound by this Agreement. If you do
          not agree to any of these terms or any future
          amendments, do not use or access (or continue to
          access) the Service. This Agreement applies to all
          visitors, users, and others who access the Service
          ("Users").
        </Text>
        <Text medium lightBlack style={s.text}>
          Please read this agreement carefully to ensure that
          you understand each provision. You understand and
          agree that Saunatime is not a party to any
          agreements entered into between renters and
          owners, nor is Saunatime an agent or insurer.
          Saunatime has no control over the conduct of
          renters or other users of the service and disclaims
          all liability in this regard. This agreement contains
        </Text>
      </ScrollView>
    </View>
  </Modal>
);

TermsAndConditionsModal.propTypes = {
  isVisible: T.bool,
  onCloseModal: T.func,
};

export default TermsAndConditionsModal;
