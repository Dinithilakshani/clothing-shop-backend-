import nodemailer from 'nodemailer';
import { env } from '../config/env.config';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Send welcome email to new users
   */
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: env.SMTP_FROM,
        to: email,
        subject: '👗 Welcome to Dinu Fashion!',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            <!-- Header with Gradient Background -->
            <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 20px 15px; text-align: center; width: 100%; box-sizing: border-box;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px;">
                <span style="font-size: 32px; display: block; margin-bottom: 5px;">👗</span>
                Dinu <span style="color: #eaffd0;">Fashion</span>
              </h1>
              <p style="color: rgba(255, 255, 255, 0.95); margin: 8px 0 0; font-size: 15px; line-height: 1.4; font-weight: 500;">Style | Elegance | You</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 20px 15px; background: #ffffff; box-sizing: border-box; width: 100%;">
              <h2 style="color: #157347; margin: 0 0 15px 0; font-size: 22px; line-height: 1.4; font-weight: 700;">👋 Welcome to Dinu Fashion, ${name}!</h2>
              
              <p style="color: #222; font-size: 15px; line-height: 1.6; margin: 15px 0;">
                Thank you for joining the Dinu Fashion family! We’re excited to help you express your unique style. 🌿
              </p>
              
              <div style="background: #eaffd0; border-radius: 8px; padding: 15px; margin: 20px 0; box-sizing: border-box; width: 100%;">
                <h3 style="color: #157347; margin: 0 0 12px 0; font-size: 17px; line-height: 1.4; font-weight: 600;">🌟 Why Shop at Dinu Fashion?</h3>
                <ul style="margin: 0 0 0 18px; padding: 0; color: #157347; font-size: 14px; line-height: 1.6;">
                  <li style="margin-bottom: 6px;">👚 Trendy, high-quality clothing & accessories</li>
                  <li style="margin-bottom: 6px;">🚚 Fast, eco-friendly delivery</li>
                  <li style="margin-bottom: 6px;">💳 Secure checkout & flexible payment options</li>
                  <li style="margin-bottom: 6px;">💬 Friendly, responsive customer support</li>
                  <li>🎁 Exclusive offers for members</li>
                </ul>
              </div>
              
              <div style="background: #f3fff7; border-left: 4px solid #43e97b; padding: 12px 15px; margin: 20px 0; border-radius: 0 4px 4px 0; box-sizing: border-box; width: 100%;">
                <p style="margin: 0; color: #157347; font-style: italic; font-size: 14px; line-height: 1.5;">
                  💡 <strong>Style Tip:</strong> Complete your profile for personalized looks and early access to new arrivals!
                </p>
              </div>
              
              <div style="text-align: center; margin: 25px 0; width: 100%;">
                <a href="${env.CORS_ORIGIN}" 
                   style="display: inline-block; background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); color: white; 
                          padding: 12px 25px; text-decoration: none; border-radius: 4px; 
                          font-weight: 700; font-size: 15px; text-transform: uppercase;
                          box-shadow: 0 2px 4px rgba(67,233,123,0.18); width: 90%; max-width: 280px;
                          box-sizing: border-box; margin: 0 auto; letter-spacing: 1px;">
                  🛍️ Shop Now
                </a>
              </div>
              
              <p style="color: #157347; font-size: 14px; line-height: 1.6; margin: 0 0 5px 0;">
                Need help? Our team is here for you at 
                <a href="mailto:support@dinufashion.com" style="color: #43e97b; text-decoration: underline; word-break: break-all;">
                  support@dinufashion.com
                </a> 💌
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #f5fef7; padding: 15px; text-align: center; font-size: 13px; color: #157347; border-top: 1px solid #eaffd0; box-sizing: border-box; width: 100%;">
              <div style="margin-bottom: 10px; line-height: 1.8;">
                <a href="${env.CORS_ORIGIN}/about" style="color: #43e97b; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 600;">About Us</a>
                <span style="color: #b2eacb; margin: 0 5px;">•</span>
                <a href="${env.CORS_ORIGIN}/products" style="color: #43e97b; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 600;">Products</a>
                <span style="color: #b2eacb; margin: 0 5px;">•</span>
                <a href="${env.CORS_ORIGIN}/contact" style="color: #43e97b; text-decoration: none; margin: 0 8px; display: inline-block; font-weight: 600;">Contact</a>
              </div>
              <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 1.4; color: #157347;">
                &copy; ${new Date().getFullYear()} Dinu Fashion. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #b2eacb; line-height: 1.4;">
                You're receiving this email because you signed up for a Dinu Fashion account.
              </p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
