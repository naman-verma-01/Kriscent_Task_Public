const googleStorage = require('@google-cloud/storage');
var serviceAccount = require("./firebasekey.json");

var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "//NAME_OF_YOUR_STORAGE_BUCKET_COMES_HERE"
});
const bucket = admin.storage().bucket();

module.exports = {bucket}

// bucket.upload("/Users/j.milanmethodius/Desktop/hapi screenshots/demoimage.jpeg")