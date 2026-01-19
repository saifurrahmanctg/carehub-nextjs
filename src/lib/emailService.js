import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingEmail({ to, userName, booking }) {
  const {
    bookingId,
    serviceName,
    duration,
    durationType,
    location,
    totalCost,
    status,
    createdAt,
  } = booking;

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #662c91 0%, #8bc53e 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }
        .invoice-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #662c91;
        }
        .value {
          color: #555;
        }
        .total {
          background: #662c91;
          color: white;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
        }
        .status {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          background: #ffa500;
          color: white;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #777;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          padding: 12px 30px;
          background: #8bc53e;
          color: white;
          text-decoration: none;
          border-radius: 25px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🏥 CareHub Booking Confirmation</h1>
      </div>
      
      <div class="content">
        <h2>Dear ${userName},</h2>
        <p>Thank you for booking with CareHub! Your booking has been received and is being processed.</p>
        
        <div class="invoice-details">
          <h3 style="color: #662c91; margin-top: 0;">📋 Booking Details</h3>
          
          <div class="detail-row">
            <span class="label">Booking ID:</span>
            <span class="value">#${bookingId}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Service:</span>
            <span class="value">${serviceName}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Duration:</span>
            <span class="value">${duration} ${durationType}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Location:</span>
            <span class="value">${location.division}, ${location.district}${location.city ? ", " + location.city : ""
    }${location.area ? ", " + location.area : ""}</span>
          </div>
          
          ${location.address
      ? `
          <div class="detail-row">
            <span class="label">Address:</span>
            <span class="value">${location.address}</span>
          </div>
          `
      : ""
    }
          
          <div class="detail-row">
            <span class="label">Booking Date:</span>
            <span class="value">${new Date(createdAt).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value"><span class="status">${status}</span></span>
          </div>
        </div>
        
        <div class="total">
          Total Amount: ৳${totalCost.toFixed(2)}
        </div>
        
        <p style="text-align: center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/my-bookings" class="button">
            View My Bookings
          </a>
        </p>
        
        <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
          <strong>What's Next?</strong><br>
          Our team will review your booking and confirm it shortly. You will receive another email once your booking is confirmed.
        </p>
        
        <p>
          If you have any questions, please don't hesitate to contact us.
        </p>
      </div>
      
      <div class="footer">
        <p>
          <strong>CareHub</strong><br>
          Professional Care Services Platform<br>
          Email: support@carehub.com | Phone: +880 1234-567890
        </p>
        <p style="font-size: 12px; color: #999;">
          This is an automated email. Please do not reply to this message.
        </p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"CareHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Booking Confirmation - ${serviceName} | CareHub`,
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}
