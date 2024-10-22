const express = require("express");
const exphbs = require("express-handlebars"); //to create templates(extensions)
const bodyParser = require("body-parser"); // to handle json files
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//static files
// to access all the files avail in front-end
app.use("/", express.static("front-end"));

//Creating a template engine(new extension of own)
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");

//routes are avil in server/routes/user.js
const routes = require("./server/routes/user");
app.use("/", routes);

//Listening to the Port
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
