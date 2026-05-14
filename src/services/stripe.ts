import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your Publishable Key
// TODO: Replace with your actual Stripe Publishable Key
const stripePromise = loadStripe('');

export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    interval: string;
    currency: string;
    features: string[];
    recommended?: boolean;
    priceId: string; // Stripe Price ID
}

export const fetchPlans = async (): Promise<PricingPlan[]> => {
    // TODO: Replace with data fetched from your backend
    await new Promise(resolve => setTimeout(resolve, 600));

    return [
        {
            id: 'free',
            name: 'Free',
            price: '0',
            interval: 'forever',
            currency: '$',
            features: [
                '1 Resume Template',
                'Basic Customization',
                'PDF Download',
                '7-day access'
            ],
            priceId: '',
        },
        {
            id: 'pro-monthly',
            name: 'Pro Monthly',
            price: '12',
            interval: 'month',
            currency: '$',
            recommended: true,
            features: [
                'Unlimited Resumes',
                'All Premium Templates',
                'Advanced Analytics',
                'Cover Letter Builder',
                'Priority Support',
                'AI Writing Assistant'
            ],
            priceId: 'price_1QWYw2K1J5jW4hW456', // Replace with real Price ID
        },
        {
            id: 'pro-yearly',
            name: 'Pro Yearly',
            price: '99',
            interval: 'year',
            currency: '$',
            features: [
                'Everything in Monthly',
                'Save 30%',
                'LinkedIn Profile Optimization',
                'Personal Website',
                'Interview Prep Guide'
            ],
            priceId: 'price_1QWYw2K1J5jW4hW478', // Replace with real Price ID
        },
    ];
};

export const createCheckoutSession = async (priceId: string): Promise<void> => {
    if (!priceId) {
        console.warn('No price ID provided for checkout.');
        return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
        console.error('Stripe failed to load.');
        return;
    }

    try {
        // -------------------------------------------------------------------------
        // OPTION 1: Backend Session Creation (Recommended)
        // -------------------------------------------------------------------------
        /*
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ priceId }),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        */

        // -------------------------------------------------------------------------
        // OPTION 2: Client-Only Checkout (Legacy/Payment Links Logic)
        // Use this if you want to test without a backend immediately, 
        // BUT you must enable client-only checkout in Stripe Dashboard 
        // or use a pre-generated Payment Link URL.
        // -------------------------------------------------------------------------

        console.log(`Initiating checkout for ${priceId}...`);

        // For now, to show "Stripe functionalities", we can simulate the redirect 
        // to a real Stripe test URL or attempt a client-side redirect if enabled.

        // NOTE: This call WILL FAIL if the Price ID is not real or client-checkout is not enabled.
        // Using a dummy session ID to demonstrate the 'redirectToCheckout' call structure.

        // START_MOCK
        // Simulating a backend call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("This checks out! Now creating the Stripe Session and redirecting...");

        // If you had a session ID from the backend:
        // await stripe.redirectToCheckout({ sessionId: 'cs_test_mock_session_id' });
        // END_MOCK

    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Checkout failed. Please try again.');
    }
};
