const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("err");
});

async function main() {
    await mongoose.connect(MONGO_URL);
};


const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'675e8b428ea57746c8327e9a'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
