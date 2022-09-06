const express = require("express");
const dbJson = require("../dbJson");
const router = express.Router(dbJson);
const low = require("lowdb");
const _ = require("lodash");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(dbJson);
const db = low(adapter);
const authenticationRouter = require("../middlewares/authenticationRouter");
router.use(function (req, res, next) {
  next();
});

/**
 * @method post
 * @path /getBoardList
 * @description File
 * */
router.post("/uploadFile", function (req, res) {
  // Uploaded path
  const uploadedFile = req.files.uploadFile;

  // Logging uploading file
  console.log(uploadedFile);
  // Upload path
  const uploadPath = process.cwd() + "/uploads/" + uploadedFile.name;
  // To save the file using mv() function
  uploadedFile.mv(uploadPath, function (err) {
    if (err) {
      console.log(err);
      res.send("Failed !!");
    } else res.send("serverpath + " + "/" + uploadedFile.name);
  });
});

module.exports = router;
