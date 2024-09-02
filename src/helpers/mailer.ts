import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
4;
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
        });
    } else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
    }


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GI, 
          pass: process.env.GP   
        }
      });

      let mailOptions = {
        from: `"Murtaza" ${process.env.GI}`, // Sender address
        to: email,          // List of recipients
        subject: emailType === "VERIFY" ? "Verify your Id" : "Reset Your Password",                         // Subject line
        text: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",                       // Plain text body
        html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}  </p>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });

    
  } catch (error: any) {
    throw new Error(error.message);
  }
};
