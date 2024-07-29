const dotenv = require('dotenv');
const Books = require('../../Model/Books');
const { bucket } = require('../../Utils/uploadFirebase');
const { format } = require('util');

const fs = require('fs');

dotenv.config()


const addBook = async (title, author, coverPage, year, authorId) => {
    let response = {}
    try {

        let book = new Books({ title, author, coverPage, year, authorId })
        book = await book.save()

        if (book) {
            response.status = 200
            response.data = { msg: "Successfull", data: book }
            return response
        }
        else {
            response.status = 400
            response.data = { msg: "failed" }
            return response
        }
    } catch (error) {
        response.status = 500
        response.data = { msg: error }
        return response

    }
}

const getBooks = async () => {
    let response = {}
    try {

        let books = await Books.find({})
        if (books.length) {
            response.status = 200
            response.data = { msg: "Successfull", data: books }
            return response
        }
        else {
            response.status = 400
            response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500
        response.data = { msg: error }
        return response

    }
}

const getBookById = async (id) => {
    let response = {}
    try {

        let books = await Books.find({ _id: id })
        if (books.length) {
            response.status = 200
            response.data = { msg: "Successfull", data: books }
            return response
        }
        else {
            response.status = 400
            response.data = { msg: "failed" }
            return response
        }
    } catch (error) {
        response.status = 500
        response.data = { msg: error }
        return response

    }
}


const editBook = async (id, updateData) => {
    let response = {}
    try {

        let data = await Books.findByIdAndUpdate(id, updateData)

        if (data) {
            response.status = 200
            response.data = { msg: "Successfull", data: data }
            return response
        }
        else {
            response.status = 400
            response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        response.status = 500
        response.data = { msg: error }
        return response

    }
}

const deleteBook = async (id) => {
    let response = {}
    try {

        let data = await Books.findByIdAndDelete(id)

        if (data) {
            response.status = 200
            response.data = { msg: "Successfull", data: data }
            return response
        }
        else {
            response.status = 400
            response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500
        response.data = { msg: error }
        return response

    }
}


const uploadFileToFirebase = async (filePath, fileName, mimeType) => {
    try {
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: mimeType
            }
        });

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(blobStream)
                .on('error', (err) => {
                    reject(err);
                })
                .on('finish', async () => {
                    await blob.makePublic();
                    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
                    resolve(publicUrl);
                });
        });
    } catch (error) {
        console.log(error);
        return null
    }

};


module.exports = { addBook, getBooks, getBookById, editBook, deleteBook, uploadFileToFirebase }