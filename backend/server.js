require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

// =====================================
// RAZORPAY INSTANCE
// =====================================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

// =====================================
// HEALTH CHECK
// =====================================
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message:
      'PsyCare Backend Running',
  });
});

// =====================================
// CREATE ORDER
// =====================================
app.post(
  '/create-order',
  async (req, res) => {
    try {
      const {
        amount,
        currency,
      } = req.body;

      const options = {
        amount: amount * 100,

        currency:
          currency || 'INR',

        receipt: `receipt_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(
        'Create Order Error:',
        error
      );

      res.status(500).json({
        success: false,

        message:
          'Unable to create order',

        error: error.message,
      });
    }
  }
);

// =====================================
// VERIFY PAYMENT
// =====================================
// FAKE VERIFICATION FOR EXPO GO
// =====================================
app.post(
  '/verify-payment',
  async (req, res) => {
    try {
      return res.status(200).json({
        success: true,

        message:
          'Payment verified successfully',
      });
    } catch (error) {
      console.log(
        'Verify Payment Error:',
        error
      );

      res.status(500).json({
        success: false,

        message:
          'Verification failed',

        error: error.message,
      });
    }
  }
);

// =====================================
// PAYMENT DETAILS
// =====================================
app.get(
  '/payment/:paymentId',
  async (req, res) => {
    try {
      const payment =
        await razorpay.payments.fetch(
          req.params.paymentId
        );

      res.status(200).json({
        success: true,
        payment,
      });
    } catch (error) {
      console.log(
        'Fetch Payment Error:',
        error
      );

      res.status(500).json({
        success: false,

        message:
          'Unable to fetch payment',

        error: error.message,
      });
    }
  }
);

// =====================================
// SEND CONFIRMATION EMAIL
// =====================================
app.post(
  '/send-confirmation-email',
  async (req, res) => {
    try {
      const {
        email,
        doctorName,
        amount,
        consultationType,
      } = req.body;

      const transporter =
        nodemailer.createTransport({
          service: 'gmail',

          auth: {
            user:
              process.env.EMAIL_USER,

            pass:
              process.env.EMAIL_PASS,
          },
        });

      const htmlTemplate = `
        <div style="font-family: Arial; padding: 20px;">
          
          <h1 style="color:#10b981;">
            PsyCare Appointment Confirmed
          </h1>

          <p>
            Your appointment has been booked successfully.
          </p>

          <div style="
            background:#f1f5f9;
            padding:20px;
            border-radius:10px;
            margin-top:20px;
          ">
            
            <h3>Appointment Details</h3>

            <p>
              <strong>Doctor:</strong>
              ${doctorName}
            </p>

            <p>
              <strong>Consultation Type:</strong>
              ${consultationType}
            </p>

            <p>
              <strong>Amount Paid:</strong>
              ₹${amount}
            </p>

            <p>
              <strong>Status:</strong>
              Confirmed
            </p>

          </div>

          <p style="margin-top:20px;">
            Thank you for choosing PsyCare ❤️
          </p>

        </div>
      `;

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          'PsyCare Appointment Confirmation',

        html: htmlTemplate,
      });

      res.status(200).json({
        success: true,

        message:
          'Confirmation email sent successfully',
      });
    } catch (error) {
      console.log(
        'Email Error:',
        error
      );

      res.status(500).json({
        success: false,

        message:
          'Unable to send email',

        error: error.message,
      });
    }
  }
);

// =====================================
// START SERVER
// =====================================
const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  '0.0.0.0',
  () => {
    console.log(
      `🚀 PsyCare Backend Running On Port ${PORT}`
    );
  }
);