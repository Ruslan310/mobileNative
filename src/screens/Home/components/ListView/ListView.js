/* eslint-disable react/jsx-wrap-multilines  */
import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import T from 'prop-types';
import { observer } from 'mobx-react/custom';
import s from './styles';
import {
  FlatListVertical,
  RenderProductButton,
  EmptyFlatList,
} from '../../../../components';
import FlatListHorizontal from '../FlatListHorizontal/FlatListHorizontal';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const ListView = React.memo(
  ({
    listings,
    chooseCategory,
    category,
    goToProduct,
    search,
    searchListings,
    data,
    sectionList,
    listingsFilter,
    isRefreshing,
    fetchAllListings,
  }) => (
    <View style={s.container}>
      {!!search && (
        <FlatListVertical
          data={searchListings}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListIconName="search"
          emptyListMessage={i18n.t('home.nothingWasFound')}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
              forTwoColumns
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchAllListings}
              tintColor={colors.loader.secondary}
            />
          }
        />
      )}
      {!search && !!category && (
        <FlatListVertical
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          emptyListMessage={i18n.t('home.emptyList')}
          contentContainerStyle={s.list}
          renderItem={({ item }) => (
            <RenderProductButton
              item={item}
              goToProduct={goToProduct}
              forTwoColumns
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchAllListings}
              tintColor={colors.loader.secondary}
            />
          }
        />
      )}
      {!search && !!!category && (
        <FlatList
          style={s.listContainer}
          data={listings.length ? sectionList : []}
          keyExtractor={(item) => item}
          emptyListMessage={i18n.t('home.emptyList')}
          contentContainerStyle={[
            listings.length === 0 && s.emptyFlatList,
            s.list,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={fetchAllListings}
              tintColor={colors.loader.secondary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyFlatList message={i18n.t('home.emptyList')} />
          )}
          renderItem={({ item: categoryItem }) =>
            !!listingsFilter(listings, categoryItem).length && (
              <FlatListHorizontal
                data={listingsFilter(listings, categoryItem)}
                isRefreshing={isRefreshing}
                fetchAllListings={fetchAllListings}
                headerTitle={categoryItem}
                headerTitleTextTouchable={
                  listingsFilter(listings, categoryItem).length > 2
                    ? i18n.t('home.seeAll')
                    : null
                }
                headerOnPressTextTouchable={() =>
                  chooseCategory(
                    category || categoryItem,
                    category && categoryItem,
                  )
                }
                keyExtractor={(item) => item.id}
                emptyListMessage={i18n.t('home.emptyList')}
                renderItem={({ item }) => (
                  <RenderProductButton
                    item={item}
                    goToProduct={goToProduct}
                  />
                )}
              />
            )
          }
        />
      )}
    </View>
  ),
);

ListView.propTypes = {
  listings: T.array,
  chooseCategory: T.func,
  category: T.string,
  goToProduct: T.func,
  search: T.string,
  searchListings: T.array,
  data: T.array,
  sectionList: T.array,
  listingsFilter: T.func,
  fetchAllListings: T.func,
  isRefreshing: T.bool,
};

export default observer(ListView);
