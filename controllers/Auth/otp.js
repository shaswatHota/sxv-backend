const nodemailer = require("nodemailer");
const OTP = require("../../models/otp.models"); 

const sendOTPVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    await OTP.findOneAndUpdate(
      { email }, 
      { otp, createdAt: Date.now() }, 
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.EMAIL,
      to: await email,
      subject: "Verify your Email",
      html: `
     <html>
     <body>
     <div
     class="otp"
     style="
       height: fit-content;
       width: fit-content;
       border-radius: 10px;
       color: #ffffff;
       font-size: 20px;
       padding: 20px 50px;
       text-align: center;
       font-family: ''Courier New', Courier, monospace';
     "
     >
       <div style="display: flex;justify-content:center; margin-bottom:10px;">
         
         <img
           src="https://res.cloudinary.com/dlm8mel1x/image/upload/v1739813189/sxv/hfm2yuqb9ojsjajsc6r2.png"
           alt=""
           style="height: 60px;margin-right:60px;"
         />
         <a href="https://dev.enigmavssut.com/" target="_blank">
             <img
               src="https://drive.google.com/thumbnail?sz=w1000&id=1ObGs4jVe8QCoWaSkBo4KuL7ZfHFFbU_X"
               alt=""
               style="height: 70px;"
             />
           </a>
       </div>
       <h3 style="color: black">YOUR OTP FOR REGISTRATION IS</h3>
       <h1 style="color: black">
         <span
           style="padding: 5px; border-radius: 5px"
           >${otp}</span
         >
       </h1>
     
      
     </div>
   </body>
      </html>

      `,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: `Verification OTP sent to ${email}`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err: error.message
    });
  }
};

module.exports = sendOTPVerification;
