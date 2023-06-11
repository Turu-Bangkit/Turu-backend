const admin = require("../firebaseAdmin");

const startsleep = async (req, res) => {
    const { uid } = req.params;
    const user = admin.database().ref(`users/${uid}`);
    const issleeping = (await user.child("issleeping").once("value")).val();
    if (issleeping == 0) {
        user.update({
            issleeping: (await user.child("issleeping").once("value")).val() + 1,
        });
    const response = {
    error: false,
    message: "Happy Sleeping",
    };
    res.json(response);
    } else {
        const response = {
            error: false,
            message: "You are already sleeping",
        };
        
        res.json(response);
    }
};
const getIsSleeping = async (req, res) => {
    const { uid } = req.params;
    const userRef = admin.database().ref(`users/${uid}`);
    const issleeping = (await userRef.child("issleeping").once("value")).val();
    const email = (await userRef.child("email").once("value")).val();
    const response = {
    error: false,
    issleeping: issleeping,
    };

    res.json(response);
};

const stopsleep = async (req, res) => {
    const { uid } = req.params;
    const { success } = req.params;
    const user = admin.database().ref(`users/${uid}`);
    const issleeping = (await user.child("issleeping").once("value")).val();
    if (issleeping == 1) {
        if (success == 1) {
            user.update({
                issleeping: (await user.child("issleeping").once("value")).val() - 1,
                point : (await user.child("point").once("value")).val() + 10,
                streak : (await user.child("streak").once("value")).val() + 1,
                day_succed : (await user.child("day_succed").once("value")).val() + 1,
            });
        } else {
            user.update({
                issleeping: (await user.child("issleeping").once("value")).val() - 1,
                day_fail : (await user.child("day_fail").once("value")).val() + 1,
                streak : 0,
            });
        }
    const response = {
        error: false,
        message: "Success Update Sleeping",
        };
        res.json(response);
    }
        else {
            const response = {
                error: false,
                message: "You are not sleeping",
                };
        
    res.json(response);
            }
};

module.exports = {
    getIsSleeping,
    startsleep,
    stopsleep,
  };