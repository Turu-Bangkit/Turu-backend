const admin = require("../firebaseAdmin");

const getCatalog = async (req, res) => {
  const catalog = admin.database().ref("catalogs");
  catalog.once("value", (snapshot) => {
    const catalogData = snapshot.val();

    const response = {
      error: false,
      message: "Success Get Catalog List",
      data: Object.values(catalogData),
    };

    res.json(response);
  });
};

module.exports = { getCatalog };
