import stripe from 'tipsi-stripe';
import config from '../../config';

class StripeService {
  init() {
    stripe.setOptions({
      publishableKey: config.STRIPE_API_KEY,
    });
  }

  createTokenWithBankAccount(params) {
    return stripe.createTokenWithBankAccount(params);
  }

  createPaymentMethod(params) {
    return stripe.createPaymentMethod(params);
  }

  createTokenWithCard(params) {
    return stripe.createTokenWithCard(params);
  }

  confirmPaymentIntent(params) {
    return stripe.confirmPaymentIntent(params)
  }

}

export default new StripeService();
