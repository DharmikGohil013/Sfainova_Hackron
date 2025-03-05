
const router = require("express").Router();
const UserController = require("../controllers/user.controller");


router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.get('/user/:email', UserController.getUserDataByEmail);

module.exports = router;