import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

//Handles our stripe asyncronous promise
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }

    return stripePromise;
}

//exports our getStripe function
export default getStripe;