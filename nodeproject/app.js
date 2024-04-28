const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./v1/user/user.router");
const employeeRouter = require("./v1/employee/employee.router");
const productRouter = require("./v1/product/product.router");
const orderRouter = require("./v1/order/order.router");
const httpServer = require('http').createServer(app);
const mongodb = require('./db');
const bodyParser = require("body-parser");


app.use(bodyParser.json({ limit: '500000mb' }));
app.use(bodyParser.urlencoded({ limit: '500000mb', extended: true }));

app.use("/v1/user", userRouter);
app.use("/v1/employee", employeeRouter);
app.use("/v1/product", productRouter);
app.use("/v1/order", orderRouter);

httpServer.listen(port, ()=>{
    console.log("Node server started with port: "+port);
})