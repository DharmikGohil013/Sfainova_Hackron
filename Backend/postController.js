const fileFilter = (req, file, cb) => {
    console.log('Uploaded file MIME type:', file.mimetype);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  };