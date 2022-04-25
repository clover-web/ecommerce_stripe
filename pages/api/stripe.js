import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    //Sets request endpoint to POST
    if (req.method === 'POST') {
        //console.log(req.body);
        try {
            //Params object array
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1KsRr0Gs7XSzecnGyMF5IUmp' },
                    { shipping_rate: 'shr_1KsTL4Gs7XSzecnGqgVZ2crM' },
                ],
                //gets infomation from our req.body, when use clicks PAY WITH STRIPE the cart will then send the data to the backend
                //
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/mir5ar5a/production/').replace('-webp', '.webp')

                    return {
                        price_data: {
                            currency: 'gbp',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?canceled`,
            }

            // Create Checkout Sessions from body params.
            //passing params object back into stripe.checkout.sessions.create() 
            const session = await stripe.checkout.sessions.create(params);

            res.status(200).json(session);

        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}