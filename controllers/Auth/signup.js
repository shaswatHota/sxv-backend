const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    

    const {
      name,           // from frontend
      email,
      password,
      phone,
      regdNo,
      gradYear,
      branch,
    } = req.body;


    if (!name || !email || !password || !phone || !regdNo || !gradYear || !branch) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate registration number format
    if (!/^\d{10}$/.test(regdNo)) {
      return res.status(400).json({
        success: false,
        message: "Registration number must be exactly 10 digits",
      });
    }

    //  Prevent duplicate users by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    //  Prevent duplicate registration numbers
    const existingRegdNo = await User.findOne({ regdNo });
    if (existingRegdNo) {
      return res.status(409).json({
        success: false,
        message: "Registration number already exists",
      });
    }

    //  Hash password
    const hash = await bcrypt.hash(password, 10);

    // Default all users as VSSUT students
    const isVssutian = true;
    const college = "VSSUT";

    const user = await User.create({
      username: name,
      email,
      password: hash,
      phone,
      regdNo,
      branch,
      graduationYear: gradYear,
      isVssutian,
      college,
      events: [],
      paymentStatus: isVssutian,
      paymentType: 0,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isVssutian: user.isVssutian,
        regdNo: user.regdNo,
        college: user.college,
        graduationYear: user.graduationYear,
        branch: user.branch,
        phone: user.phone,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      message: "Registration successful",
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = signUp;
