/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import T from 'prop-types';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

import { NavigationService } from '../../services';
import {
  Text,
  Button,
  InputForm,
  Touchable,
  Loader,
} from '../../components';
import { AddPhotoButton, PhotoItem, WeekDay } from './components';
import s from './styles';
import i18n from '../../i18n';
import SelectButton from '../../components/SelectButton/SelectButton';
import { colors } from '../../styles';
import { isAndroid } from '../../utils';
import { actionSheetAddNewItemOptions } from '../../constants/options';

const isAndroidDevice = isAndroid();

const AddNewItemScreenView = ({
  title,
  category,
  description,
  price,
  location,
  activeField,
  onChange,
  photos,
  addPhoto,
  goToCategory,
  removePhoto,
  isValidFields,
  publishListing,
  isLoading,
  onChangeLocation,
  locationList,
  isEditing,
  updateProduct,
  setGeolocation,
  isLoadingPlaceDetails,
  isErrorPlaceDetails,
  entries,
  setEntries,
  isUpdateDay,
}) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    extraScrollHeight={30}
  >
    <View style={s.container}>
      <Text xxsmallSize gray style={s.textPhotos}>
        {i18n.t('addNewItem.photos')}
      </Text>
      <View style={s.photos}>
        {photos.map((item) => (
          <PhotoItem
            src={item.uri}
            onPress={() => removePhoto(item.id)}
            key={item.id}
          />
        ))}
        {photos.length < 6 && (
          <AddPhotoButton
            onPress={() => {
              this.actionSheetRef.show();
            }}
          />
        )}
      </View>
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.title')}
        value={title}
        active={activeField === 'title'}
        onFocus={() => onChange('activeField', 'title')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('title', text)}
        maxLength={100}
      />
      <SelectButton
        label={i18n.t('addNewItem.category')}
        containerStyle={s.inputContainer}
        value={category && `${category}`}
        onPress={goToCategory}
      />
      {/* {!!category && (
        // && !!subCategory
        <React.Fragment>
          <InputForm
            containerStyle={s.inputContainer}
            placeholder={i18n.t('addNewItem.brand')}
            value={brand}
            active={activeField === 'brand'}
            onFocus={() => onChange('activeField', 'brand')}
            onBlur={() => onChange('activeField', '')}
            onChangeText={(text) => onChange('brand', text)}
            maxLength={100}
          />
          <InputForm
            containerStyle={s.inputContainer}
            placeholder={i18n.t('addNewItem.level')}
            value={level}
            active={activeField === 'level'}
            onFocus={() => onChange('activeField', 'level')}
            onBlur={() => onChange('activeField', '')}
            onChangeText={(text) => onChange('level', text)}
            maxLength={100}
          />
        </React.Fragment>
      )} */}
      <InputForm
        containerStyle={[
          s.inputContainer,
          s.descriptionInputContainer,
        ]}
        labelStyle={s.descriptionLabel}
        inputStyle={s.descriptionInput}
        placeholder={i18n.t('addNewItem.description')}
        value={description}
        active={activeField === 'description'}
        onFocus={() => onChange('activeField', 'description')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) => onChange('description', text)}
        multiline
        maxLength={1200}
      />
      <InputForm
        containerStyle={s.inputContainer}
        placeholder={i18n.t('addNewItem.priceADay')}
        value={price}
        active={activeField === 'price'}
        onFocus={() => onChange('activeField', 'price')}
        onBlur={() => onChange('activeField', '')}
        onChangeText={(text) =>
          (text.match(/^\d+$/) || text.trim().length === 0) &&
          onChange('price', text)
        }
        keyboardType="numeric"
        maxLength={9}
      />
      <View
        style={[
          s.inputContainer,
          !isAndroidDevice && s.locationInputContainer,
        ]}
      >
        <View style={s.locationLoaderContainer}>
          {isLoadingPlaceDetails && (
            <ActivityIndicator
              style={s.locationLoader}
              size="large"
              color={colors.loader.secondary}
            />
          )}
          {isErrorPlaceDetails && (
            <Button
              onPress={() => setGeolocation()}
              title={i18n.t('addNewItem.retry')}
              containerStyle={s.retryButtonContainer}
              buttonStyle={s.retryButtonStyle}
              titleStyle={s.retryTitleStyle}
            />
          )}
        </View>

        <InputForm
          placeholder={i18n.t('addNewItem.location')}
          value={location}
          active={activeField === 'location'}
          onFocus={() => onChange('activeField', 'location')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChangeLocation(text)}
          maxLength={100}
        />

        {activeField === 'location' && locationList.length !== 0 && (
          <FlatList
            style={s.locationDropDownList}
            keyExtractor={(item) => item.id}
            data={locationList}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <View>
                <Touchable
                  onPress={() => {
                    onChange('location', item.description);
                    onChange('locationList', []);
                    onChange('placeid', item.place_id);
                    setGeolocation(item);
                  }}
                  style={s.locationDropDownListItem}
                >
                  <Text>{item.description}</Text>
                </Touchable>
              </View>
            )}
          />
        )}
      </View>
      {isUpdateDay ? (
        <Loader style={s.loaderUpdateDay} />
      ) : (
        <WeekDay entries={entries} setEntries={setEntries} />
      )}
    </View>
    <View>
      {isEditing ? (
        <View style={s.buttonContainer}>
          <Button
            title={i18n.t('addNewItem.cancel')}
            containerStyle={s.marginButton}
            onPress={() => NavigationService.goBack()}
          />
          <Button
            primary
            title={i18n.t('addNewItem.save')}
            containerStyle={s.marginButton}
            onPress={updateProduct}
            isLoading={isLoading}
            disabled={
              !isValidFields ||
              isErrorPlaceDetails ||
              isLoadingPlaceDetails ||
              isLoading
            }
          />
        </View>
      ) : (
        <Button
          disabled={
            !isValidFields ||
            isLoading ||
            isErrorPlaceDetails ||
            isLoadingPlaceDetails
          }
          primary
          title={i18n.t('addNewItem.publishListing')}
          containerStyle={[
            s.publishContainer,
            locationList.length !== 0 && s.buttonContainerBottom,
          ]}
          onPress={publishListing}
          isLoading={isLoading}
        />
      )}
    </View>
    <ActionSheet
      ref={(ref) => {
        this.actionSheetRef = ref;
      }}
      title={i18n.t('common.select')}
      message={i18n.t('addNewItem.choosePhotos')}
      tintColor={colors.addNewItemScreen.actionSheetTintColor}
      options={actionSheetAddNewItemOptions}
      onPress={(index) => {
        setTimeout(() => addPhoto(index), 500);
      }}
      cancelButtonIndex={2}
    />
  </KeyboardAwareScrollView>
);

AddNewItemScreenView.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('isEditing')
    ? i18n.t('addNewItem.editGoods')
    : i18n.t('addNewItem.addGoods'),
});

AddNewItemScreenView.propTypes = {
  title: T.string,
  category: T.string,
  brand: T.string,
  level: T.string,
  subCategory: T.string,
  description: T.string,
  price: T.string,
  location: T.string,
  activeField: T.string,
  onChange: T.func,
  photos: T.array,
  addPhoto: T.func,
  goToCategory: T.func,
  removePhoto: T.func,
  isValidFields: T.bool,
  publishListing: T.func,
  updateProduct: T.func,
  isLoading: T.bool,
  onChangeLocation: T.func,
  locationList: T.array,
  isEditing: T.bool,
  setGeolocation: T.func,
  isLoadingPlaceDetails: T.bool,
  isErrorPlaceDetails: T.bool,
  entries: T.array,
  setEntries: T.func,
  isUpdateDay: T.bool,
};

export default AddNewItemScreenView;
