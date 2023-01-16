const AWS = require("aws-sdk");
const serverless = require("serverless-http");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const express = require("express");
const ssm = new AWS.SSM();
require("dotenv").config();
//establish connection to aws
AWS.config.update({
  region: "eu-west-2",
});

const app = express();
app.use(express.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/api/user", require("./routes/user"));
app.listen(process.env.port, () => {
  console.log(`Backend Listening at Port ${process.env.port}`);
});
module.exports = app;
