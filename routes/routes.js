const authController = require("../controllers/authController");
const challengeController = require("../controllers/challengeController");
const catalogController = require("../controllers/catalogController");
const verifyToken = require("../middleware/verifyToken");
const verifyLogin = require("../middleware/verifyLogin");
const sleepController = require("../controllers/sleepController");
const pointController = require("../controllers/pointController");

const router = require("express").Router();

router.post("/logout", verifyToken.verifyToken, authController.logout);
router.post("/login", verifyLogin.verifyLogin);

router.get("/challenge", verifyToken.verifyToken, challengeController.getChallenge);
router.get("/challenge/:idChallenge", verifyToken.verifyToken, challengeController.getDetailChallenge);
router.get("/statusChallenge/:uid", verifyToken.verifyToken, challengeController.getStatusChallenge);
router.post("/updateLevel/:uid", verifyToken.verifyToken, challengeController.updateLevel);
router.post("/chooseChallenge/:uid", verifyToken.verifyToken, challengeController.chooseChallenge);

router.get("/catalog", verifyToken.verifyToken, catalogController.getCatalog);
router.get("/catalog/:idCatalog", verifyToken.verifyToken, catalogController.getDetailCatalog);
router.post("/exchangePoint/:uid", verifyToken.verifyToken, catalogController.exchangePoint);

router.post("/startsleep/:uid", verifyToken.verifyToken, sleepController.startsleep);
router.get("/issleeping/:uid", verifyToken.verifyToken, sleepController.getIsSleeping);
router.post("/stopsleep/:uid/:success", verifyToken.verifyToken, sleepController.stopsleep);

router.get("/point/:uid", verifyToken.verifyToken, pointController.getPoint);
router.post("/point/:uid", verifyToken.verifyToken, pointController.addPoint);

module.exports = router;
