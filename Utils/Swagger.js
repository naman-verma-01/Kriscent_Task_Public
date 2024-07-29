const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "Library Apis", // by default: 'REST API'
    description: "", // by default: ''
  },
  host: "https://kriscent-task-private.vercel.app/", // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["https", "http"], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  servers: [
    {
      url: "https://kriscent-task-private.vercel.app/",
      description: "test server",
    },
    {
      url: "http://localhost:3000/",
      description: "local server",
    },
    {
      url: "https://kriscent-task-private.vercel.app/",
      description: "local server2",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      in: "header", // can be "header", "query" or "cookie"
      name: "Authorization", // name of the header, query parameter or cookie
      description: "Please enter a valid token to test the requests below...",
    },
  }, // by default: empty object
  security: [
    {
      bearerAuth: [],
    },
  ],
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = "../swagger.json";
const endpointsFiles = ["../index.js"];

/* NOTE: if you use the express Router, you must pass in the 
     'endpointsFiles' only the root file where the route starts,
     such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
