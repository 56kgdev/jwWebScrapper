var express = require("express");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
var app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.listen(PORT, () => console.log("Server running on port: " + PORT));
