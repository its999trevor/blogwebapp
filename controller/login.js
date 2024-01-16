
const User = require("../models/user.js");
module.exports={
    getRegister: (req, res) => {
        res.render("register");
    },
    postRegister: async (req, res) => {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect("/posts");
    },
    landing: (req, res) => {
        res.render("landing");
    },
    getLogin: (req, res) => {
        res.render("login");
    },
    postLogin: async (req, res) => {
        const { username, password } = req.body;
        let user = await User.findOne({ username: username });

        if (user) {
            if (user.password != password) {
                res.redirect("/login");
            } else {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.role = user.role;
                res.redirect("/posts");
            }
        } else {
            res.send("No such user found");
        }
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error during logout:", err);
                res.status(500).send("Internal Server Error");
            } else {
                res.redirect("/posts");
            }
        });
    },
};

