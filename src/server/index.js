const express = require('express');
const cors = require('cors');
require('dotenv').config({path: './.env'});
// const createCheckoutSession = require('./api/checkout');

const app = express();
const stripe = require('stripe')(process.env.SECRET_KEY);    
app.use(express.json());

const storeItems = new Map([
    [1, {priceInCents: 300, name: 'Washer 1'}],
    [2, {priceInCents: 300, name: 'Washer 2'}],
    [3, {priceInCents: 300, name: 'Washer 3'}],
    [4, {priceInCents: 300, name: 'Washer 4'}],
    [5, {priceInCents: 300, name: 'Dryer 1'}],
    [6, {priceInCents: 300, name: 'Dryer 2'}],
    [7, {priceInCents: 300, name: 'Dryer 3'}],
    [8, {priceInCents: 300, name: 'Dryer 4'}]
])

app.use(
    cors({
      origin: "http://localhost:3000",
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
      success_url: `http://localhost:3000/mypsr/laundry`,
      cancel_url: `https://smu.edu.sg`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(8080, () => console.log("Server listening from 8080"))