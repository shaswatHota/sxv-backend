const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields must be filled",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "Password not set for this account",
      });
    }

    const match = await bcrypt.compare(password, user.password);

if (!match) {
  return res.status(401).json({
    success: false,
    message: "Incorrect password ",
  });
}

if (bcrypt.getRounds(user.password) > 10) {
  user.password = await bcrypt.hash(password, 10);
  await user.save();
}


    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isVssutian: user.isVssutian,
        regdNo: user.regdNo,
        events: user.events,
        college: user.college,
        graduationYear: user.graduationYear,
        branch: user.branch,
        paymentStatus: user.paymentStatus,
        phone: user.phone,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Problem occurred internally",
    });
  }
};

module.exports = login;
