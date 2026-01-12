const router = require('express').Router()

const getRegisteredEvents = require('../../controllers/users/getRegisteredEvents');
const getUser = require("../../controllers/users/getUsers");
const tokenVerify = require("../../middleware/tokenVerify")

router.get("/getUser", tokenVerify, getUser);
router.get('/check/:userId', getRegisteredEvents );
module.exports = router