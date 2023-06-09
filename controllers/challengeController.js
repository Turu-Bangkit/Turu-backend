const admin = require("../firebaseAdmin");
const moment = require("moment-timezone");

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

const chooseChallenge = async (req, res) => {
  const { uid } = req.params;
  const { idChallenge } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  const challenge = admin.database().ref(`challenges/${idChallenge}`);
  const maxLevel = (await challenge.child("days").once("value")).val();

  const userLocalTimeEpoch = moment().valueOf() / 1000;
  const today = moment().tz("Asia/Jakarta").startOf("day");
  const todayTime = today.clone().hour(21).minute(0).second(0);
  const todayLocalTimeEpoch = todayTime.valueOf() / 1000;

  if (userLocalTimeEpoch > todayLocalTimeEpoch) {
    const start_rules_time = todayLocalTimeEpoch + 86400;
    user.update({
      start_rules_time: start_rules_time,
      end_rules_time: start_rules_time + 28800,
    });
  } else {
    const start_rules_time = todayLocalTimeEpoch;
    user.update({
      start_rules_time: start_rules_time,
      end_rules_time: start_rules_time + 28800,
    });
  }

  user.update({ idChallenge: idChallenge, level: 1 });

  const response = {
    error: false,
    message: "Success Register Challenge",
  };
  res.json(response);
};

const getStatusChallenge = async (req, res) => {
  const { uid } = req.params;
  const user = admin.database().ref(`users/${uid}`);
  const idChallenge = (await user.child("idChallenge").once("value")).val();
  const challenge = admin.database().ref(`challenges/${idChallenge}`);

  try {
    const response = {
      error: false,
      message: "Success Get Status Challenge",
      data: {
        start_rules_time: (await user.child("start_rules_time").once("value")).val(),
        end_rules_time: (await user.child("end_rules_time").once("value")).val(),
        level_user: (await user.child("level").once("value")).val(),
        max_level: (await challenge.child("days").once("value")).val(),
      },
    };

    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const updateLevel = async (req, res) => {
  const { uid } = req.params;
  const { level } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  const idChallenge = (await user.child("idChallenge").once("value")).val();
  const challenge = admin.database().ref(`challenges/${idChallenge}`);
  const maxLevel = (await challenge.child("days").once("value")).val();

  if (level > maxLevel) {
    if (maxLevel == 7) {
      user.update({
        level: 1,
        point: (await user.child("point").once("value")).val() + 200,
      });
    } else if (maxLevel == 14) {
      user.update({
        level: 1,
        point: (await user.child("point").once("value")).val() + 500,
      });
    } else if (maxLevel == 30) {
      user.update({
        level: 1,
        point: (await user.child("point").once("value")).val() + 1200,
      });
    }
  } else {
    user.update({ level: level });
  }
  const response = {
    error: false,
    message: "Success Update Level",
  };

  res.json(response);
};

const getDetailChallenge = async (req, res) => {
  const { uid } = req.params;
  const challenge = admin.database().ref(`challenges/${uid}`);
  try {
    const response = {
      error: false,
      message: "Success Get Detail Challenge",
      data: (await challenge.once("value")).val(),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getChallenge,
  updateLevel,
  getStatusChallenge,
  getDetailChallenge,
  chooseChallenge,
};
