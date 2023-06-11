const admin = require("../firebaseAdmin");

const getPoint = async (req, res) => {
  const { uid } = req.params;
  const user = admin.database().ref(`users/${uid}`);
  try {
    const response = {
      error: false,
      message: "Success Generate Point",
      point: (await user.child("point").once("value")).val(),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const addPoint = async (req, res) => {
  const { uid } = req.params;
  const { point } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  user.update({
    point: (await user.child("point").once("value")).val() + parseInt(point),
});
  try {
    const response = {
      error: false,
      message: "Success Add Point",
      point: (await user.child("point").once("value")).val(),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPoint, addPoint };