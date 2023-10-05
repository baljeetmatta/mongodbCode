const express=require("express");

const client=require("mongodb").MongoClient;
// client.connect("mongodb://localhost:27017",{},(err,data)=>{

// })
let dbinstance;
client.connect("mongodb://127.0.0.1:27017",{}).then((data)=>{
    console.log("Database connected");
 dbinstance= data.db("Project")

}).catch((err)=>{
    console.log("Error in database");


});

const app=express();
app.set("view engine","ejs")
app.get("/getData",(req,res)=>{

    dbinstance.collection("students").find({}).toArray().then((response)=>{
        //console.log(response);
        res.render("home",{data:response});


    })
    

    //db.students
})
app.get("/signup",(req,res)=>{
    let obj={};
    obj.name=req.query.name;
    obj.age=req.query.age;
    dbinstance.collection("students").insertOne(obj).then((res)=>{
        console.log(res,"Record inserted");
        res.end();
        
    })
})
app.listen(3000,(err)=>{
    if(err)
        console.log("Unable to start server...")
    else
        console.log("Server started");

})