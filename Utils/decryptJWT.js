const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = async (token) => {
    if (token == '')  // if the accesstoken is given empty
    {
        return false;
    }

    if (!token) { //if no otken present

        // throw new Error("Token is not Given");
        return false
    }
    const publicKey = process.env.JWT_KEY //will read the public key viewing the token


    try {

        const decrypt = jwt.verify(token, publicKey);  //decrypting the token using the keys




        if (!decrypt) {
            return false;
        }
        else {
            return decrypt; //return the payload
        }

    }
    catch (err) {
        // console.log(err);
        return false;
    }


}