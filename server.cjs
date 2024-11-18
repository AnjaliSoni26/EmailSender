const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY'  // Replace with your OpenAI API key
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_EMAIL_PASSWORD'
  }
});

app.post('/api/generate-and-send-emails', async (req, res) => {
  const { fileData, emailTemplate, customPrompt, scheduleTime, emailAccount } = req.body;

  const emailStatuses = [];
  
  for (const recipient of fileData) {
    const { name, email } = recipient;  // Customize based on your CSV structure

    // Generate the email body using OpenAI (GPT) with the custom prompt
    const emailBody = await generateEmailBody(name, emailTemplate, customPrompt);

    // Send the email using nodemailer (or your preferred email service)
    try {
      await sendEmail(emailAccount, email, `Personalized Email for ${name}`, emailBody);
      emailStatuses.push({ email, status: 'Sent' });
    } catch (error) {
      emailStatuses.push({ email, status: 'Failed' });
    }
  }

  res.json({ statuses: emailStatuses });
});

// Updated function to generate a custom email body using OpenAI GPT
async function generateEmailBody(name, template, customPrompt) {
  // The custom prompt can be used alongside the email template for better personalization
  const prompt = `
    Use the following prompt to personalize an email for a person named ${name}:
    "${customPrompt}"
    The email template is:
    "${template}"
  `;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',  // Use a model like GPT-3
    prompt: prompt,
    max_tokens: 150
  });

  return completion.data.choices[0].text;
}

// Function to send an email using nodemailer
async function sendEmail(from, to, subject, text) {
  await transporter.sendMail({
    from: from.email,  // Sender's email (connected account)
    to,  // Recipient email
    subject,  // Email subject
    text  // Email body generated by GPT
  });
}

app.listen(5000, () => console.log('Server running on port 5000'));
