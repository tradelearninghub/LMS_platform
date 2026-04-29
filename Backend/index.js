require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend URL
  credentials: true,
}));

// Use JSON body parser for all standard routes
// Note: If we use Stripe later, we might need a raw body parser for the webhook route
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running securely' });
});

// Placeholder for future payment integration
app.post('/api/create-checkout', async (req, res) => {
  // Logic for creating a payment session (e.g., LemonSqueezy, Stripe, Custom) will go here
  res.status(501).json({ message: 'Payment gateway not implemented yet' });
});

// Route to send confirmation email
app.post('/api/send-approval-email', async (req, res) => {
  const { email, courseTitle } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Generate a test account if you don't have SMTP credentials set in .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "test", // Replace with real credentials in .env
        pass: process.env.SMTP_PASS || "test", // Replace with real credentials in .env
      },
    });

    // We only send if SMTP_USER is configured, otherwise just log it to prevent crashes with fake ethereal login
    if (process.env.SMTP_USER) {
      await transporter.sendMail({
        from: '"Trade Learning Hub" <admin@tradelearninghub.com>',
        to: email,
        subject: `Access Granted: ${courseTitle}`,
        text: `Your payment for "${courseTitle}" has been verified! You now have full access to the course. Log in to your dashboard to start learning.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Payment Verified! 🎉</h2>
            <p>Your payment for <strong>${courseTitle}</strong> has been successfully verified.</p>
            <p>You now have full, lifetime access to the course content. Head over to your Dashboard to start learning.</p>
            <br/>
            <p>Happy Trading,<br/>The Trade Learning Hub Team</p>
          </div>
        `,
      });
      console.log(`Email sent to ${email}`);
    } else {
      console.log(`[MOCK EMAIL] Access granted email would be sent to: ${email} for course: ${courseTitle}. (Configure SMTP in Backend/.env to actually send)`);
    }

    res.json({ success: true, message: 'Email process completed' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
