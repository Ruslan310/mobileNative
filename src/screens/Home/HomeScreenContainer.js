import {
  compose,
  hoistStatics,
  withStateHandlers,
  lifecycle,
  withHandlers,
  defaultProps,
  withPropsOnChange,
  withProps,
} from 'recompose';
import R from 'ramda';
import { inject } from 'mobx-react';
import uuid from 'uuid/v4';
import HomeScreenComponent from './HomeScreenView';
import { NavigationService } from '../../services';
import { categories as categoriesConstants } from '../../constants';
import { withDebounce } from '../../utils/enhancers';

const categories = categoriesConstants.map((item) => item.title);
const fullCategories = categoriesConstants;

const arrCoordinates = (value) => {
  const markers = value.reduce((acc, current) => {
    const body = {
      coordinate: {
        latitude: current.geolocation.lat,
        longitude: current.geolocation.lng,
      },
      cost: `${current.price.amount}`,
      key: uuid(),
    };
    acc.push(body);
    return acc;
  }, []);
  return markers;
};

export default hoistStatics(
  compose(
    inject((stores) => ({
      listings: stores.listings,
      listingsAsArr: stores.listings.list.asArray,
      products: stores.listings.list.asArray,
    })),

    defaultProps({
      categories: categoriesConstants,
      fullCategories,
    }),

    withStateHandlers(
      {
        selectedTabIndex: 0,
        selectedMarkerIndex: 0,
      },
      {
        onChangeTabIndex: () => (index) => ({
          selectedTabIndex: index,
        }),
      },
    ),

    withStateHandlers(
      {
        category: '',
        isRefreshing: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),

        chooseCategory: () => (category) => ({
          category,
        }),
      },
    ),

    withStateHandlers(
      {
        search: '',
      },
      {
        onChangeSearch: () => (search) => {
          return {
            search,
          };
        },
      },
    ),

    withHandlers({
      goToCategory: (props) => ({
        onlyCategory,
        showAllCategoriesButton,
        showCategoriesAsButton,
      }) => {
        NavigationService.navigateToCategory({
          onlyCategory,
          showAllCategoriesButton,
          showCategoriesAsButton,
          chooseCategory: (category) => {
            props.chooseCategory(category);
            NavigationService.goBack();
            props.onChangeSearch('');
          },
        });
      },

      getListingsBySearch: (props) => (title) => {
        props.listings.searchListings.run({
          title,
          categories,
        });
      },

      fetchAllListings: (props) => async () => {
        props.onChange('isRefreshing', true);

        await props.listings.fetchListings.run({
          categories: props.category || categories,
        });

        props.onChange('isRefreshing', false);
      },
    }),

    withDebounce('getListingsBySearch', 300),

    lifecycle({
      componentDidMount() {
        this.props.navigation.setParams({
          onChangeSearch: this.props.onChangeSearch,
          value: this.props.search,
        });
      },
    }),

    withPropsOnChange(['category'], async (props) => {
      await props.listings.fetchListings.run({
        categories: props.category || categories,
      });

      props.onChangeSearch('');
    }),

    withPropsOnChange(['search'], (props) => {
      props.getListingsBySearch(props.search);
      props.navigation.setParams({
        value: props.search,
      });
    }),

    withHandlers({
      // Filter products by category or if we've selected category
      // filter by category and sub category
      listingsFilter: (props) => (listings, categoryItem) =>
        listings.filter((i) =>
          props.category
            ? categoryItem && i.publicData.category === props.category
            : categoryItem && i.publicData.category === categoryItem,
        ),
    }),

    withHandlers({
      sort: (props) => () =>
        props.sectionList.map((i) =>
          props.listingsFilter(props.listings, i),
        ),
    }),

    withPropsOnChange(['category', 'search'], (props) => {
      return {
        // Filter by sub category
        data: props.listings.list.asArray.filter(
          (i) => i.publicData.category === props.category && i,
        ),

        // Form section list by category
        // When we have selected category we form section list by subcategory
        sectionList: props.category
          ? [
              fullCategories[
                fullCategories.findIndex(
                  (i) => i.title === props.category,
                )
              ].title,
            ]
          : fullCategories.map((i) => i.title),
      };
    }),
    withProps((props) => {
      let markers = arrCoordinates(
        R.flatten(
          props.sectionList.map((i) =>
            props.listingsFilter(props.listings.list.asArray, i),
          ),
        ),
      );

      if (props.data.length > 0) {
        markers = arrCoordinates(props.data);
      }
      return { markers };
    }),
  ),
)(HomeScreenComponent);
