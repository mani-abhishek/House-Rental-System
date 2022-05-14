const express = require("express");
const { getAllHouse, createHouse, updateHouse, deleteHouse, getHouse
 } = require("../controllers/houseController");

 const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();

router.route("/house").get(isAuthenticatedUser,getAllHouse);
router.route("/house/:id").get(getHouse);
router.route("/house/new").post( isAuthenticatedUser,createHouse);
router.route("/house/:id").put( isAuthenticatedUser,updateHouse);
router.route("/house/:id").delete( isAuthenticatedUser,deleteHouse);

module.exports = router;