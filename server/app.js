if (process.env.NODE_ENV !== "production") {
	//pakai ini hanya utk local
	require("dotenv").config(); //Install environment env
}
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(require("morgan")("dev"))
app.use("/", router);

module.exports = app;
