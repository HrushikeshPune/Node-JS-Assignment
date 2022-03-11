const express = require("express");

const mongoose = require('mongoose');
const user =require("./model/user");
var methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/assigment_4');
const app = express();
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, }));
app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/", async(req, res) => {
    const users =await user.find();
    res.render("index.ejs", { users });
})
app.get("/form", (req, res) => {
    res.render("form.ejs");
})
app.post("/user/add", async (req, res) =>{
    console.log(req.body);
    const {name, email,isPromoted } = req.body;
    await user.create({
        name,
        email,
        isPromoted
    })
    res.redirect("/");
})
app.put("/user/:id",async(req,res)=>{
    await user.updateOne({_id:req.params.id},[
        { $set: { isPromoted: { $not: "$isPromoted" } } }
      ])
      console.log("updated");
      res.redirect("/")
})
app.delete("/user/:id",async ( req, res)=>{
    await user.deleteOne(
        {_id: req.params.id}, {selected:true}
    )
    res.redirect("/");
})
app.listen(3000, () => console.log("server is responding")); 