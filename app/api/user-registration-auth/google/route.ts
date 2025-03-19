import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const jwtSecret = process.env.JWT_SECRET!;
const brevoSmtpUsername = process.env.BREVO_SMTP_USERNAME!;
const brevoSmtpPassword = process.env.BREVO_SMTP_PASSWORD!;
const senderEmail = process.env.SENDER_EMAIL!;

async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: { user: brevoSmtpUsername, pass: brevoSmtpPassword },
  });

  const verificationLink = `http://localhost:3000/api/user-registration-verify-email?token=${verificationToken}`;

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - HarvestHub</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center; }
      .logo { width: 150px; }
      h1 { color: #4CAF50; }
      p { color: #555; font-size: 16px; line-height: 1.6; }
      .button { display: inline-block; padding: 12px 24px; margin: 20px 0; color: #fff; background-color: #4CAF50; text-decoration: none; font-size: 18px; border-radius: 5px; }
      .footer { margin-top: 20px; font-size: 12px; color: #888; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to HarvestHub! 🌱</h1>
      <p>Thank you for joining us! You're just one step away from accessing the best fresh and local produce.</p>
      <p>Click the button below to verify your email and activate your account:</p>
      <a href="${verificationLink}" class="button">Verify My Email</a>
      <p>If you did not sign up for HarvestHub, you can safely ignore this email.</p>
      <p class="footer">HarvestHub | Fresh, Local, Sustainable</p>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: senderEmail,
    to: email,
    subject: 'Verify Your Email Address',
    html: htmlContent,
  });
  console.log('Verification email sent to:', email);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const body = await req.json();
    const { 
      token, 
      accountType, 
      businessDocument, 
      businessName, 
      registrationNumber, 
      businessDocumentName, 
      businessDocumentType,
      firstName,
      lastName
    } = body;
  
    if (!token || !accountType) return NextResponse.json({ error: 'Token and account type required' }, { status: 400 });
  
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      if (!user.email) return NextResponse.json({ error: 'Failed to retrieve user email' }, { status: 400 });
  
      const { rows } = await pool.query('SELECT * FROM harvesthub_users WHERE email = $1', [user.email]);
      if (rows.length > 0) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  
      const twoFactorSecret = speakeasy.generateSecret({ name: `HarvestHub:${user.email}` });
      const backupCodes = Array(10).fill(0).map(() => speakeasy.generateSecret().base32.slice(0, 10));
      const verificationToken = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '24h' });
  
      await pool.query(
        `INSERT INTO harvesthub_users (
          email, 
          password, 
          first_name, 
          last_name, 
          account_type, 
          verification_token, 
          two_factor_secret, 
          two_factor_backup_codes, 
          login_method, 
          business_document,
          business_name,
          registration_number,
          business_document_name,
          business_document_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
        [
          user.email,
          'google-auth',
          firstName || user.given_name || 'Unknown',
          lastName || user.family_name || 'Unknown',
          accountType,
          verificationToken,
          twoFactorSecret.base32,
          JSON.stringify(backupCodes),
          'google',
          businessDocument || null,
          businessName || null,
          registrationNumber || null,
          businessDocumentName || null,
          businessDocumentType || null
        ]
      );
  
      await sendVerificationEmail(user.email, verificationToken);
  
      return NextResponse.json({
        message: 'Registration successful via Google. Please verify your email and set up 2FA.',
        twoFactorSecret: twoFactorSecret.otpauth_url,
        backupCodes,
      }, { status: 201 });
    } catch (error) {
      console.error('Google auth error:', error);
      return NextResponse.json({ error: 'Failed to register with Google' }, { status: 500 });
    }
  }