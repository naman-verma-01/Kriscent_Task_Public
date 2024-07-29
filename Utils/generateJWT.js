const jwt = require('jsonwebtoken');
const fs = require('fs');
module.exports = (user) => {
    if (!user) {
        throw new Error("User is not provided for producing the JWT token");
    }

    const privateKey = process.env.JWT_KEY




    const token = jwt.sign(user, privateKey)


    return token;


}