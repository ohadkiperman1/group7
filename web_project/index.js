const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
const sql = require("./db/db");
const CRUD = require("./CRUD");
const cookieParser = require("cookie-parser");
const  createDB = require("./createDB");

app.set("views", path.join(__dirname,"views"));
app.set("view engine", 'pug');

app.use(cookieParser());
app.use(express.static(path.join(__dirname,"static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routing
app.get("/signUP",(req,res)=>{
    res.render("signUP");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/searchCourt",(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("searchCourt",userIsLogged);
});
app.get("/",(req,res)=>{
    res.redirect("/homePage");
});
app.get('/homePage',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("homePage",userIsLogged );
});
app.get("/searchOutput",(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("searchOutput",userIsLogged);
});
app.get("/logout",(req,res)=>{
    res.clearCookie("userIsLogged");
    res.redirect("/");
})
app.get("/profile",(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    console.log(userIsLogged);
    res.render("profile",userIsLogged);
})
app.get("/myOrders",CRUD.userOrders);
app.post('/userLogin',CRUD.validUser);
app.post('/formHandler',CRUD.createNewUser);
app.get("/cancelOrder", CRUD.cancelOrder);
app.post("/searchForm", CRUD.searchCourt);
app.get("/bookOrder", CRUD.bookOrder);
app.post("/updateProfileForm",CRUD.updateProfile);


// routing for images
app.get('/hide',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/web_images/hide.png'));
});
app.get('/show',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/web_images/show.png'));
});
app.get('/homeBackground',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/web_images/homeBackground.png'));
});
app.get('/backgroundPages',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/web_images/backgroundPages.png'));
});
app.get('/football',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/web_images/football.png'));
});
// set UP DB
app.get('/dropUsersTable', createDB.DropUsersTable);
app.get('/dropCourtsTable', createDB.DropCourtsTable);
app.get('/dropOrdersTable', createDB.DropOrdersTable);
app.get('/createUsersTable', createDB.CreateUsersTable);
app.get('/createOrdersTable', createDB.CreateOrdersTable);
app.get('/createCourtsTable', createDB.CreateCourtsTable);
app.get('/showUsersTable',createDB.ShowUsersTable);
app.get('/showCourtsTable',createDB.ShowCourtsTable);
app.get('/showOrdersTable',createDB.ShowOrdersTable);
app.get('/insertUsersData',createDB.insertUsersData);
app.get('/insertCourtsData',createDB.insertCourtsData);
app.get('/insertOrdersData',createDB.insertOrdersData);

// listen
app.listen(port,()=>{
    console.log("server is running on port ", port);
});
