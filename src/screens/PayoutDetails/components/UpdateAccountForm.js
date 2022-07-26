import React from 'react';
import {PaymentDetails, PaymentDetailsUpdate} from "../../../validators/schemes";
import {View} from "react-native";
import s from "../styles";
import {Button, Form, FormInput, Text, TextTouchable, Touchable} from "../../../components";
import i18n from "../../../i18n";
import Loader from "../../../components/Loader/Loader";
import {countries} from "../../../constants";

const UpdateAccountForm = props => {
  const {
    onChange,
    openStripePayoutDetails,
    updateStripeAccount,
    createStripeAccount,
    details_submitted,
    last4,
    paramsInitialValues,
    isRefreshing,
    isShowInput,
    isProgressBankAccount,
  } = props

  const isShowForm = !isProgressBankAccount && isShowInput
  const isShowSaveBankNumber = !isProgressBankAccount && !isShowInput
  return (
    <Form
      enableReinitialize
      validationSchema={PaymentDetailsUpdate}
      onSubmit={updateStripeAccount}
      initialValues={paramsInitialValues}
    >
      {({handleSubmit, isValid}) => (
        <View style={s.container}>

          <Text xmediumSize bold style={s.title}>
            {i18n.t('payoutDetails.titleScreen')}
          </Text>

          {isProgressBankAccount &&
            <View style={s.loader}>
              <Loader/>
            </View>
          }

          {isShowForm &&
            <View>
              <FormInput.FieldWithDropDown
                placeholder={i18n.t('payoutDetails.country')}
                containerStyle={s.inputContainer}
                dropDownStyle={s.dropDownContainer}
                name="country"
                disabled={paramsInitialValues.country}
                dropDownList={countries.stripeCountriesList}
                keyExtractor={(item) => item.key}
              />

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
          }

          {isShowSaveBankNumber &&
            <Touchable onPress={() => onChange('isShowInput', true)}
                       style={s.loader}
            >
              <View style={s.placeholderContainer}>
                <Text>
                  *****************{last4}
                </Text>
              </View>
            </Touchable>
          }

          {!details_submitted
            ? <View style={s.verifiedContainer}>
              <Text xmediumSize bold style={s.titleVerified}>
                {i18n.t('payoutDetails.titleVerifiedContainer')}
              </Text>
              <Text gray style={s.subText}>
                {i18n.t('payoutDetails.textVerifiedContainer')}
              </Text>
              <TextTouchable xxsmallSize
                             textStyle={s.buttonVerifiedText}
                             containerStyle={{alignSelf: 'baseline'}}
                             onPress={openStripePayoutDetails}
              >
                {i18n.t('payoutDetails.getVerified')}
              </TextTouchable>
            </View>
            : <View style={s.verifiedContainerSuccess}>
              <Text xmediumSize bold style={s.titleVerifiedSuccess}>
                {i18n.t('payoutDetails.titleVerifiedContainerSuccess')}
              </Text>
              <TextTouchable xmediumSize
                             textStyle={s.buttonVerifiedTextSuccess}
                             containerStyle={{alignSelf: 'baseline'}}
                             onPress={openStripePayoutDetails}
              >
                {i18n.t('payoutDetails.getVerifiedSuccess')}
              </TextTouchable>
            </View>
          }

          <View style={s.infoStripeContainer}>
            <Text xxsmallSize gray>
              {i18n.t('payoutDetails.infoTextStripeConnected')}
            </Text>
            <TextTouchable xxsmallSize
                           style={s.infoLink}
                           onPress={() => onChange('isVisibleInformationModal', true)}
            >
              {i18n.t('payoutDetails.stripeConnected')}
            </TextTouchable>
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

export default UpdateAccountForm;