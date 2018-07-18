const fs = require("fs");
const express = require("express");
const app = express();
const formidable = require('express-formidable');
app.use(express.static("public"));
app.use(formidable());

var meals = require("./models/meals")


app.listen(3000,()=>{
    console.log("Waiting on requests from port 3000");
})

app.get("/",(request,response)=>{
    // response.status(200).sendFile("index.html",{root: __dirname+"/public"});
})


app.get("/meals",(request,response)=>{
    let mealFileJson = fs.readFileSync("./data/meal.json","UTF-8");
    let mealParsedFileJson = JSON.parse(mealFileJson);

    for(let meals of mealParsedFileJson.meals){
        meals.instructionsAndTime.sort((a,b)=>{
            return parseInt(a.time) - parseInt(b.time);
        })
        console.log(meals.instructionsAndTime)
    }

    response.status(200).json(mealParsedFileJson.meals);
})

app.post("/meal",(request,response)=>{
    let title = request.fields.title;
    let ingredients = request.fields.ingredients.split(",");
    let img = request.fields.img;
    let instructionsArr = [];
 
    let timeTotal = 0
    request.fields.times.filter((obj)=>{
        timeTotal+=parseInt(obj);
    })

    let timeTotal2 = 0;
    
    for(let i=0; i<request.fields.times.length;i++){
        timeTotal2 += parseInt(request.fields.times[i]);
        request.fields.times[i] = (timeTotal-timeTotal2)
    }
   
    console.log(request.fields.times);

    for(i=0; i<request.fields.instructions.length; i++){
        instructionsArr.push({"instruction":request.fields.instructions[i] , "time":request.fields.times[i] , "ready": false})
    }

    let obj = {"title":title,"ingredient":ingredients,"img":img, "instructionsAndTime":instructionsArr};
    console.log(obj);

    // let meal1 = new meals(title,ingredients,img,instructionsArr)

    let jsonfile = fs.readFileSync("./data/meal.json","utf-8");
    let parsedFile = JSON.parse(jsonfile);
    parsedFile.meals.push(obj);
    let stringifiedfile = JSON.stringify(parsedFile,null,4);
    fs.writeFileSync("./data/meal.json",stringifiedfile,"UTF-8");

    response.status(201).sendFile("congratulations.html",{root:__dirname+"/public"});
})