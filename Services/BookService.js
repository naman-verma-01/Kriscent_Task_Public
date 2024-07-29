const dotenv = require('dotenv');
const Media = require('../Model/Media');
dotenv.config()


const addMedia = async (title, url, type, userId) => {
    let response = {}
    try {

        let media = new Media({ title, url, type, userId })

        media = await media.save()

        if (media) {
            response.status = 200,
                response.data = { msg: "Successfull", data: media }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}

const getAllMedia = async (userId) => {
    let response = {}
    try {

        let media = await Media.find({ userId })

        if (media) {
            response.status = 200,
                response.data = { msg: "Successfull", data: media }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}

const deleteFile = async (_id) => {
    let response = {}
    try {

        let media = await Media.deleteOne({ _id })

        if (media) {
            response.status = 200,
                response.data = { msg: "Successfull", data: media }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
                response.data = { msg: "failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
            response.data = { msg: error }
        return response

    }
}


module.exports = { addMedia, getAllMedia, deleteFile }