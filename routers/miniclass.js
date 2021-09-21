const router = require("express").Router();
const { Miniclass } = require("../models");
const miniclassController = require("../controllers/miniclassController");
const verifier = require("./verifyToken");
const passport = require("passport");
const { upload } = require("../controllers/fileUpload");
const path = require("path");

// Register a new class
router.post("/miniclass-upload-status", upload.single("photo"), miniclassController.addMiniclass);

router.get("/miniclass-upload", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "addMiniclass.html"))
});

// Upload the miniclass poster and storing its file name in database
// router.patch("/poster-upload/:classId", authKey, passport.authenticate("jwt", { session: false }), verifier("superadmin"), upload.single("photo"), miniclassController.uploadPhoto);

// Update data on a class
// router.patch("/update-miniclass/:classId", passport.authenticate("jwt", { session: false }), verifier("superadmin"), miniclassController.updateClassData);
router.patch("/update-miniclass/:classId", miniclassController.updateClassData);

// Get ALl miniclasses and specific miniclass by UUID
// router.get("/miniclasses", passport.authenticate('jwt', { session: false }), verifier("superadmin"), miniclassController.getMiniclasses);
// router.get("/miniclass/:classId", passport.authenticate('jwt', { session: false }), verifier("superadmin"), miniclassController.getMiniclasses);

router.get("/miniclasses", miniclassController.getMiniclasses);
router.get("/miniclass/:classId", miniclassController.getMiniclasses);

// Delete ALL miniclasses and specific miniclass identified by UUID
// router.delete("/delete-miniclasses", passport.authenticate("jwt", { session: false }), verifier("superadmin"), miniclassController.deleteMiniclasses);
// router.delete("/delete-miniclass/:classId", passport.authenticate("jwt", { session: false }), verifier("superadmin"), miniclassController.deleteMiniclass);

router.delete("/delete-miniclasses", miniclassController.deleteMiniclasses);
router.delete("/delete-miniclass/:classId", miniclassController.deleteMiniclass);

module.exports = router;