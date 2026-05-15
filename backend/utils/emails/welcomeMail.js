// Import the necessary modules here
import nodemailer from "nodemailer";
export const sendWelcomeEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.STORFLEET_SMPT_MAIL,
    to: user.email,
    subject: "Welcome to StoreFleet",
    html: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <!-- Logo -->
      <div style="margin-bottom: 20px;">
        <img src="https://files.codingninjas.in/logo1-32230.png" 
             alt="Storefleet Logo" 
             style="width: 120px; height: auto;" />
      </div>

      <!-- Heading -->
      <h2 style="color: #2e7d32;">Welcome to Storefleet</h2>
      
      <!-- Body -->
      <p>Hello, vivek</p>
      <p>Thank you for registering with Storefleet. We’re excited to have you as a new member of our community.</p>
      
      <!-- Button -->
      <a href="https://yourwebsite.com/get-started"
         style="display:inline-block; padding:10px 20px; background-color:#1976d2; color:#fff; text-decoration:none; border-radius:5px;">
         Get Started
      </a>
    </div>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  // Write your code here
};
