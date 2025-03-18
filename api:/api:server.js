{\rtf1\ansi\ansicpg1252\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const bodyParser = require('body-parser');\
const dotenv = require('dotenv');\
const \{ Resend \} = require('resend');\
\
dotenv.config(); // Load environment variables from .env\
\
const app = express();\
app.use(bodyParser.json());\
\
const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with the API key from environment variables\
\
// Endpoint to send verification email\
app.post('/send-verification-email', async (req, res) => \{\
  const \{ email \} = req.body;\
  if (!email) \{\
    return res.status(400).json(\{ success: false, error: 'Email is required' \});\
  \}\
\
  try \{\
    // Generate a code (simplified)\
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();\
\
    // Send email with Resend\
    await resend.emails.send(\{\
      from: 'Secure Access <noreply@yourdomain.com>',\
      to: [email],\
      subject: 'Your Verification Code',\
      text: `Your verification code is: $\{verificationCode\}`,\
    \});\
\
    // Save code (you need to store it somewhere, like a database or an in-memory store)\
\
    res.json(\{ success: true \});\
  \} catch (error) \{\
    res.status(500).json(\{ success: false, error: 'Failed to send verification email' \});\
  \}\
\});\
\
// Endpoint to verify the code\
app.post('/verify-code', async (req, res) => \{\
  const \{ email, code \} = req.body;\
  // Logic to check if the code is correct (e.g., check in a database)\
\
  if (code === '123456') \{ // Replace with actual code verification logic\
    res.json(\{ success: true, redirectUrl: 'https://www.your-secure-link.com' \});\
  \} else \{\
    res.status(400).json(\{ success: false, error: 'Invalid or expired code' \});\
  \}\
\});\
\
const port = process.env.PORT || 3000;\
app.listen(port, () => \{\
  console.log(`Server is running on port $\{port\}`);\
\});\
}