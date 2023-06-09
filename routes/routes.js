const authController = require("../controllers/authController");
const challengeController = require("../controllers/challengeController");
const catalogController = require("../controllers/catalogController");
const verifyToken = require("../middleware/verifyToken");
const verifyLogin = require("../middleware/verifyLogin");

const router = require("express").Router();

router.post("/logout", verifyToken.verifyToken, authController.logout);
router.post("/login", verifyLogin.verifyLogin);

router.get("/challenge", verifyToken.verifyToken, challengeController.getChallenge);
router.get("/challenge/:uid", verifyToken.verifyToken, challengeController.getDetailChallenge);
router.post("/updateLevel/:uid", verifyToken.verifyToken, challengeController.updateLevel);
router.post("/statusChallenge/:uid", verifyToken.verifyToken, challengeController.getStatusChallenge);
router.post("/chooseChallenge/:uid", verifyToken.verifyToken, challengeController.chooseChallenge);

router.get("/catalog", verifyToken.verifyToken, catalogController.getCatalog);

module.exports = router;
