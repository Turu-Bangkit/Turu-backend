require('dotenv').config();
const CryptoJS = require("crypto-js");
const axios = require("axios");
const admin = require("../firebaseAdmin");
const apiKey = process.env.API_KEY;
const username = process.env.usernameapi;


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
  if (!(await catalog.once("value")).exists()) {
    res.json({ error: true, message: "Catalog Not Found" });
    return;
  }

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

// const exchangePoint = async (req, res) => {
//   const { uid } = req.params;
//   const { idCatalog } = req.body;
//   const user = admin.database().ref(`users/${uid}`);
//   const userPoint = (await user.child("point").once("value")).val();
//   const point = (await admin.database().ref(`catalogs/${idCatalog}/point`).once("value")).val();
//   const price = (await admin.database().ref(`catalogs/${idCatalog}/price`).once("value")).val();
//   const product_code = `pulsa${price}`;
  
//   if (!(await user.once("value")).exists()) {
//     res.json({ error: true, message: "User Not Found" });
//     return;
//   }
//   if (!(await admin.database().ref(`catalogs/${idCatalog}`).once("value")).exists()) {
//     res.json({ error: true, message: "Catalog Not Found" });
//     return;
//   }

//   if (userPoint < point) {
//     const response = {
//       error: true,
//       message: "Point is not enough",
//     };
//     res.json(response);
//   } else {
//     user.update({
//       point: userPoint - point,
//     });
//     const response = {
//       error: false,
//       message: "Success Exchange Point",
//     };
//     res.json(response);
//   }
// };

const exchangePoint = async (req, res) => {
  const { uid } = req.params;
  const { idCatalog } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  const userPoint = (await user.child("point").once("value")).val();
  const point = (await admin.database().ref(`catalogs/${idCatalog}/point`).once("value")).val();
  const price = (await admin.database().ref(`catalogs/${idCatalog}/price`).once("value")).val();
  const product_code = `pulsa${price}`;

  if (!(await user.once("value")).exists()) {
    res.json({ error: true, message: "User Not Found" });
    return;
  }
  if (!(await admin.database().ref(`catalogs/${idCatalog}`).once("value")).exists()) {
    res.json({ error: true, message: "Catalog Not Found" });
    return;
  }

  if (userPoint < point) {
    const response = {
      error: true,
      message: "Point is not enough",
    };
    res.json(response);
  } else {
    // Generate the ref_id value
    const now = new Date();
    const ref_id = now.toISOString().replace(/[^0-9]/g, "");

    // Generate the sign value with additional randomness
    const sign = CryptoJS.MD5(username+apiKey+ref_id).toString();
    // Define the request payload
    const payload = {
      customer_id: '081354544844',
      product_code: product_code,
      ref_id: ref_id,
      username: username,
      sign: sign
    };

    // Make the API call
    axios.post("https://prepaid.iak.id/api/top-up", payload)
    .then(apiResponse => {
      console.log(product_code)
      console.log(apiKey)
      console.log(username)
      console.log(apiResponse.data);

      user.update({
        point: userPoint - point,
      });
      const successResponse = {
        error: false,
        message: "Success Exchange Point",
      };
      res.json(successResponse);
    })
    .catch(error => {
      console.error(error);
      // Handle the error here
      const errorResponse = {
        error: true,
        message: "Failed to Exchange Point",
      };
      res.json(errorResponse);
    });
}
};


module.exports = exchangePoint;


module.exports = { getCatalog, getDetailCatalog, exchangePoint };
