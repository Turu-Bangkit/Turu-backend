const admin = require("../firebaseAdmin");
const crypto = require("crypto");

const logout = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  const token = authorizationHeader.split(" ")[1];

  try {
    res.status(200).json({ message: "Logout Success !", token: token });
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await admin.database().ref("blacklistedTokens").child(hashedToken).set(true);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { logout };
