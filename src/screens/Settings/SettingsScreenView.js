/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  DrawerButton,
  Text,
  FormContainer,
  Button,
  Avatar,
  FormInput,
  Form,
} from '../../components';
import { EmailVerifiedMessage } from './components';
import i18n from '../../i18n';
import { colors } from '../../styles';
import {
  ProfileSchema,
  ContactSchema,
  PasswordSchema,
} from '../../validators/schemes';
import { actionSheetSettingsOptions } from '../../constants/options';

const SettingsScreen = ({
  goToMyProfile,
  resendVerificationEmail,
  onSave,
  addPhoto,
  user,
  isChangingAvatar,
  isLoading,
  formRef,
  contactFormRef,
  passwordFormRef,
  profileInitialValues,
  contactInitialValues,
  passwordInitialValues,
}) => (
  <SafeAreaView style={s.safeAreaViewContainer}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
    >
      <View style={s.container}>
        <Form
          enableReinitialize
          validationSchema={ProfileSchema}
          ref={formRef}
          initialValues={profileInitialValues}
          isInitialValid
        >
          {(profileForm) => (
            <React.Fragment>
              <FormContainer
                headerTitle={i18n.t('settings.profileSettings')}
                headerTitleTextTouchable={i18n.t(
                  'settings.myProfile',
                )}
                headerOnPressTextTouchable={goToMyProfile}
              >
                <View style={s.avatarContainer}>
                  <View style={s.avatar}>
                    <Avatar
                      user={user}
                      large
                      canChange
                      onPressChange={() => {
                        this.actionSheetRefAvatar.show();
                      }}
                      isLoading={isChangingAvatar}
                    />
                  </View>
                  <View style={s.tipContainer}>
                    <Text style={s.tip} gray xxsmallSize>
                      {i18n.t('settings.tip')}
                    </Text>
                    <Text gray xxsmallSize>
                      {i18n.t('settings.formatSuggestion')}
                    </Text>
                  </View>
                </View>

                <View style={s.inputContainerFirstAndLastNames}>
                  <FormInput.Field
                    placeholder={i18n.t('settings.firstName')}
                    containerStyle={s.inputLeft}
                    name="firstName"
                    maxLength={100}
                  />
                  <FormInput.Field
                    placeholder={i18n.t('settings.lastName')}
                    containerStyle={s.inputRight}
                    name="lastName"
                    maxLength={100}
                  />
                </View>
                <FormInput.Field
                  inputContainerStyle={s.bioInputContainer}
                  labelStyle={s.bioLabel}
                  inputStyle={s.bioInput}
                  placeholder={i18n.t('settings.bio')}
                  name="bio"
                  multiline
                  maxLength={1200}
                />
              </FormContainer>

              <Form
                enableReinitialize
                validationSchema={ContactSchema}
                ref={contactFormRef}
                initialValues={contactInitialValues}
                isInitialValid
              >
                {(contactDetailsForm) => (
                  <React.Fragment>
                    <FormContainer
                      headerTitle={i18n.t('settings.contactDetails')}
                    >
                      <FormInput.Field
                        placeholder={i18n.t(
                          'settings.currentPassword',
                        )}
                        containerStyle={s.inputContainer}
                        name="currentPasswordForEmail"
                        inputType="password"
                        autoCapitalize="none"
                      />
                      <View style={s.inputContainer}>
                        <FormInput.Field
                          placeholder={i18n.t('settings.email')}
                          name="email"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          maxLength={100}
                        />
                        {!user.emailVerified && (
                          <EmailVerifiedMessage
                            resendVerificationEmail={
                              resendVerificationEmail
                            }
                          />
                        )}
                      </View>

                      <FormInput.Field
                        placeholder={i18n.t('settings.phoneNumber')}
                        name="phone"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                      />
                    </FormContainer>

                    <Form
                      validateOnChange
                      enableReinitialize
                      validationSchema={PasswordSchema}
                      ref={passwordFormRef}
                      initialValues={passwordInitialValues}
                      isInitialValid
                    >
                      {(passwordForm) => (
                        <React.Fragment>
                          <FormContainer
                            headerTitle={i18n.t(
                              'settings.passwordSettings',
                            )}
                          >
                            <FormInput.Field
                              placeholder={i18n.t(
                                'settings.currentPassword',
                              )}
                              containerStyle={s.inputContainer}
                              name="currentPassword"
                              inputType="password"
                              validateOnTouched={false}
                              autoCapitalize="none"
                            />
                            <FormInput.Field
                              placeholder={i18n.t(
                                'settings.newPassword',
                              )}
                              containerStyle={s.inputContainer}
                              name="newPassword"
                              inputType="password"
                              validateOnTouched={false}
                              autoCapitalize="none"
                            />
                            <FormInput.Field
                              placeholder={i18n.t(
                                'settings.retypeNewPassword',
                              )}
                              name="replyPassword"
                              inputType="password"
                              validateOnTouched={false}
                              autoCapitalize="none"
                            />
                          </FormContainer>
                          <FormContainer>
                            <View style={s.buttonsFormContainer}>
                              <Button
                                containerStyle={s.buttonContainer}
                                title={i18n.t('common.cancel')}
                                onPress={() => {
                                  passwordForm.handleReset();
                                  contactDetailsForm.handleReset();
                                  profileForm.handleReset();
                                }}
                              />
                              <Button
                                containerStyle={s.buttonContainer}
                                title={i18n.t('common.save')}
                                primary
                                onPress={() =>
                                  onSave({
                                    ...passwordForm.values,
                                    ...contactDetailsForm.values,
                                    ...profileForm.values,
                                  })
                                }
                                isLoading={isLoading}
                                disabled={
                                  isLoading ||
                                  !(
                                    profileForm.dirty ||
                                    contactDetailsForm.dirty ||
                                    passwordForm.dirty
                                  ) ||
                                  !(
                                    profileForm.isValid &&
                                    contactDetailsForm.isValid &&
                                    passwordForm.isValid
                                  )
                                }
                              />
                            </View>
                          </FormContainer>
                        </React.Fragment>
                      )}
                    </Form>
                  </React.Fragment>
                )}
              </Form>
            </React.Fragment>
          )}
        </Form>
      </View>
    </KeyboardAwareScrollView>
    <ActionSheet
      ref={(ref) => {
        this.actionSheetRefAvatar = ref;
      }}
      title={i18n.t('common.select')}
      message={i18n.t('settings.choosePhotos')}
      tintColor={colors.settingsScreen.actionSheetTintColor}
      options={actionSheetSettingsOptions}
      onPress={(index) => {
        setTimeout(() => addPhoto(index), 500);
      }}
      cancelButtonIndex={2}
    />
  </SafeAreaView>
);

SettingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton />,
  title: i18n.t('settings.settings'),
});

SettingsScreen.propTypes = {
  goToMyProfile: T.func,
  resendVerificationEmail: T.func,
  onSave: T.func,
  addPhoto: T.func,
  user: T.object,
  isChangingAvatar: T.bool,
  isLoading: T.bool,
  profileInitialValues: T.object,
  contactInitialValues: T.object,
  passwordInitialValues: T.object,
  formRef: T.any,
  contactFormRef: T.any,
  passwordFormRef: T.any,
};

export default observer(SettingsScreen);
