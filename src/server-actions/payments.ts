"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number((amount * 100).toFixed(0)),
      currency: "usd",
      description: "SheyOTT Payment",
    });

    return {
      success: true,
      data: { clientSecret: paymentIntent.clientSecret },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
