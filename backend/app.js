const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./src/middleware/error")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Routes
const movie = require('./src/routes/MovieRoute')
const user = require("./src/routes/userRoute")
const genre = require("./src/routes/genreRoute")

app.use("/api/movies", movie);
app.use("/api/users", user);
app.use("/api/genres", genre);

//middleware of error
app.use(errorMiddleware);

module.exports = app























































// const express = require('express');
// const app = express();



// require("./db/conn");

// const { json, urlencoded } = require("express");
// const Register = require("./models/registers");

// const path = require("path");
// const hbs = require("hbs");

// const port = process.env.PORT || 3000;

// const static_path = path.join(__dirname, "../public/css");
// const templates_path = path.join(__dirname, "../src/templates/views");
// const partials_path = path.join(__dirname, "../src/templates/partials");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(express.static(static_path));

// app.set("view engine", "hbs");
// app.set("views", templates_path);
// hbs.registerPartials(partials_path);

// // app.get("/", (req, res) => {
// //     res.render("index");
// // })

// app.get("/register", (req, res) => {
//     res.render("register");
// })

// // app.get("/login", (req, res) => {
// //     res.render("login");
// // })

// app.post("/register", async (req, res) => {
//     try {
//         const password = req.body.password;
//         const cpassword = req.body.confirmpassword;
//         if (password === cpassword) {
//             const registerUser = new Register({
//                 email: req.body.email,
//                 password: password,
//                 confirmpassword: cpassword
//             })
//             const registered = await registerUser.save();
//             res.status(201).render("index");

//         } else {
//             res.send("Passwords not matching");
//         }

//     }
//     catch (error) {
//         res.status(400).send(error);
//     }
// })



// // // console.log();

// // app.post("/login", async (req, res) => {
// //     try {
// //         const email = req.body.email;
// //         const password = req.body.password;

// //         const userEmail = await Register.findOne({ email: email });
// //         if (userEmail.password === password) {
// //             res.status(201).render("index");
// //         } else {
// //             res.send("passwords are not matching");
// //         }
// //     }
// //     catch (error) {
// //         res.status(400).send("invalid Email");

// //     }
// // })

// app.listen(port, () => {
//     console.log(`server is running at ${port}`);
// })