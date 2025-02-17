const User = require("../../models/user");
const nodemailer = require("nodemailer");

const genTicket = (req, res, next) => {
  const userId = req.user.userId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  User.findById(userId)
    .then(async (user) => {
      if (user.isVssutian) {
        res.json({
          success: true,
          message: "VSSUTians do not require pass for the fest",
        });
      } else {
        if (!user.paymentStatus) {
          res.json({
            success: false,
            message:
              "Oops!! It seems like you have not completed the payment process. Check your email for the payment process. If you have completed your payment and facing any issues contact us",
          });
        }
        if (user.paymentStatus && user.ticketGenerated) {
          res.json({
            success: true,
            message:
              "The ticket has been sent to your email. Kindly check your email. If you are facing any issue contact us.",
          });
        }
        if (user.paymentStatus && !user.ticketGenerated) {
          if (user.paymentType === 2) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Pass</title>
</head>

<body style="width: 650px; margin: 30px 100px;">
    <div style="display: flex; justify-content: center; width: 100%; height: 100%; position: relative;">
        
        <!-- First Image -->
        <img src="https://drive.google.com/thumbnail?id=1N5c3IzrbVWICLv0dkvTn_-UQQlJTcRdG&sz=s800" alt="Logo"
            style="width: 500px; height: 250px;">

        <!-- Second Image Container -->
        <div style="position: relative; height: 250px; min-width: 100px; display: flex; justify-content: center; align-items: center;">
            
            <!-- Second Image -->
            <img src="https://drive.google.com/thumbnail?id=1W8DHLtYSTtITgmva3aQi3si9NcgBOqvX&sz=s800" alt="Logo"
                style="width: 100px; height: 250px;">

            <!-- Rotated Text (Overlay on Image) -->
            <div style="position: absolute; top: 53%; left: 50%; transform: translate(-65%, -65%) rotate(270deg); text-align: center;">
                <p style="font-size: 22px; color: #ffffff; margin: 0; font-weight: bold;">${user.username}</p>
                <p style="font-size: 16px; color: #ffffff; margin: 0;">${user.college}</p>
                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0">${user._id}</p>
            </div>

        </div>
    </div>
</body>

</html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          }
          else if (user.paymentType === 3) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Pass</title>
</head>

<body style="width: 650px; margin: 30px 100px;">
    <div style="display: flex; justify-content: center; width: 100%; height: 100%; position: relative;">
        
        <!-- First Image -->
        <img src="https://drive.google.com/thumbnail?id=1N5c3IzrbVWICLv0dkvTn_-UQQlJTcRdG&sz=s800" alt="Logo"
            style="width: 500px; height: 250px;">

        <!-- Second Image Container -->
        <div style="position: relative; height: 250px; min-width: 100px; display: flex; justify-content: center; align-items: center;">
            
            <!-- Second Image -->
            <img src="https://drive.google.com/thumbnail?id=1W8DHLtYSTtITgmva3aQi3si9NcgBOqvX&sz=s800" alt="Logo"
                style="width: 100px; height: 250px;">

            <!-- Rotated Text (Overlay on Image) -->
            <div style="position: absolute; top: 53%; left: 50%; transform: translate(-65%, -65%) rotate(270deg); text-align: center;">
                <p style="font-size: 22px; color: #ffffff; margin: 0; font-weight: bold;">${user.username}</p>
                <p style="font-size: 16px; color: #ffffff; margin: 0;">${user.college}</p>
                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0">${user._id}</p>
            </div>

        </div>
    </div>
</body>

</html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          }

          else if (user.paymentType === 1) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entry Pass</title>
</head>

<body style="width: 650px; margin: 30px 100px;">
    <div style="display: flex; justify-content: center; width: 100%; height: 100%; position: relative;">
        
        <!-- First Image -->
        <img src="https://drive.google.com/thumbnail?id=1N5c3IzrbVWICLv0dkvTn_-UQQlJTcRdG&sz=s800" alt="Logo"
            style="width: 500px; height: 250px;">

        <!-- Second Image Container -->
        <div style="position: relative; height: 250px; min-width: 100px; display: flex; justify-content: center; align-items: center;">
            
            <!-- Second Image -->
            <img src="https://drive.google.com/thumbnail?id=1W8DHLtYSTtITgmva3aQi3si9NcgBOqvX&sz=s800" alt="Logo"
                style="width: 100px; height: 250px;">

            <!-- Rotated Text (Overlay on Image) -->
            <div style="position: absolute; top: 53%; left: 50%; transform: translate(-65%, -65%) rotate(270deg); text-align: center;">
                <p style="font-size: 22px; color: #ffffff; margin: 0; font-weight: bold;">${user.username}</p>
                <p style="font-size: 16px; color: #ffffff; margin: 0;">${user.college}</p>
                <p style="font-size: 12px; font-weight: 600; color: #ffffff; margin: 0">${user._id}</p>
            </div>

        </div>
    </div>
</body>

</html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          }
        }
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Something went wrong! Don't worry we are working on it",
        error: err.message,
      });
    });
};

module.exports = genTicket;
