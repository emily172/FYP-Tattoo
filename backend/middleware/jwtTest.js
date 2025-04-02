require("dotenv").config();
const jwt = require("jsonwebtoken");

const artistData = { id: "67ed01b547ee327b53d05ad9" };

try {
    const token = jwt.sign(
        artistData,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log("🟢 TEST JWT Generated Token:", token);
} catch (error) {
    console.error("🔴 JWT Error:", error);
}
