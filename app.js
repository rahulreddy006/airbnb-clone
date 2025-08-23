if ( process.env.NODE_ENV !="production") {
    require('dotenv').config();

}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path =require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Expresserror = require("./utils/Expresserror.js");

const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");



const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/review.js");
const userRouter=require("./routes/user.js");

const dbUrl =process.env.ATLASDB_URL;




main().then((res)=>{
    console.log("server connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter:24 *3600,
});

store.on("error",()=>{
    console.log("ERROR IN MONGO STORE",err);
})

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires:new Date(Date.now() + 7 *24 * 60 *60 * 100),
        maxAge: 7 *24 * 60 *60 * 100,
        httpOnly:true,
    }
};




app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});





app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);



app.use((req, res, next) => {
    next(new Expresserror(404, "Page Not Found"));
});


app.use((err,req,res,next)=>{
    
    let{status = 500,message = "Something went wrong"} = err;
    res.status(status).render("error.ejs",{message});
});



app.listen(8080,(req,res)=>{
    console.log("sever is working");
});