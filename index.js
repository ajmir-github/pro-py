const express = require("express");
const path = require("path");

const publicDir = path.join(__dirname, "public");

const app = express();

app.use(express.static(publicDir));

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));
