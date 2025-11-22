module.exports = [
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/email-service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emailService",
    ()=>emailService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-ssr] (ecmascript)");
;
class EmailService {
    transporter = null;
    getConfig() {
        return {
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || '',
                pass: process.env.SMTP_PASS || ''
            }
        };
    }
    async getTransporter() {
        if (!this.transporter) {
            const config = this.getConfig();
            if (!config.auth.user || !config.auth.pass) {
                throw new Error('Email configuration missing. Please set SMTP_USER and SMTP_PASS in your .env.local file');
            }
            this.transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createTransport(config);
            // Verify connection
            try {
                await this.transporter.verify();
                console.log('Email server connection established successfully');
            } catch (error) {
                console.error('Failed to connect to email server:', error);
                this.transporter = null;
                throw new Error('Email service connection failed. Please check your email configuration.');
            }
        }
        if (!this.transporter) {
            throw new Error('Email transporter not initialized');
        }
        return this.transporter;
    }
    async sendOTP(email, otp) {
        try {
            const transporter = await this.getTransporter();
            const appName = ("TURBOPACK compile-time value", "StockMaster") || 'StockMaster';
            const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification - ${appName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .otp-box { background: #f8f9fa; border: 2px dashed #e9ecef; border-radius: 10px; padding: 30px; text-align: center; margin: 30px 0; }
            .otp-code { font-size: 36px; font-weight: bold; color: #495057; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
            .btn { display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 ${appName}</h1>
              <p>Password Reset Verification</p>
            </div>
            
            <div class="content">
              <h2>Your OTP Code</h2>
              <p>Hello,</p>
              <p>You requested to reset your password for your ${appName} account. Please use the following One-Time Password (OTP) to proceed with your password reset:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
                <p style="margin-top: 15px; color: #6c757d;">Enter this code in the application</p>
              </div>
              
              <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>This OTP is valid for <strong>5 minutes</strong> only</li>
                  <li>Don't share this code with anyone</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </div>
              
              <p>If you're having trouble, you can copy and paste the OTP code above into the application.</p>
              
              <p>Best regards,<br>The ${appName} Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated email from ${appName} Inventory Management System</p>
              <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
        </html>
      `;
            const textContent = `
${appName} - Password Reset OTP

Your OTP Code: ${otp}

You requested to reset your password. Please use this One-Time Password (OTP) to proceed with your password reset.

This OTP is valid for 5 minutes only. Don't share this code with anyone.

If you didn't request this, please ignore this email.

Best regards,
The ${appName} Team

Generated on: ${new Date().toLocaleString()}
      `;
            const mailOptions = {
                to: email,
                subject: `🔐 Password Reset OTP for ${appName}`,
                html: htmlContent,
                text: textContent
            };
            const info = await transporter.sendMail({
                from: `"${appName}" <${this.getConfig().auth.user}>`,
                ...mailOptions
            });
            console.log('OTP email sent successfully:', info.messageId);
            return true;
        } catch (error) {
            console.error('Failed to send OTP email:', error);
            return false;
        }
    }
    async sendLowStockAlert(recipients, products) {
        try {
            const transporter = await this.getTransporter();
            const appName = ("TURBOPACK compile-time value", "StockMaster") || 'StockMaster';
            const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Low Stock Alert - ${appName}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .alert-item { background: #fff5f5; border-left: 4px solid #f56565; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #6c757d; font-size: 14px; }
            .critical { background: #fed7d7; border-left-color: #e53e3e; }
            .warning { background: #fefcbf; border-left-color: #d69e2e; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 ${appName}</h1>
              <p>Low Stock Alert</p>
            </div>
            
            <div class="content">
              <h2>Attention Required!</h2>
              <p>The following products are running low and need to be restocked:</p>
              
              ${products.map((product)=>`
                <div class="alert-item ${product.stock === 0 ? 'critical' : 'warning'}">
                  <h3 style="margin: 0 0 10px 0;">${product.name}</h3>
                  <p style="margin: 0;"><strong>SKU:</strong> ${product.sku}</p>
                  <p style="margin: 0;"><strong>Current Stock:</strong> ${product.stock} ${product.uom}</p>
                  <p style="margin: 0;"><strong>Reorder Level:</strong> ${product.reorderLevel || 'Not set'} ${product.uom}</p>
                  <p style="margin: 0;"><strong>Category:</strong> ${product.category}</p>
                  ${product.stock === 0 ? '<p style="color: #e53e3e; font-weight: bold; margin: 5px 0 0 0;">⚠️ OUT OF STOCK</p>' : ''}
                </div>
              `).join('')}
              
              <p style="margin-top: 30px;">Please review these items and place orders as needed to maintain adequate inventory levels.</p>
              
              <p>Best regards,<br>The ${appName} System</p>
            </div>
            
            <div class="footer">
              <p>This is an automated alert from ${appName} Inventory Management System</p>
              <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
        </html>
      `;
            const textContent = `
${appName} - Low Stock Alert

${products.length} products need attention:

${products.map((product)=>`
• ${product.name} (${product.sku})
  Current Stock: ${product.stock} ${product.uom}
  Reorder Level: ${product.reorderLevel || 'Not set'} ${product.uom}
  Category: ${product.category}
  ${product.stock === 0 ? '⚠️ OUT OF STOCK' : ''}
`).join('\n')}

Please review and place orders as needed.

Best regards,
The ${appName} System

Generated on: ${new Date().toLocaleString()}
      `;
            // Send to all recipients
            const sendPromises = recipients.map(async (recipient)=>{
                try {
                    const info = await transporter.sendMail({
                        from: `"${appName} Alerts" <${this.getConfig().auth.user}>`,
                        to: recipient,
                        subject: `🚨 Low Stock Alert - ${products.length} Products Need Attention`,
                        html: htmlContent,
                        text: textContent
                    });
                    console.log(`Low stock alert sent to ${recipient}:`, info.messageId);
                    return true;
                } catch (error) {
                    console.error(`Failed to send alert to ${recipient}:`, error);
                    return false;
                }
            });
            const results = await Promise.all(sendPromises);
            return results.every((result)=>result);
        } catch (error) {
            console.error('Failed to send low stock alerts:', error);
            return false;
        }
    }
    async testConnection() {
        try {
            const transporter = await this.getTransporter();
            await transporter.verify();
            return true;
        } catch (error) {
            console.error('Email service test failed:', error);
            return false;
        }
    }
}
const emailService = new EmailService();
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f13ba6b2._.js.map