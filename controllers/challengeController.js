const admin = require("../firebaseAdmin");
const moment = require("moment-timezone");

const getChallenge = async (req, res) => {
  const challenge = admin.database().ref("challenges");
  try {
    const response = {
      error: false,
      message: "Success Get All Challenge",
      data: (await challenge.once("value")).val().filter((challenge) => challenge !== null),
    };
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

const chooseChallenge = async (req, res) => {
  const { uid } = req.params;
  const { idChallenge } = req.body;
  const user = admin.database().ref(`users/${uid}`);
  const startTime = (await admin.database().ref(`challenges/${idChallenge}/start_time`).once("value")).val();
  const startTimeArray = startTime.split(":");
  const startHour = parseInt(startTimeArray[0]);
  const startMinute = parseInt(startTimeArray[1]);

  const endTime = (await admin.database().ref(`challenges/${idChallenge}/end_time`).once("value")).val();
  const endTimeArray = endTime.split(":");
  const endHour = parseInt(endTimeArray[0]);
  const endMinute = parseInt(endTimeArray[1]);

  if (!(await user.once("value")).exists()) {
    res.json({ error: true, message: "User Not Found" });
    return;
  }
  if (!(await admin.database().ref(`challenges/${idChallenge}`).once("value")).exists()) {
    res.json({ error: true, message: "Challenge Not Found" });
    return;
  }

  if ((await user.child("idChallenge").once("value")).val() == 0) {
    const userLocalTimeEpoch = moment().valueOf() / 1000;
    const time = moment().tz("Asia/Jakarta").startOf("day");
    let startTimeEpoch = time.clone().hour(startHour).minute(startMinute).second(0).valueOf() / 1000;
    let endTimeEpoch = time.clone().hour(endHour).minute(endMinute).second(0).valueOf() / 1000;
    if(endTimeEpoch < startTimeEpoch) {
      endTimeEpoch += 86400;
    }
    let diff = endTimeEpoch - startTimeEpoch;
    if (userLocalTimeEpoch > startTimeEpoch) {
      const start_rules_time = startTimeEpoch + 86400;
      user.update({
        start_rules_time: start_rules_time,
        end_rules_time: start_rules_time + diff,
      });
    } else {
      const start_rules_time = startTimeEpoch;
      user.update({
        start_rules_time: start_rules_time,
        end_rules_time: start_rules_time + diff,
      });
    }

    user.update({ idChallenge: idChallenge, level: 1 });

    const response = {
      error: false,
      message: "Success Register Challenge",
    };
    res.json(response);
  } else {
    res.json({ error: true, message: "User Already Register Challenge" });
  }
};

const getStatusChallenge = async (req, res) => {
  const { uid } = req.params;
  const user = admin.database().ref(`users/${uid}`);
  const idChallenge = (await user.child("idChallenge").once("value")).val();
  const challenge = admin.database().ref(`challenges/${idChallenge}`);
  if (!(await user.once("value")).exists()) {
    res.json({ error: true, message: "User Not Found" });
    return;
  }
  
  try {
    if(idChallenge != 0) {
      const response = {
        error: false,
        message: "Success Get Status Challenge",
        data: {
          start_rules_time: (await user.child("start_rules_time").once("value")).val(),
          end_rules_time: (await user.child("end_rules_time").once("value")).val(),
          level_user: (await user.child("level").once("value")).val(),
          max_level: (await challenge.child("days").once("value")).val(),
          idChallenge: idChallenge,
        },
      };
      res.json(response);
    } else {
      const response = {
        error: false,
        message: "User Not Yet Register Challenge",
      };
      res.json(response);
    }  
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
  if (!(await user.once("value")).exists()) {
    res.json({ error: true, message: "User Not Found" });
    return;
  }
  if (!(await challenge.once("value")).exists()) {
    res.json({ error: true, message: "Please Choose Challenge First !" });
    return;
  }

  if (level > maxLevel) {
    user.update({
      level: 1,
      idChallenge: 0,
      point: (await user.child("point").once("value")).val() + (await challenge.child("point").once("value")).val(),
    });
    res.json({ error: false, message: "Success Finished Challenge !" })
    return;
  } else if(level == 0){
    user.update({ level: 1, idChallenge: 0, start_rules_time: 0, end_rules_time: 0 });
    res.json({ error: false, message: "Challenge Failed !" })
    return;
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
  const { idChallenge } = req.params;
  const challenge = admin.database().ref(`challenges/${idChallenge}`);
  if(!(await challenge.once("value")).exists()) {
    res.json({ error: true, message: "Challenge Not Found" });
    return;
  }

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
