import { createEntitiesStore } from './utils/createEntitiesStore';
import { Product } from './ListingsStore';
import { StripeAccount, StripeCustomer, StripePaymentMethod, User } from './UserStore';
import { Image } from './ImageStore';
import { Transaction } from './TransactionStore';
import { Message } from './MessagesStore';
import { Booking } from './BookingStore';
import { Review } from './ReviewsStore';

const EntitiesStore = createEntitiesStore({
  listing: Product,
  image: Image,
  user: User,
  transaction: Transaction,
  message: Message,
  booking: Booking,
  reviews: Review,
  stripeCustomer: StripeCustomer,
  stripePaymentMethod: StripePaymentMethod,
  stripeAccount: StripeAccount,
});

export default EntitiesStore;
