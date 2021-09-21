const multer = require("multer");
const path = require("path");

// Multer filename and file destination
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage : fileStorage});

module.exports.upload = upload;