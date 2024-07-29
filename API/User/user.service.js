const dotenv = require('dotenv');
const User = require('../../Model/User');
const generateJWT = require('../../Utils/generateJWT');
dotenv.config()


const signup = async (email, name, password, userType) => {
    let response = {}
    try {

        let user = new User({ email, name, password, userType })

        user = await user.save()

        if (user) {
            const accesstoken = generateJWT({ email, name, _id: user._id, userType })
            response.status = 200,
                response.data = { msg: "Successfull", data: user, accesstoken }
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

const login = async (email, password) => {
    let response = {}
    try {

        let user = await User.find({ email, password })
        console.log(user)
        if (user.length) {
            const accesstoken = generateJWT({ email: user[0].email, name: user[0].name, _id: user[0]._id, userType: user[0].userType })

            response.status = 200,
                response.data = { msg: "Successfull", data: user, accesstoken }
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


module.exports = { signup, login }