const express = require("express");
const BookController = require('./Book/book.controller')
const UserController = require('./User/user.controller')

const router = express.Router();

router.use('/book', BookController)
router.use('/user', UserController)

module.exports = router;
