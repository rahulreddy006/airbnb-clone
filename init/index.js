const mongoose = require('mongoose');

const initData = require("./data.js");

const Listing = require("../models/listing.js");



main().then((res)=>{
    console.log("server connected");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj,owner: "68a16323a0dc09ced5a3ac2b"}));
    await Listing.insertMany(initData.data);
    console.log("total data is inserted");
};

initDB();



