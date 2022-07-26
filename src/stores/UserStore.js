import {types as t, getRoot} from 'mobx-state-tree';
import {Image} from './ImageStore';
import {ReviewStore} from './ReviewsStore';

const UserRelationships = t.model('ProductRelationships', {
  profileImage: t.maybe(t.safeReference(t.late(() => Image))),
  stripeCustomer: t.maybe(t.safeReference(t.late(() => StripeCustomer))),
  stripeAccount: t.maybe(t.safeReference(t.late(() => StripeAccount))),
});

const PublicData = t.model('PublicData', {
  phoneNumber: t.maybe(t.string),
});
const ProtectedData = t.model('ProtectedData', {
  // phoneNumber: t.maybe(t.string),
});
const PrivateData = t.model('PrivateData', {
  // discoveredServiceVia: t.string,
});

const Profile = t.model('Profile', {
  firstName: t.maybe(t.string),
  lastName: t.maybe(t.string),
  displayName: t.maybe(t.string),
  abbreviatedName: t.maybe(t.string),
  bio: t.maybeNull(t.string),
  publicData: t.optional(PublicData, {}),
  protectedData: t.optional(ProtectedData, {}),
  privateData: t.optional(PrivateData, {}),
});

const StripeCard = t.model('StripeCard', {
  brand: t.maybe(t.string),
  expirationMonth: t.maybe(t.number),
  expirationYear: t.maybe(t.number),
  last4Digits: t.maybe(t.string)
})
export const StripeAccount = t.model('StripeAccount', {
  id: t.identifier,
  stripeAccountId: t.maybe(t.string),
})

export const StripePaymentMethod = t.model('stripePaymentMethod', {
  id: t.identifier,
  card: t.optional(StripeCard, {}),
  stripePaymentMethodId: t.maybe(t.string),
})

export const DefaultPaymentMethod = t.model('DefaultPaymentMethod', {
  defaultPaymentMethod: t.maybe(t.safeReference(t.late(() => StripePaymentMethod))),
})

export const StripeCustomer = t.model('StripeCustomer', {
  id: t.identifier,
  stripeCustomerId: t.maybe(t.string),
  relationships: t.optional(DefaultPaymentMethod, {}),
})


export const User = t.model('User', {
  id: t.identifier,
  banned: t.maybe(t.boolean),
  deleted: t.maybe(t.boolean),
  createdAt: t.maybe(t.Date),
  profile: t.maybe(Profile),
  email: t.maybe(t.string),
  emailVerified: t.maybe(t.boolean),
  pendingEmail: t.maybe(t.null),
  stripePayoutsEnabled: t.maybe(t.boolean),
  stripeChargesEnabled: t.maybe(t.boolean),
  stripeConnected: t.maybe(t.boolean),
  relationships: t.optional(UserRelationships, {}),
  stripeUrl: t.maybe(t.string),

  reviews: t.optional(ReviewStore, {}),
})

  .views((store) => ({
    get isViewer() {
      const {user} = getRoot(store).viewer;

      return (user && user.id) === (store && store.id);
    },
    get getFullName() {
      return `${store.profile.firstName} ${store.profile.firstName}`;
    },
  }));
