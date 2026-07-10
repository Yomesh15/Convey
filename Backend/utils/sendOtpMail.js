import transporter from "../config/nodemailer.js";

const sendOtpMail = async (email, fullname, otp) => {
  try {
    await transporter.sendMail({
      from: `"Convey Team" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verify Your Convey Account",

      html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
  <div style="background:#ffffff;border-radius:12px;padding:35px;text-align:center;">

    <h1 style="color:#2563eb;margin-bottom:10px;">
      💬 Convey
    </h1>

    <h2>Verify Your Email</h2>

    <p>Hello <strong>${fullname}</strong>,</p>

    <p>Thank you for creating your Convey account.</p>

    <p>Use the verification code below:</p>

    <div style="
      display:inline-block;
      padding:18px 35px;
      margin:20px 0;
      font-size:32px;
      font-weight:bold;
      letter-spacing:10px;
      color:#2563eb;
      border:2px dashed #2563eb;
      border-radius:10px;
      background:#eef5ff;
    ">
      ${otp}
    </div>

    <p>This code will expire in <strong>5 minutes</strong>.</p>

    <p style="color:red;">
      Never share this OTP with anyone.
    </p>

    <hr style="margin:30px 0;">

    <p style="font-size:13px;color:#777;">
      If you didn't request this email, you can safely ignore it.
    </p>

    <p style="font-size:13px;color:#999;">
      © ${new Date().getFullYear()} Convey. All Rights Reserved.
    </p>

  </div>
</div>
      `,
    });

    console.log("✅ OTP Email Sent");
  } catch (error) {

    console.error(error);
    console.error(error.message);
    console.error(error.stack);
    throw error;
  }
};

export default sendOtpMail;