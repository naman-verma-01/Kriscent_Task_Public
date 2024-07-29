
const dotenv = require('dotenv');
const express = require('express')
const baseController = require('./API')
const app = express()
const mongoose = require('mongoose')
dotenv.config()
const swaggerUi = require("swagger-ui-express");
let swaggerDocument = require("./swagger.json");


const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000

const { json } = require('body-parser')
var cors = require('cors');
app.use(json());
app.use(cors())

// base route
app.use("/", baseController);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
    // , {
    //     swaggerOptions: { persistAuthorization: true },
    // })
);
app.all("*", async (req, res) => {
    res.send("Route Not Found : " + req.originalUrl);
});


// starting the server function
const start = async () => {

    // mongoose connection
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGODB_URI);


    app.listen(PORT, async () => {
        console.log(`Server Connected To Port: ${PORT}`)

    });

};

start()
