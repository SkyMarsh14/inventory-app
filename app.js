require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const brandRouter = require("./routes/brandRouter");
const formRouter = require("./routes/formRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/brand", brandRouter);
app.use("/form", formRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Starting an express app. Listening to the port: ${PORT}.`);
});
