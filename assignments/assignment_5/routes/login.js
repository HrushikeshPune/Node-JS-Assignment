const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
var jwt = require('jsonwebtoken');
const User =require("../model/user");
const bodyparser = require("body-parser");
const { body, param, validationResult } = require('express-validator');
const SECRET = "RESTAPI";
router.use(bodyparser());
router.post("/register", body("email"), body("name"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name, email, password} = req.body;
        bcrypt.hash(password, 10, async function(err, hash) {
            if(err){
                res.status(400).json({
                    status: "Failed",
                    message: "Invalid details"
                })
            }
            const user = await User.create(
                {
                    name, 
                    email, 
                    password:hash
                }
            );
            res.json({
                status: "Success",
                user
            })
        });
       
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})
router.post("/login", body("email"), body("password"), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                status:"Failed",
                message:"Invalid user"
            })
        }
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                res.json({
                    status: "Sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "Failed",
                    message: "Not Authenticated"
                })
            }
        });
       
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

module.exports = router;