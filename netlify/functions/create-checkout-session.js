const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const products = {
  "Sticker Pack 10": { price: 1000 },    // $10.00
  "Sticker Pack 8": { price: 800 },      // $8.00
  "Sticker Pack 4": { price: 400 },      // $4.00
  "Custom Pencil": { price: 500 },       // $5.00
  "Bookmark": { price: 300 },             // $3.00
  "Test Item (Free)": { price: 0 },      // Free
  "Test Product": { price: 1234 }        // $12.34 - example test product
};

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const productName = body.productName;
  if (!productName || !products[productName]) {
    return { statusCode: 400, body: "Invalid product" };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: productName },
          unit_amount: products[productName].price,
        },
        quantity: 1,
      }],
      success_url: 'https://d1spa4merch.netlify.app/success',
      cancel_url: 'https://d1spa4merch.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
