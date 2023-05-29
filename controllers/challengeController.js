const admin = require("../firebaseAdmin");

const getChallenge = async (req, res) => {
  const chall = admin.database().ref("challenges");
  chall.once("value", (snapshot) => {
    const challengeData = snapshot.val();
  
    const response = {
      error: false,
      message: "Success Get Challenge List",
      data: challengeData.filter((challenge) => challenge !== null),
    };
  
    res.json(response);
  });
};

module.exports = { getChallenge };
