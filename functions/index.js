const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const priceId = data.priceId;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // replace with the desired amount
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Error creating payment intent"
    );
  }
});
