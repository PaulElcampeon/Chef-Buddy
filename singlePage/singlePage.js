document.getElementById("btn1").addEventListener("click",()=>{
    location.href = './meals.html'

})


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////MAKING CALL TO GET MEAL DATA FROM SERVER////////////////////////////////////////
document.getElementById("btn").addEventListener("click",()=>{
    fetch("/meals", {method: 'GET'}).then(function (response) {
        response.json().then(function (json){
            displayMeals(json);
        });
    }).catch(function (err) {console.error(err)});
})



//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY ALL MEALS///////////////////////////////////////
function displayMeals(data){
    document.getElementById("allMealDisplayer").innerHTML = "";
    document.getElementById("singleMealDisplayer").innerHTML = "";
    
    let div = document.getElementById("allMealDisplayer");
    for(let meal of data){
        let tempDiv = document.createElement("div");
        let pTitle = document.createElement("p");
        let pCookingTime = document.createElement("p");
        let btnDetails = document.createElement("button");
        
        let time = getGreatestTime(meal.instructionsAndTime);
        
        pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
        
        pTitle.innerHTML = "Title: "+meal.title;
        
        btnDetails.innerHTML = "Details";
        btnDetails.addEventListener("click",()=>{
            displaySingleMeal(meal)
        })

        //////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
        tempDiv.appendChild(pTitle);
        tempDiv.appendChild(pCookingTime);
        tempDiv.appendChild(btnDetails);
        div.appendChild(tempDiv);
    }

}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY A SINGLE MEAL////////////////////////////////////
function displaySingleMeal(data){
    document.getElementById("allMealDisplayer").innerHTML="";
    let divSingleMeal = document.getElementById("singleMealDisplayer"); 
    divSingleMeal.innerHTML = "";
    let pTitle = document.createElement("p");
    let acceptBtn = document.createElement("button");
    let h3Ingredient = document.createElement("h3");
    let divIngredients = document.createElement("div");

    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////DISPLAYING EACH INDIVIDUAL INGREDIENT////////////////////////////////
    for(let ingredient of data.ingredient){
        let p = document.createElement("p");
        p.innerHTML = ingredient
        divIngredients.appendChild(p);
    }
    let h3Instructions = document.createElement("h3");
    let divInstructions = document.createElement("div");
    
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////DISPLAYING EACH INSTRUCTION/////////////////////////////////////
    let count=1;
    for(let instrucionObj of data.instructionsAndTime){
        let p = document.createElement("p");
        p.innerHTML = count+": "+instrucionObj.instruction;
        divInstructions.appendChild(p);
        count++;
    }
    pTitle.innerHTML = data.title;
    acceptBtn.innerHTML = "ACCEPT";
    acceptBtn.addEventListener("click",()=>{

    })
    
    h3Ingredient.innerHTML = "Ingredients";
    h3Instructions.innerHTML = "Instructions";

    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
    divSingleMeal.appendChild(pTitle);
    divSingleMeal.appendChild(acceptBtn);
    divSingleMeal.appendChild(h3Ingredient);
    divSingleMeal.appendChild(divIngredients);
    divSingleMeal.appendChild(h3Instructions);
    divSingleMeal.appendChild(divInstructions);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////FUNCTION TO FIND THE LONGEST TIME/////////////////////////////////////////////
function getGreatestTime(instuctionsAndTime){
    let numHolder=0;
    for(let obj of instuctionsAndTime){
        if(parseInt(obj.time)>numHolder){
            numHolder = parseInt(obj.time)
        }
    }
    return numHolder;

}