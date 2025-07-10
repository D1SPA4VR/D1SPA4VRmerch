const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Item (Free)',
              description: 'Try checkout with Stripe',
            },
            unit_amount: 0,
          },
          quantity: 1
        }
      ],
      success_url: 'https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/success.html',
      cancel_url: 'https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};