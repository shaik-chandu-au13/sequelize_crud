const express = require("express");
const bodyParser = require("body-parser");

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express();

require('dotenv').config()

const swaggerAPIDesc = swaggerJsDoc({
  swaggerDefinition:{
      info:{
          title: 'Swagger test',
          version: '1.0'
      }
  },
  apis : ['app/routes/book.routes.js']
})
app.use('/swagger',swaggerUI.serve, swaggerUI.setup(swaggerAPIDesc));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Health OK" });
});

require("./app/routes/books.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});