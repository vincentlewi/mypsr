const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './.env'});
// const createCheckoutSession = require('./api/checkout');

const app = express();
const stripe = require('stripe')(process.env.SECRET_KEY);    
app.use(express.json());

const storeItems = new Map([
    [1, {priceInCents: 300, name: '$3 Thing'}],
    [2, {priceInCents: 600, name: '$6 Thing'}]
])

app.use(
    cors({
      origin: "http://localhost:3001",
    })
  )

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paynow', 'grabpay'],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "sgd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `https://vincentlewi.github.io/mypsr`,
      cancel_url: `https://smu.edu.sg`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(8080, () => console.log("Server listening from 8080"))