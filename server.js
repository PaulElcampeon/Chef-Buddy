const fs = require("fs");
const express = require("express");
const app = express();
const formidable = require('express-formidable');
app.use(express.static("public"));
app.use(formidable());


app.listen(3000,()=>{
    console.log("Waiting on requests from port 3000");
})

app.get("/",(request,response)=>{
    // response.status(200).sendFile("index.html",{root: __dirname+"/public"});
})


app.get("/meals",(request,response)=>{
    let mealFileJson = fs.readFileSync("./data/meal.json","UTF-8");
    let mealParsedFileJson = JSON.parse(mealFileJson);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
    for(let meals of mealParsedFileJson.meals){
        meals.instructionsAndTime.sort((a,b)=>{
            return parseInt(a.time) - parseInt(b.time);
        })
        console.log(meals.instructionsAndTime)
    }

    response.status(200).json(mealParsedFileJson.meals);
})