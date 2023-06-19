const express = require("express");
const app = express();
const sql = require("./db/db.js");
const path = require ('path');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const createNewUser = (req,res)=>{
    //validate info exists
    if(!req.body){
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const NewUser = {
        "first_name" : req.body.firstnameSP,
        "last_name" : req.body.lastnameSP,
        "email" : req.body.emailSP,
        "password": req.body.passwordSP,
        "age": req.body.ageSP
    };
    const Q1 = "INSERT INTO users SET ?";
    console.log(NewUser);
    sql.query(Q1,NewUser,(err,mysqlres)=>{
        if(err){
            console.log("error in running query: ", err);
            res.status(400).send({message: "sign up failed, please contact customer service"});
            return;
        }
        console.log("created user, user id: ", {id: mysqlres.insertId});
         res.sendFile(path.join(__dirname, "views/searchCourt.html"));
        return;
    });
};
const validUser =(req,res)=>{
    //Validate request
    if(!req.body){
        res.status(400).send({
            message:"Content can not be empty!"
        })
       return;
    }
    let email = req.body.email;
    let password = req.body.password;
    const Q2 = "SELECT * FROM users WHERE password =? AND Email = ?"
    sql.query(Q2,[password,email],(err,mysqlres)=>{
          if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return;
        }
         if (mysqlres.length>=1) {
             let user_name = mysqlres[0].first_Name;
             let user_last_name = mysqlres[0].last_Name;
             let user_email = mysqlres[0].email;
             let user_password = mysqlres[0].password;
             let userIsLogged = { user_name: user_name,user_last_name:user_last_name,user_email: user_email,user_password:user_password};
             console.log(userIsLogged);
             res.cookie("userIsLogged", userIsLogged);
             console.log('Cookies: ', req.cookies);
             res.redirect('searchCourt');
         }
         else {
             res.render('login',{var1:"Wrong Email or Password, Please try Again"});
            return;
         }
    })
}
const userOrders = (req,res)=>{
    const user ={
         user_mail: req.cookies.userIsLogged.user_email,
    };
    const Q2 = "SElECT * FROM ORDERS WHERE email = ?";
    sql.query(Q2,user.user_mail,(err,mysqlres)=>{
        if(err)
        {
            console.log("error: ", err);
            res.status(400).send({message: "error in showing customers messages: " + err});
            return;
        }
        let myOrders = mysqlres;
        res.render('myOrders', {myOrders:"All your Orders:", myOrders });
        return;
    })
}
const cancelOrder = (req,res)=>{
    const user ={
         user_mail: req.cookies.userIsLogged.user_email,
         order_id : req.query.orderId
    };
     const Q2 = `DELETE FROM orders
WHERE email = ? AND order_id = ?;`;
    sql.query(Q2,[user.user_mail,user.order_id],(err,mysqlres)=>{
        if(err)
        {
            console.log("error: ", err);
            res.status(400).send({message: "error in showing customers messages: " + err});
            return;
        }
        res.redirect("/myOrders");
        return;
    })
}
const searchCourt = (req,res)=>{
    const court ={
        city: req.body.city,
        date: req.body.date,
        size: req.body.courtSize,
        kind: req.body.court_kind
    };
    console.log(court);
      const Q2 = `SELECT courts.court_id, courts.court_name, courts.city, courts.court_size, courts.court_kind, court_availability.startTime, court_availability.endTime, '2023-06-16' AS date
FROM courts
JOIN (
    SELECT  '10:00' AS startTime, '12:00' AS endTime
    UNION ALL
    SELECT  '12:00' AS startTime, '14:00' AS endTime
    UNION ALL
    SELECT  '14:00' AS startTime, '16:00' AS endTime
    UNION ALL
    SELECT  '16:00' AS startTime, '18:00' AS endTime
    UNION ALL
    SELECT  '18:00' AS startTime, '20:00' AS endTime
) AS court_availability
WHERE NOT EXISTS (
    SELECT 1
    FROM orders
    WHERE courts.court_name = orders.court_name
        AND orders.order_date = ?
        AND orders.order_time >= court_availability.startTime
        AND orders.order_time < court_availability.endTime
)
    AND courts.city = ?
    AND courts.court_size = ?
    AND courts.court_kind = ?
ORDER BY court_availability.startTime;
`;
      if (!court.date || !court.city || !court.size || !court.kind)
       {

           res.redirect("/searchCourt");
            return;
       }
         sql.query(Q2,[court.date,court.city,court.size,court.kind],(err,mysqlres)=>{
        if(err)
        {
            console.log("error: ", err);
            res.status(400).send({message: "error in showing customers messages: " + err});
            return;
        }
        if(mysqlres.length>=1) {
            console.log("sadasd", mysqlres);
            let courts = mysqlres
            let userIsLogged = req.cookies.userIsLogged.user_email
            res.render('searchOutput', {courts: courts, userIsLogged: userIsLogged});
        }
        return;
    })
}
const bookOrder = (req,res)=>{
    const order ={
         name: req.query.courtName,
         orderTime : req.query.startTime,
         email : req.cookies.userIsLogged.user_email,
         city: req.query.city,
         date: req.query.date
    };
     const Q2 = `INSERT INTO orders (court_name, order_date, order_time, city, email)
VALUES (?, ?, ?, ?, ?);
`;
    sql.query(Q2,[order.name,order.date,order.orderTime,order.city,order.email],(err,mysqlres)=>{
        if(err)
        {
            console.log("error: ", err);
            res.status(400).send({message: "error in showing customers messages: " + err});
            return;
        }
        res.redirect("/myOrders");
        return;
    })
}
const updateProfile = (req,res)=>{
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }
    const user = {
        email : req.cookies.userIsLogged.user_email,
        password: req.body.profilePassword,
    };

   const Q2 = "UPDATE users SET Password = ? WHERE email = ?";
    sql.query(Q2,[user.password,user.email],(err,mysqlres) => {
        if (err) {
            res.status(400).send({message: "error2 in creating updating details: " + err});
            return;
        }
        const updatedUser = {
      ...req.cookies.userIsLogged,
      user_password: user.password,
    };
    res.cookie('userIsLogged', updatedUser);
    res.redirect("/profile");
    return;
    });
}
module.exports = {createNewUser,validUser,userOrders,cancelOrder,searchCourt,bookOrder,updateProfile};

