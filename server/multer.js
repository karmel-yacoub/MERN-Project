const multer = require('multer'); 

const MIME_TYPE_MAP = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
  };
  
  // Multer configrations for saving images on the server
  const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  const isValid = MIME_TYPE_MAP[file.mimetype];
	  let error = new Error("Invalid mime type");
	  if (isValid) {
		error = null;
	  }
	  cb(error, "uploads");
	},
	filename: (req, file, cb) => {
	  const name = file.originalname.toLowerCase().split(" ").join("-");
	  const extension = MIME_TYPE_MAP[file.mimetype];
	  cb(null, name + "-" + Date.now() + "." + extension);
	},
  });

  var upload = multer({storage});
  module.exports = upload;