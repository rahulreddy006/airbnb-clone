const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const passportLocalmongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalmongoose);
module.exports = mongoose.models.User ||
mongoose.model("User",userSchema);

// module.exports = mongoose.model("User",userSchema);  