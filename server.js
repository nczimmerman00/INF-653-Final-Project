const res = require('express/lib/response');

const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const connectDB = require("./config/connectDB");
const db = mongoose.connection;
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require('./middleware/errorHandler')
__dirname = path.resolve(path.dirname(''));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use(errorHandler);
//Routes
app.use('/states', require('./routes/states.js'));
app.use('/', require('./routes/root.js'))
//All the non-existing paths
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 not found" });
    } else {
      res.type("txt").send("404 not found");
    }
  });

connectDB();
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT,() => console.log(`Server is alive on http://localhost:${PORT}`));
  });
