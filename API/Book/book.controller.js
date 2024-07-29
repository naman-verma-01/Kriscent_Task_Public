const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const formidable = require('formidable');
const { query, validationResult, body, check } = require('express-validator');
const { bucket } = require('../../Utils/uploadFirebase')
const { addBook, getBooks, getBookById, editBook, deleteBook, uploadFileToFirebase } = require('./book.service');
const { DeleteAccess, ReadAccess, WriteAccess, EditAccess } = require("../../Utils/authMiddleWare");
const { format } = require('util');
const fs = require('fs');
dotenv.config()


// router.post(
//     '/addBook',
//     ReadAccess,
//     // [
//     //     body('title').notEmpty().withMessage('Title is required'),
//     //     body('author').notEmpty().withMessage('Author is required')
//     // ],
//     async (req, res) => {
//         try {

//             // const errors = validationResult(req);
//             // console.log(errors.isEmpty());


//             const form = new formidable.IncomingForm();
//             let fileUrl = ''
//             form.parse(req, async (err, fields, files) => {

//                 const file = files.file[0];
//                 try {

//                     await check('title', 'Title is required').notEmpty().run(req);
//                     await check('author', 'Author is required').notEmpty().run(req);

//                     const errors = validationResult(req);
//                     if (!errors.isEmpty()) {
//                         return res.status(400).json({ errors: errors.array() });
//                     }

//                     const fileName = `files/${new Date().getTime()}`;
//                     console.log(fields);
//                     // fileUrl = await uploadFileToFirebase(file.filepath, fileName, file.mimetype);
//                     fileUrl = ''
//                     console.log(fileUrl, fields);


//                     let title = fields.title?.[0]
//                     let author = fields.author?.[0]
//                     let year = fields.year?.[0]
//                     let authorId = fields.authorId?.[0]

//                     const response = await addBook(title, author, fileUrl, year, authorId)
//                     res.status(response.status).json(response.data)

//                 } catch (err) {
//                     res.status(500).json({ err })
//                 }
//             });



//         } catch (error) {
//             console.log(error)
//         }

//     })

router.post(
    '/addBook',
    WriteAccess,
    // Middleware to parse form-data
    async (req, res, next) => {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error parsing form data' });
            }

            req.body = fields;
            req.files = files;

            next();
        });
    },
    // Validation middleware
    [
        check('title').notEmpty().withMessage('Title is required'),
        check('author').notEmpty().withMessage('Author is required')
    ],
    async (req, res) => {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { files, body: fields } = req;
        let fileUrl = '';

        try {
            const file = files.file[0];
            const fileName = `files/${new Date().getTime()}`;
            fileUrl = await uploadFileToFirebase(file.filepath, fileName, file.mimetype);
            // fileUrl = ''
            let title = fields.title?.[0];
            let author = fields.author?.[0];
            let year = fields.year?.[0];
            let authorId = fields.authorId?.[0];

            const response = await addBook(title, author, fileUrl, year, authorId);
            res.status(response.status).json(response.data);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
);

router.get('/getBooks', ReadAccess, async (req, res) => {
    try {
        console.log('here');
        const response = await getBooks()
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


router.get('/getBookById', ReadAccess, async (req, res) => {
    try {

        let { id } = req.query

        const response = await getBookById(id)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


router.patch('/editBook', EditAccess, async (req, res) => {
    try {

        let { id } = req.body

        const response = await editBook(id, req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


router.delete('/deleteBook', DeleteAccess, async (req, res) => {
    try {

        let { id } = req.query

        const response = await deleteBook(id)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
