
document.getElementById("singleMealDisplayer").style.display="none";
var data = JSON.parse(sessionStorage.getItem("data"));
var dateMeal = new Date(sessionStorage.getItem("date"));
var dateMealReady = false;
var time = getGreatestTime(data.instructionsAndTime);
// console.log(dateMeal)
// console.log(new Date());

var dataHolder;
if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}


function ready (){
    displaySingleMeal(JSON.parse(sessionStorage.getItem("data")));
    // sessionStorage.removeItem("data");
    // sessionStorage.removeItem("date");
}

var x = document.getElementById("myAudio1"); 

function playAudio1() { 
    x.play(); 
} 

function pauseAudio1() { 
    x.pause(); 
} 


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY A SINGLE MEAL////////////////////////////////////
function displaySingleMeal(data){
    let divSingleMeal = document.getElementById("singleMealDisplayer"); 
    divSingleMeal.innerHTML = "";
    let h1Title = document.createElement("h1");
    let pCookingTime = document.createElement("p");
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
        turnInstructionTimesToDateObjs(instrucionObj,dateMeal);
        p.innerHTML = count+": "+instrucionObj.instruction;
        divInstructions.appendChild(p);
        count++;
    }
    //////////////////
    dataHolder = data
    //////////////////
    // check(data.instructionsAndTime)

    h1Title.innerHTML = data.title;
    pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
    h3Ingredient.innerHTML = "Ingredients";
    h3Instructions.innerHTML = "Instructions";

    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
    divSingleMeal.appendChild(h1Title);
    divSingleMeal.appendChild(pCookingTime);
    divSingleMeal.appendChild(h3Ingredient);
    divSingleMeal.appendChild(divIngredients);
    divSingleMeal.appendChild(h3Instructions);
    divSingleMeal.appendChild(divInstructions);
}

function getGreatestTime(instuctionsAndTime){
    let numHolder=0;
    for(let obj of instuctionsAndTime){
        if(parseInt(obj.time)>numHolder){
            numHolder = parseInt(obj.time)
        }
    }
    return numHolder;
}

function turnInstructionTimesToDateObjs(data,date){
    let timeInt = parseInt(data.time);
    let newDate = new Date(date-(timeInt*60000));
    console.log(data.instruction+" time is now "+newDate);
    data.time = newDate;
}

function check(data){
    for(let obj of data){
        console.log(obj);
    }

}

function checkingTime(){
        if(dateMeal <= new Date() && dateMealReady == false){
            dateMealReady = confirm("We need to eat now");
        }

        for(let ingredientAndTimeObj of dataHolder.instructionsAndTime){
            if(ingredientAndTimeObj.time<= new Date() && ingredientAndTimeObj.ready == false){
                playAudio1();
                let divAlert = document.getElementById("Alert");
                divAlert.innerHTML= "";
                let div = document.createElement("div");
                let p = document.createElement("p");
                let btnOK = document.createElement("button");
                btnOK.innerHTML = "OK"
                btnOK.addEventListener("click",()=>{
                    pauseAudio1();
                    ingredientAndTimeObj.ready = true;
                    divAlert.innerHTML = "";
                    
                })
                let btnCancel = document.createElement("button");
                btnCancel.innerHTML = "CANCEL"
                btnCancel.addEventListener("click",()=>{
                    pauseAudio1();
                    ingredientAndTimeObj.ready = false
                    divAlert.innerHTML = "";
                })
                p.innerHTML = ingredientAndTimeObj.instruction;
                div.appendChild(p);
                div.appendChild(btnOK);
                div.appendChild(btnCancel);
                divAlert.appendChild(div); 
                // ingredientAndTimeObj.ready = confirm("We need to start cooking "+ ingredientAndTimeObj.instruction);
                console.log("ingredient "+ingredientAndTimeObj.time);
            }

    }
    
    console.log("Meal is at:"+dateMeal);
    console.log(new Date());

}


setInterval(checkingTime,5000); 


