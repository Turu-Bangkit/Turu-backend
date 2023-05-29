const authController = require("../controllers/authController");
const challengeController = require("../controllers/challengeController");
const verifyToken = require("../middleware/verifyToken");
const verifyLogin = require("../middleware/verifyLogin");

const router = require("express").Router();

router.post("/logout", verifyToken.verifyToken, authController.logout);
router.post("/login", verifyLogin.verifyLogin);
router.get("/getChallenge", verifyToken.verifyToken, challengeController.getChallenge);

module.exports = router;
