import React from 'react';
import {View} from "react-native";
import {PaymentDetails, PaymentDetailsCreate} from "../../../validators/schemes";
import s from "../styles";
import {Button, Form, FormInput, Text, TextTouchable, Touchable} from "../../../components";
import i18n from "../../../i18n";
import {countries} from "../../../constants";

const CreateAccountForm = props => {
  const {
    onChange,
    createStripeAccount,
    isRefreshing,
  } = props

  return (
    <Form
      enableReinitialize
      validationSchema={PaymentDetailsCreate}
      onSubmit={createStripeAccount}
    >
      {({handleSubmit, isValid}) => (
        <View style={s.container}>

          <Text xmediumSize bold style={s.title}>
            {i18n.t('payoutDetails.titleScreen')}
          </Text>

          <View>
            <FormInput.FieldWithDropDown
              placeholder={i18n.t('payoutDetails.country')}
              containerStyle={s.inputContainer}
              dropDownStyle={s.dropDownContainer}
              name="country"
              dropDownList={countries.stripeCountriesList}
              keyExtractor={(item) => item.key}
            />

            {}
            <Text bold style={s.subTitle}>
              {i18n.t('payoutDetails.bankAccount')}
            </Text>

            <FormInput.Field
              inputContainerStyle={s.inputContainer}
              placeholder={i18n.t('payoutDetails.routingNumber')}
              name="routingNumber"
            />
            <FormInput.Field
              inputContainerStyle={s.inputContainer}
              placeholder={i18n.t('payoutDetails.bankAccountNumber')}
              name="bankAccountNumber"
            />


          </View>

          <Button
            title={i18n.t('payoutDetails.saveDetails')}
            primary
            containerStyle={s.buttonContainer}
            disabled={!isValid}
            isLoading={isRefreshing}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Form>
  );
};

export default CreateAccountForm;