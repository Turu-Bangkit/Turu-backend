const admin = require("../firebaseAdmin");

const getCatalog = async (req, res) => {
  const catalog = admin.database().ref("catalogs");
  try {
    const response = {
      error: false,
      message: "Success Get All Catalog",
      data: (await catalog.once("value")).val().filter((item) => item !== null),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const getDetailCatalog = async (req, res) => {
  const { idCatalog } = req.params;
  const catalog = admin.database().ref(`catalogs/${idCatalog}`);
  try {
    const response = {
      error: false,
      message: "Success Get Detail Catalog",
      data: (await catalog.once("value")).val(),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const exchangePoint = async (req, res) => {
  const { uid } = req.params;
  const { idCatalog } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  const userPoint = (await user.child("point").once("value")).val();
  const point = (await admin.database().ref(`catalogs/${idCatalog}/point`).once("value")).val();

  if (userPoint < point) {
    const response = {
      error: true,
      message: "Point is not enough",
    };
    res.json(response);
  } else {
    user.update({
      point: userPoint - point,
    });
    const response = {
      error: false,
      message: "Success Exchange Point",
    };
    res.json(response);
  }
};


module.exports = { getCatalog, getDetailCatalog, exchangePoint };
