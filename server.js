const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const path = require("path");
const fs = require("fs");


app.use("/css",express.static(path.join(__dirname,"css")));
app.use("/images",express.static(path.join(__dirname,"/images")));
app.use("/scripts",express.static(path.join(__dirname,"/scripts")));
app.use("/try",express.static(path.join(__dirname,"/try")));
app.use("/try/assets/brand",express.static(path.join(__dirname,"/try/assets/brand")));
app.use("/assets/dist/css",express.static(path.join(__dirname,"/try/assets/dist/css")));
app.use("/try/assets/dist/js",express.static(path.join(__dirname,"/try/assets/dist/js")));

let writeStream = fs.createWriteStream(path.join(__dirname,"logs","systemLogs.log"))

app.use(compression());
app.use(morgan("combined",{
    stream:writeStream
}));

app.use(helmet({
    contentSecurityPolicy:{
        useDefaults:true,
        directives:{
            "script-src":["'self'","kit.fontawesome.com","cdn.jsdelivr.net","cdnjs.cloudflare.com","cdn.socket.io","code.jquery.com"],
            "connect-src":["'self'","https://chatappbackend12345.herokuapp.com","ka-f.fontawesome.com","ws://chatappbackend12345.herokuapp.com/socket.io/"],
            "img-src":["'self'","https://chatappbackend12345.herokuapp.com","cdn.jsdelivr.net","www.w3.org","cdnjs.cloudflare.com"]
        }
    }
}))

app.get("/signup",(req,res,next) => {
    res.sendFile(path.join(__dirname,"UIs","signup.html"));
})

app.get("/index",(req,res,next) => {
    res.sendFile(path.join(__dirname,"UIs","index.html"));
})

app.get("/login",(req,res,next) => {
    res.sendFile(path.join(__dirname,"UIs","login.html"));
})

app.get("/",(req,res,next) => {
    res.sendFile(path.join(__dirname,"UIs","login.html"));
})

console.log(process.env.PORT);

app.listen(process.env.PORT || 8081);