const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const url = require("url");

const router = express.Router();

var s3 = new aws.S3({
      accessKeyId:"",
      secretAccessKey:"",
      Bucket:""
})

// Single Upload
const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'onclick',
  acl: 'public-read',
  key: function (req, file, cb) {
   cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  }
 }),
 // Hier we define limitation of our file!
 limits:{ fileSize: 4000000 }, // In bytes: 4000000 bytes = 4 MB
 fileFilter: function( req, file, cb ){
  checkFileType( file, cb );
 }
}).single('profileImage');

/** Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
 // Allowed ext
 const filetypes = /jpeg|jpg|png|gif/;
 // Check ext
 const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
 // Check mime
 const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
  return cb( null, true );
 } else {
  cb( 'Error: Nur Bilder!' );
 }
}

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post( '/profile-img-upload', ( req, res ) => {profileImgUpload( req, res, ( error ) => {
      // console.log( 'requestOkokok', req.file );
      // console.log( 'error', error );
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile modelres.json
        ( {
         image: imageName,
         location: imageLocation
        } );
       }
      }
     });
    });

    // to export router function!
    module.exports = router;