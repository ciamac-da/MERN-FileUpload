const express = require("express");
const multer = require("multer");
const path = require("path");
const url = require("url");

const router = express.Router();



// Single Upload
const profileImgUpload = multer({
      dest:"public/images/"
}).single('profileImage');

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
        res.json(
      {status:'ok'}
        )
       }
      }
     });
    });

    // to export router function!
    module.exports = router;