import Stripe from 'stripe';

let stripe;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
}

// @desc    Process Stripe payment
// @route   POST /api/payments/stripe
// @access  Private
export const processStripePayment = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe not configured' });
    }

    const { amount, currency = 'inr' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit
      currency,
      metadata: {
        userId: req.user._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Stripe payment
// @route   POST /api/payments/stripe/verify
// @access  Private
export const verifyStripePayment = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Stripe not configured' });
    }

    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      res.json({
        success: true,
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100
      });
    } else {
      res.json({
        success: false,
        status: paymentIntent.status
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Stripe publishable key
// @route   GET /api/payments/stripe/config
// @access  Public
export const getStripeConfig = (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
  });
};

// @desc    Process PayPal payment (placeholder)
// @route   POST /api/payments/paypal
// @access  Private
export const processPayPalPayment = async (req, res) => {
  try {
    // PayPal integration would go here
    // For now, return PayPal client ID for frontend SDK
    res.json({
      clientId: process.env.PAYPAL_CLIENT_ID || ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
