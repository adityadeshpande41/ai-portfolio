# Email Setup Guide

The contact form now sends emails directly to your Gmail address instead of storing in the database.

## Setup Steps:

### 1. Enable 2-Factor Authentication on Gmail
- Go to https://myaccount.google.com/security
- Enable 2-Step Verification if not already enabled

### 2. Create Gmail App Password
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" as the app
- Select "Other" as the device and name it "Portfolio Website"
- Click "Generate"
- Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 3. Update .env File
Add these lines to your `.env` file:

```
EMAIL_USER="amdnyu@gmail.com"
EMAIL_PASS="your-16-character-app-password"
```

**Important**: Use the App Password, NOT your regular Gmail password!

### 4. Restart Server
```bash
npm run dev
```

## How It Works:

When someone fills out the contact form:
1. They enter: Name, Email, Subject, Message
2. An email is sent to `amdnyu@gmail.com` with:
   - Subject: "Portfolio Contact: [their subject]"
   - Body: Formatted with their name, email, and message
   - Reply-To: Set to their email (you can reply directly)

## Testing:

1. Go to http://localhost:3001/contact
2. Fill out the form
3. Check your Gmail inbox for the email

## Troubleshooting:

**Error: "EMAIL_USER and EMAIL_PASS must be set"**
- Make sure you added both variables to `.env`
- Restart the server after updating `.env`

**Error: "Invalid login"**
- Make sure you're using an App Password, not your regular password
- Make sure 2FA is enabled on your Google account
- Try generating a new App Password

**Not receiving emails?**
- Check your spam folder
- Verify the EMAIL_USER is correct
- Make sure the App Password is copied correctly (no spaces)
