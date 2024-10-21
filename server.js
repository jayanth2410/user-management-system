const express = require("express");
const exphbs = require("express-handlebars"); //to create templates(extensions)
const mysql = require("mysql");
const bodyParser = require("body-parser"); // to handle json files
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files
// to access all the files avail in front-end
app.use("/", express.static("front-end"));

//Creating a template engine(new extension of own)
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

//Router
app.get("/", (req, res) => {
  res.render("home");
});

//Listening to the Port
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
