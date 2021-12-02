import React from 'react';
import {
  compose,
  hoistStatics,
  withHandlers,
  defaultProps,
  withProps,
} from 'recompose';
import ImagePicker from 'react-native-image-crop-picker';
import { inject } from 'mobx-react';
import { Keyboard } from 'react-native';
import uuid from 'uuid/v4';
import {
  PermissionService,
  NavigationService,
  AlertService,
} from '../../services';
import SettingsScreenView from './SettingsScreenView';
import i18n from '../../i18n';

export default hoistStatics(
  compose(
    inject(({ viewer }) => ({
      user: viewer.user,
      changeAvatar: viewer.changeAvatar,
      updateProfile: viewer.updateProfile,
      changeEmail: viewer.changeEmail,
      changePassword: viewer.changePassword,
      sendVerifyEmail: viewer.sendVerifyEmail,
      isUpdatingProfile: viewer.updateProfile.inProgress,
      isChangingEmail: viewer.changeEmail.inProgress,
      isChangingPassword: viewer.changePassword.inProgress,
      isChangingAvatar: viewer.changeAvatar.inProgress,
    })),

    defaultProps({
      formRef: React.createRef(),
      contactFormRef: React.createRef(),
      passwordFormRef: React.createRef(),
    }),

    withProps(
      ({
        user,
        isUpdatingProfile,
        isChangingEmail,
        isChangingPassword,
      }) => {
        const profileInitialValues = {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          bio: user.profile.bio || '',
        };
        const contactInitialValues = {
          email: user.email,
          phone:
            (user.profile.publicData &&
              user.profile.publicData.phoneNumber) ||
            '',
          currentPasswordForEmail: '',
        };
        const passwordInitialValues = {
          newPassword: '',
          currentPassword: '',
          replyPassword: '',
        };

        const isLoading =
          isChangingPassword || isUpdatingProfile || isChangingEmail;
        return {
          profileInitialValues,
          contactInitialValues,
          passwordInitialValues,
          isLoading,
        };
      },
    ),

    withHandlers({
      goToMyProfile: ({ user }) => () =>
        NavigationService.navigateToProfile({
          user,
        }),

      resendVerificationEmail: ({ sendVerifyEmail }) => async () => {
        try {
          await sendVerifyEmail.run();

          AlertService.showAlert(
            i18n.t('settings.verifyEmail'),
            i18n.t('settings.verifyEmailSent'),
          );
        } catch (error) {
          AlertService.showSomethingWentWrong();
        }
      },

      updateProfile: ({ updateProfile, formRef }) => async (data) => {
        try {
          await updateProfile.run({ ...data });
        } catch (err) {
          if (err.fields && err.fields.includes('phone')) {
            formRef.current.form.setFieldError(
              'phone',
              i18n.t('errors.incorrectPhone'),
            );
          }
        }
      },

      changeEmail: ({ changeEmail, formRef }) => async (data) => {
        try {
          await changeEmail.run({ ...data });
        } catch (err) {
          if (err.fields && err.fields.includes('email')) {
            formRef.current.form.setFieldError(
              'email',
              i18n.t('errors.incorrectEmail'),
            );
          }

          if (err.status === 403) {
            formRef.current.form.setFieldError(
              'currentPasswordForEmail',
              i18n.t('errors.incorrectPassword'),
            );
          } else {
            AlertService.showSomethingWentWrong();
          }
        }
      },

      changePassword: ({ changePassword, formRef }) => async (
        data,
      ) => {
        try {
          await changePassword.run({ ...data });
        } catch (err) {
          if (err.status === 403) {
            formRef.current.form.setFieldError(
              'currentPassword',
              i18n.t('errors.incorrectPassword'),
            );
          } else {
            AlertService.showAlert(
              i18n.t('settings.errorChangeEmail'),
              i18n.t('settings.errorChangeEmailDetails'),
            );
          }
        }
      },

      addPhotoByCamera: (props) => async () => {
        try {
          if (await PermissionService.getCameraPermission()) {
            const image = await ImagePicker.openCamera({
              cropping: true,
            });

            props.changeAvatar.run({
              id: uuid(),
              uri: image.path,
              name: `image_${uuid()}.jpg`,
              type: image.mime,
            });
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },

      addPhotoFormLibrary: (props) => async () => {
        try {
          if (await PermissionService.getCameraRollPermission()) {
            const image = await ImagePicker.openPicker({
              cropping: true,
            });

            props.changeAvatar.run({
              id: uuid(),
              uri: image.path,
              name: `image_${uuid()}.jpg`,
              type: image.mime,
            });
          }
        } catch (error) {
          if (error.code === 'E_PICKER_CANCELLED') {
            // do nothing;
          }
        }
      },
    }),

    withHandlers({
      addPhoto: (props) => (index) => {
        if (index === 0) {
          props.addPhotoFormLibrary();
        } else if (index === 1) {
          props.addPhotoByCamera();
        }
      },

      onSave: ({
        user,
        updateProfile,
        changeEmail,
        changePassword,
        contactFormRef,
        passwordFormRef,
      }) => async (data) => {
        Keyboard.dismiss();
        if (
          data.firstName !== user.profile.firstName ||
          data.lastName !== user.profile.lastName ||
          data.bio !== user.profile.bio ||
          data.phone !== user.profile.publicData.phoneNumber
        ) {
          updateProfile(data);
        }

        if (data.email !== user.email) {
          changeEmail(data);
          contactFormRef.resetForm();
        }

        if (
          data.currentPassword &&
          data.newPassword &&
          data.replyPassword &&
          data.newPassword === data.replyPassword
        ) {
          changePassword(data);
          passwordFormRef.resetForm();
        }
      },
    }),
  ),
)(SettingsScreenView);
