import {
  compose,
  hoistStatics,
  lifecycle,
  withHandlers,
  branch,
  renderComponent,
  withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import MyListingsScreenView from './MyListingsScreenView';
import { NavigationService } from '../../services';
import { ScreenLoader } from '../../components';

export default hoistStatics(
  compose(
    inject(({ listings }) => ({
      listings: listings.ownList.asArray,
      fetchOwnListings: listings.fetchOwnListings,
      isLoading: listings.fetchOwnListings.inProgress,
    })),

    withStateHandlers(
      {
        isRefreshing: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      goToAddNewItem: () => () =>
        NavigationService.navigateToAddNewItem(),
      goToProduct: () => (product) =>
        NavigationService.navigateToProduct({ product }),

      fetchAllListings: (props) => async () => {
        props.onChange('isRefreshing', true);

        await props.fetchOwnListings.run();
        props.onChange('isRefreshing', false);
      },
    }),

    lifecycle({
      componentDidMount() {
        this.props.fetchOwnListings.run();
      },
    }),

    branch(
      (props) => !props.isRefreshing && props.isLoading,
      renderComponent(ScreenLoader),
    ),
  ),
)(MyListingsScreenView);
