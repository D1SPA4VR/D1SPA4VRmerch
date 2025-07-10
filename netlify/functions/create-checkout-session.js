const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

  try {
    let session;

    if (productName === "Sticker Pack 10") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Sticker Pack 10" },
            unit_amount: 1000,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Sticker Pack 8") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Sticker Pack 8" },
            unit_amount: 800,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Sticker Pack 4") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Sticker Pack 4" },
            unit_amount: 400,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Custom Pencil") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Custom Pencil" },
            unit_amount: 500,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Bookmark") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Bookmark" },
            unit_amount: 300,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Test Item (Free)") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Test Item (Free)" },
            unit_amount: 0,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else if (productName === "Test Product") {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: "Test Product" },
            unit_amount: 1234,
          },
          quantity: 1,
        }],
        success_url: 'https://d1spa4merch.netlify.app/success',
        cancel_url: 'https://d1spa4merch.netlify.app/cancel',
      });

    } else {
      return { statusCode: 400, body: "Invalid product name." };
    }

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
