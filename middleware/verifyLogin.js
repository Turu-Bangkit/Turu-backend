const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "394448484975-4cdujuf14e7v8lp33c0esq71ds01q2je.apps.googleusercontent.com"
);
const jwt = require("jsonwebtoken");
const secretKey =
  "-----BEGIN RSA PRIVATE KEY-----MIIBOgIBAAJBAIXLEGFEK6OgmKmFQ0utJ3ohwr5fJ/GCiXLXO8+JxbHD8D5gAP9ENMpDfFs98A23ojlNi/xTzNNqoXJ91GNo4LsCAwEAAQJAXptWu9C+ove+u7B2A58vWRdiY8dZsVdC5if4LSsY1jfN+4zPEo95pwM1fNm+AXtBHw4rhs6sAEUkUkWJ7l6TwQIhAPIoWiNWrk1nnAlL5rnlrjuBB55k5bvoK6Kpbk065PQLAiEAjXDyLKKd0DE69qfjglPekE3LKtOqBU1N7eVSral9hBECIQCur/deWNCCnESO3EdEQXEwEcOaOvUTWcfonssoQV0awwIgJDXIKhkvob8Yw1DT8+eY0QS5gKtTmaviyYauFfuQQKECIAW0q34Fup+zsrKh6vWgc8mTmdSvm/sD3+88Ojx2lNE6-----END RSA PRIVATE KEY-----";
const admin = require("../firebaseAdmin");

const convertFirebaseTokenToJWT = async (tokenFirebase) => {
  const { sub: uid, email, name, picture } = tokenFirebase.payload;

  try {
    const jwtToken = jwt.sign({ uid, email, name, picture }, secretKey, {
      algorithm: "HS256",
    });
    return jwtToken;
  } catch (error) {
    console.log("Failed to convert Firebase token to JWT:", error);
    throw error;
  }
};

const verifyLogin = async (req, res, next) => {
  const { token } = req.body;
  try {
    const tokenFirebase = await client.verifyIdToken({
      idToken: token,
      audience:
        "394448484975-4cdujuf14e7v8lp33c0esq71ds01q2je.apps.googleusercontent.com",
    });
    const payload = tokenFirebase.getPayload();
    const jwtToken = await convertFirebaseTokenToJWT(tokenFirebase);

    uid = payload.sub;
    email = payload.email;
    username = payload.given_name;
    picture = payload.picture;

    const users = admin.database().ref("users");
    const check = await users.child(uid).once("value");
    if (check.exists()) {
      return res.json({ message: "User already exists!" });
    } else {
      const user = users.child(uid);
      user
        .set({
          email: email,
          username: username,
          picture: picture,
          point: 0,
        })
        .then(() => {
          console.log("User added successfully");
          res.json({
            error: false,
            message: "Login Success !",
            uid: uid,
            email: email,
            username: username,
            picture: picture,
            jwtToken: jwtToken,
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "You are not authorized!" });
  }
};

module.exports = { verifyLogin };
