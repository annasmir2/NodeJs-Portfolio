const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 1000;
const users = require("./models/user");

const publicpath = path.join(__dirname, "../public");
app.use(express.static(publicpath));

const viewspath = path.join(__dirname, "../template/views");
console.log(viewspath);
app.set("view engine", "hbs");
app.set("views", viewspath);

const partialspath = path.join(__dirname, "../template/partials");
hbs.registerPartials(partialspath);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("main");
});
app.get("/", (req, res) => {
  res.render("contact");
});
app.post("/", async (req, res) => {
  try {
    const user = new users({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    const data = await user.save();
    console.log(data);
    res.status(200).render("done");
  } catch (error) {
    res.status(500).render("error" + error);
  }
});
app.listen(port, () => {
  console.log(`Listening to the ${port}`);
});
