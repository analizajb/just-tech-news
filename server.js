const express = require("express");
const path = require("path");
const routes = require("./controllers/");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Stylesheet
//express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, "public")));

// Setting up Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
