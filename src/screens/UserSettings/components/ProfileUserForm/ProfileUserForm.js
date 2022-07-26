import React from 'react';
import {View} from "react-native";
import {Avatar, Button, Form, FormContainer, FormInput, Text, TextTouchable} from "../../../../components";
import s from "../../styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {ProfileSchema} from "../../../../validators/schemes";
import i18n from "../../../../i18n";
import {ActionSheetCustom as ActionSheet} from "react-native-actionsheet";
import {colors} from "../../../../styles";
import {actionSheetSettingsOptions} from "../../../../constants/options";
import {SafeAreaView} from "react-navigation";

const ProfileUserForm = ({
                           goToMyProfile,
                           addPhoto,
                           user,
                           onSave,
                           isChangingAvatar,
                           isLoading,
                           formRef,
                           profileInitialValues,
                         }) => {
  return (
    <SafeAreaView>
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
                <View style={s.tabHeader} >
                  <View style={s.headerComponent}>
                    <Text xxmediumSize style={{fontWeight: '500'}}>
                      {i18n.t('userSettings.profileSettings')}
                    </Text>
                    <TextTouchable onPress={goToMyProfile}>
                      {i18n.t('userSettings.myProfile')}
                    </TextTouchable>
                  </View>
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
                        {i18n.t('userSettings.tip')}
                      </Text>
                      <Text gray xxsmallSize>
                        {i18n.t('userSettings.formatSuggestion')}
                      </Text>
                    </View>
                  </View>

                  <Text bold gray xmediumSize style={s.titleComponent}>
                    {i18n.t('auth.yourName')}
                  </Text>

                  <FormInput.Field
                    placeholder={i18n.t('auth.firstNamePlaceholder')}
                    title={i18n.t('auth.firstName')}
                    containerStyle={s.input}
                    name="firstName"
                    maxLength={100}
                  />
                  <FormInput.Field
                    placeholder={i18n.t('auth.lastNamePlaceholder')}
                    title={i18n.t('auth.lastName')}
                    containerStyle={s.input}
                    name="lastName"
                    maxLength={100}
                  />

                  <Text bold gray xmediumSize style={s.titleComponent}>
                    {i18n.t('auth.profileBio')}
                  </Text>

                  <FormInput.Field
                    inputContainerStyle={s.bioInputContainer}
                    inputStyle={s.bioInput}
                    placeholder={i18n.t('userSettings.bioPlaceholder')}
                    title={i18n.t('userSettings.bio')}
                    name="bio"
                    multiline
                    maxLength={1200}
                  />

                </View>
                <View style={s.buttonsFormContainer}>
                  <Button
                    buttonStyle={{borderColor: colors.button.backgroundColorPrimaryCustom}}
                    titleStyle={{color: colors.button.backgroundColorPrimaryCustom}}
                    containerStyle={s.buttonContainer}
                    title={i18n.t('common.cancel')}
                    onPress={() => profileForm.handleReset()}
                  />
                  <Button
                    buttonStyle={{backgroundColor: colors.button.backgroundColorPrimary}}
                    titleStyle={{color: colors.button.backgroundColor}}
                    containerStyle={s.buttonContainer}
                    title={i18n.t('common.save')}
                    primary
                    onPress={() => onSave({
                      ...profileForm.values,
                    })}
                    isLoading={isLoading}
                    disabled={isLoading || !profileForm.dirty || !profileForm.isValid}
                  />
                </View>
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
        message={i18n.t('userSettings.choosePhotos')}
        tintColor={colors.settingsScreen.actionSheetTintColor}
        options={actionSheetSettingsOptions}
        onPress={(index) => {
          setTimeout(() => addPhoto(index), 500);
        }}
        cancelButtonIndex={2}
      />
    </SafeAreaView>
  );
};

export default ProfileUserForm;