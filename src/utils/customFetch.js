import axios from "axios";


export async function stripeCustomFetch( method, url, data ) {
    const options = {
        method: method,
        url: `https://api.stripe.com/v1/${url}`,
        data: data,
        headers: {
            'Authorization': 'Bearer sk_test_sWn00W2mcVIeKF6VygSss6WT',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };

    const res = await axios(options);

    try {
        return res;
    } catch (e) {
        return new Error(e);
    }
}