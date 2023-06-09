const jwt = require("jsonwebtoken");
const secretKey = "-----BEGIN RSA PRIVATE KEY-----MIIBOgIBAAJBAIXLEGFEK6OgmKmFQ0utJ3ohwr5fJ/GCiXLXO8+JxbHD8D5gAP9ENMpDfFs98A23ojlNi/xTzNNqoXJ91GNo4LsCAwEAAQJAXptWu9C+ove+u7B2A58vWRdiY8dZsVdC5if4LSsY1jfN+4zPEo95pwM1fNm+AXtBHw4rhs6sAEUkUkWJ7l6TwQIhAPIoWiNWrk1nnAlL5rnlrjuBB55k5bvoK6Kpbk065PQLAiEAjXDyLKKd0DE69qfjglPekE3LKtOqBU1N7eVSral9hBECIQCur/deWNCCnESO3EdEQXEwEcOaOvUTWcfonssoQV0awwIgJDXIKhkvob8Yw1DT8+eY0QS5gKtTmaviyYauFfuQQKECIAW0q34Fup+zsrKh6vWgc8mTmdSvm/sD3+88Ojx2lNE6-----END RSA PRIVATE KEY-----"
const admin = require("../firebaseAdmin");
const crypto = require("crypto");

const verifyToken = async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Missing authorization header!" });
  }
  const token = authorizationHeader.split(" ")[1];
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const check = await admin.database().ref("blacklistedTokens").child(hashedToken).once("value");

    if (check.exists()) {
      throw new Error("Token is blacklisted");
    }
    const jwtToken = jwt.verify(token, secretKey, { algorithms: ["HS256"] });
    req.uid = jwtToken.uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You are not authorized !" });
  }
};


module.exports = { verifyToken };
