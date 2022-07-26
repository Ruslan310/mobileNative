/* eslint-disable no-unused-expressions */
import {
  compose,
  hoistStatics,
} from 'recompose';
import { inject } from 'mobx-react';
import AuthWithView from './AuthWithView';

export default hoistStatics(
  compose(
    inject('auth')
  ),
)(AuthWithView);
