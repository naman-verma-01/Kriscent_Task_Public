const decryptJWT = require('./decryptJWT');

const userAuth = async (
    authHeader,
    allowedTypes,
    req,
    res,
    next
) => {
    try {
        if (!authHeader) {
            res.send('Unauthorized Access!')
        }

        // extracting type of auth header and token
        const type = authHeader.split(" ")[0];
        const token = authHeader.split(" ")[1];

        // type of author header should be bearer
        if (type !== "Bearer" || token === "" || !token) {
            res.send('Unauthorized Access!')
        }

        const userInfo = await decryptJWT(token);
        let accessStatus = false

        for (let allowedType of allowedTypes) {
            if (allowedType == userInfo.userType) {
                req.user = userInfo;
                accessStatus = true
                next();
            }
        }

        if(!accessStatus){
            res.send('Unauthorized Access!')
        }
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error.message,
        });
    }
};

const ReadAccess = (req, res, next) => {
    userAuth(req.headers.authorization, ["ADMIN", 'AUTHOR', 'READER'], req, res, next);
};

const WriteAccess = (req, res, next) => {
    userAuth(req.headers.authorization, ["ADMIN", "AUTHOR"], req, res, next);
};

const EditAccess = (req, res, next) => {
    userAuth(req.headers.authorization, ["ADMIN", "AUTHOR"], req, res, next);
};

const DeleteAccess = (req, res, next) => {
    userAuth(req.headers.authorization, ["ADMIN"], req, res, next);
};

module.exports = { ReadAccess, WriteAccess, EditAccess, DeleteAccess }