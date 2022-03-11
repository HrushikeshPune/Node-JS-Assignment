const express = require("express");
const faker = require("faker")
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser());
app.set("views", "./views");
app.set("view engine", "ejs");
var users = [];
for (var i = 0; i < 5; i++) {
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email()
    })
}
app.get("/", (req, res) => {
    res.render("index.ejs", { users });
})
app.get("/form", (req, res) => {
    res.render("form.ejs");
})
app.post("/user/add", (req, res) => {
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect("/");
})
app.listen(3000, () => console.log("server is responding")); 