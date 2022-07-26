import React from 'react';
import {Text, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {SafeAreaView} from 'react-navigation';
import T from 'prop-types';
import {observer} from 'mobx-react/custom';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import s from './styles';
import {
  FormContainer,
  Button,
  FormInput,
  Form,
} from '../../components';
import i18n from '../../i18n';
import {PaymentSchema, PaymentSchemaFalse} from '../../validators/schemes';

const RequestToRentPaymentScreen = ({
                                      onRequest,
                                      isInitializationTransaction,
                                      defaultPaymentMethod,
                                      isUseSaveCard,
                                      onChange,
                                    }) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      containerStyle={s.container}
    >
      <Form
        enableReinitialize
        validationSchema={isUseSaveCard ? PaymentSchemaFalse : PaymentSchema}
        onSubmit={onRequest}
      >
        {({handleSubmit, isValid}) => (
          <View style={s.container}>
            {defaultPaymentMethod &&
              <View>
                <BouncyCheckbox value={isUseSaveCard}
                                size={20}
                                style={s.checkBox}
                                fillColor='#009576'
                                unfillColor="#FFFFFF"
                                text="Pay with save card?"
                                iconStyle={{borderColor: '#009576'}}
                                textStyle={s.checkBoxText}
                                onPress={(e) => onChange('isUseSaveCard', e)}
                >
                </BouncyCheckbox>


                <View style={!isUseSaveCard ? s.contentCardNumber : [s.contentCardNumber, s.contentCardNumberSuccess]}>
                  <Text>
                    {`**** **** **** ${defaultPaymentMethod?.card.last4Digits} `}
                  </Text>
                  <Text>
                    {` ${defaultPaymentMethod?.card.expirationMonth}/${defaultPaymentMethod?.card.expirationYear}`}
                  </Text>
                </View>
              </View>
            }
            {!isUseSaveCard &&
              <FormContainer
                headerTitle={i18n.t('requestToRent.payment')}
              >
                <FormInput.Field
                  containerStyle={s.inputContainer}
                  placeholder={i18n.t('requestToRent.cardNumber')}
                  name="cardNumber"
                  iconNameLeft="card"
                  keyboardType="number-pad"
                  inputType="card-number"
                />
                <View style={s.inputContainerCardDadeAndCVC}>
                  <FormInput.Field
                    placeholder={i18n.t('requestToRent.cardExpiration')}
                    containerStyle={s.inputLeft}
                    name="cardExpiration"
                    keyboardType="number-pad"
                    inputType="card-expiration"
                  />
                  <FormInput.Field
                    placeholder={i18n.t('requestToRent.cardCVC')}
                    containerStyle={s.inputRight}
                    name="cardCVC"
                    keyboardType="number-pad"
                    inputType="card-cvc"
                    iconInInputPlaceholder="question"
                    infoMessage={i18n.t('requestToRent.cardCVCInfo')}
                  />
                </View>
              </FormContainer>
            }
            <FormContainer
              headerTitle={i18n.t('requestToRent.message')}
            >
              <FormInput.Field
                inputContainerStyle={s.messageInputContainer}
                labelStyle={s.messageLabel}
                inputStyle={s.messageInput}
                placeholder={i18n.t('requestToRent.message')}
                name="message"
                multiline
                maxLength={1200}
              />
            </FormContainer>

            <Button
              title={i18n.t('requestToRent.sendRequest')}
              primary
              containerStyle={s.buttonContainer}
              disabled={isUseSaveCard ? !isUseSaveCard : (!isValid || isInitializationTransaction)}
              // disabled={!isValid || isInitializationTransaction}
              isLoading={isInitializationTransaction}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Form>
    </KeyboardAwareScrollView>
  </SafeAreaView>
);

RequestToRentPaymentScreen.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('productName', 'Product'),
});

RequestToRentPaymentScreen.propTypes = {
  onRequest: T.func,
  isInitializationTransaction: T.bool,
};

export default observer(RequestToRentPaymentScreen);
