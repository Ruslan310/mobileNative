import {Text, View} from "react-native";
import s from "./styles";
import {
  Button,
  DrawerButton,
  Form,
  FormContainer,
  FormInput,
  HeaderBackButton,
  TextTouchable,
} from "../../components";
import React from 'react';
import T from 'prop-types';
import {observer} from 'mobx-react/custom';
import i18n from '../../i18n';
import {colors} from "../../styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {PaymentMethods} from "../../validators/schemes";
import {SafeAreaView} from "react-navigation";
import {countries} from "../../constants";

const PaymentMethodsScreen = ({
                                createStripePaymentMethod,
                                deleteStripePaymentMethod,
                                updateStripePaymentMethod,
                                defaultPaymentMethod,
                                stripeCustomer,
                                isRefreshing,
                                isPaymentMethodForm,
                                onChange,
                              }) => {
  console.log('defaultPaymentMethod', defaultPaymentMethod)

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={40}
      containerStyle={s.container}
    >
      {defaultPaymentMethod &&
        <View style={s.containerChange}>
          <View style={s.contentCardNumber}>
            <Text style={s.activeText}>
              {`**** **** **** ${defaultPaymentMethod?.card.last4Digits}`}
            </Text>
            <Text style={s.activeText}>
              {`${defaultPaymentMethod?.card.expirationMonth}/${defaultPaymentMethod?.card.expirationYear}`}
            </Text>
          </View>
          <TextTouchable style={s.activeText} bold onPress={() => onChange('isPaymentMethodForm', true)}>
            {i18n.t('paymentMethods.updatePayment')}
          </TextTouchable>
          <TextTouchable style={s.activeText} bold onPress={() => deleteStripePaymentMethod(defaultPaymentMethod)}>
            {i18n.t('paymentMethods.removePayment')}
          </TextTouchable>
        </View>
      }
      {isPaymentMethodForm &&
        <Form
          enableReinitialize
          validationSchema={PaymentMethods}
          onSubmit={stripeCustomer
            ? updateStripePaymentMethod
            : createStripePaymentMethod}
        >
          {({handleSubmit, isValid}) => (
            <View style={s.container}>
              <FormContainer headerTitle={i18n.t('paymentMethods.cardDetails')}>
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

              <FormContainer headerTitle={i18n.t('paymentMethods.billingDetails')}>
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.holderName')}
                  name="holderName"
                />
                <FormInput.FieldWithDropDown
                  placeholder={i18n.t('paymentMethods.country')}
                  containerStyle={s.inputContainer}
                  dropDownStyle={s.dropDownContainer}
                  name="country"
                  dropDownList={countries.stripeCountriesList}
                  keyExtractor={(item) => item.key}
                />
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.streetAddress')}
                  name="streetAddress"
                />
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.apt')}
                  name="apt"
                />
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.postalCode')}
                  name="postalCode"
                />
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.city')}
                  name="city"
                />
                <FormInput.Field
                  inputContainerStyle={s.inputContainer}
                  placeholder={i18n.t('paymentMethods.state')}
                  name="state"
                />
              </FormContainer>

              <Button
                title={i18n.t('paymentMethods.savePaymentCard')}
                primary
                containerStyle={s.buttonContainer}
                disabled={!isValid}
                isLoading={isRefreshing}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Form>
      }
    </KeyboardAwareScrollView>
  )
}

PaymentMethodsScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  borrowingTransactions: T.array,
  lendingTransactions: T.array,
  totalEarnings: T.func,
  totalSpend: T.func,
};

export default observer(PaymentMethodsScreen);