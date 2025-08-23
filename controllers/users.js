const User = require("../models/user");


module.exports.singup =async(req,res)=>{
    try{
        let{username,email,password}=req.body;

     const newUser=new User({email,username});

     const registerUser= await User.register(newUser,password);
     console.log(registerUser);
     req.login(registerUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success","Welcome to wonderlust");
       res.redirect("/listings");
     });
     

    }catch(e){
        req.flash("error",e.message);
        res.redirect("./signup");
    }
    

};

module.exports.login =async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    

};

module.exports.logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","You are logged Out successfully");
        res.redirect("/listings");
    });
};