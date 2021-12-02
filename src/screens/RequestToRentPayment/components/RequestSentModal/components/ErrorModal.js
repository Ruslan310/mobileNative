import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import { Text, Button, IconFonts } from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';

const RootModal = ({
  navigationToRequestToRent,
  errorMessage,
  gotoProduct,
}) => {
  const isErrorPayment =
    errorMessage === 'Request failed with status code 402';
  return (
    <View style={s.contentContainer}>
      <IconFonts
        style={s.icon}
        name="error"
        size={80}
        tintColor={colors.icon.tintColorOrange}
      />
      {!isErrorPayment && (
        <React.Fragment>
          <Text bold xxmediumSize black style={s.heading}>
            {i18n.t('requestToRent.somethingWentWrong')}
          </Text>
          <Text style={s.text}>
            {i18n.t('requestToRent.requestErrorInstruction')}
          </Text>
          <Button
            primary
            onPress={() => navigationToRequestToRent()}
            containerStyle={s.buttonResultContainer}
            title={i18n.t('requestToRent.tryAgain')}
          />
        </React.Fragment>
      )}
      {isErrorPayment && (
        <React.Fragment>
          <Text bold xxmediumSize black style={s.heading}>
            {i18n.t('requestToRent.sorry')}
          </Text>

          <Text style={s.text}>
            {i18n.t('requestToRent.verificationError')}
          </Text>
          <Button
            primary
            onPress={() => gotoProduct()}
            containerStyle={s.buttonResultContainer}
            title={i18n.t('requestToRent.goToProduct')}
          />
        </React.Fragment>
      )}
    </View>
  );
};

RootModal.propTypes = {
  navigationToRequestToRent: T.func,
  errorMessage: T.string,
  gotoProduct: T.func,
};

export default observer(RootModal);
