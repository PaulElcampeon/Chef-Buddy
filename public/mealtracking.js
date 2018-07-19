
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
    timer();


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

// function check(data){
//     for(let obj of data){
//         console.log(obj);
//     }

// }

function checkingTime(){
        // if(dateMeal <= new Date() && dateMealReady == false){
        //     dateMealReady = confirm("We need to eat now");
        // }

        for(let ingredientAndTimeObj of dataHolder.instructionsAndTime){
            if(ingredientAndTimeObj.time<= new Date() && ingredientAndTimeObj.ready == false){
                document.getElementById("waitingGif").style.display = "none";
                playAudio1();
                let divAlert = document.getElementById("Alert");
                divAlert.innerHTML= "";
                let div = document.createElement("div");

                div.id = "instructionDiv"
                let p = document.createElement("p");
                let btnOK = document.createElement("button");
                btnOK.id = "buttonOk"
                btnOK.innerHTML = "OK"
                btnOK.addEventListener("click",()=>{
                    pauseAudio1();
                    ingredientAndTimeObj.ready = true;
                    divAlert.innerHTML = "";
                    
                })
                let btnCancel = document.createElement("button");
                btnCancel.id = "buttonCancel"
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
                console.log("ingredient "+ingredientAndTimeObj.time);
            }
            document.getElementById("waitingGif").style.display = "block";


    }
    
    
    // console.log("Meal is at:"+dateMeal);
    console.log(new Date());

}


var topDiv = document.getElementById("top");
topDiv.style.width = "400px";
topDiv.style.height = "100px";
topDiv.style.background = "black";
topDiv.style.margin = "auto";
var bottomDiv = document.getElementById("bottom");
bottomDiv.style.width = "100%";
bottomDiv.style.height = "100px";
bottomDiv.style.background = "#8BED67";
var p = document.createElement("p");


function timer(){
    p.innerHTML = "";
    let lastStep = dataHolder.instructionsAndTime[0].time;
    let firstStep = dataHolder.instructionsAndTime[dataHolder.instructionsAndTime.length-1].time;
    let difference = lastStep-firstStep;
    console.log(difference)
    let newPercentage = Math.round(((lastStep-(new Date()))/difference)*100);
    if(newPercentage <=0){
        newPercentage = 0;
    }
    if(newPercentage>100){
        newPercentage = 100;
    }
    console.log("new Percentage: "+newPercentage)
    p.innerHTML = "Progress: "+(100-newPercentage)+"%";
    topDiv.appendChild(p);
    setDivWidth((100-newPercentage))
    
}


setInterval(timer,1000); 

function setDivWidth(num){
    bottomDiv.style.width = num+"%";

}

function upDateInstruction(){
    mealCompleted();
    for(let i=dataHolder.instructionsAndTime.length-1; i>=0 ; i--){
        if(dataHolder.instructionsAndTime[i].time > new Date()){
            let p = document.getElementById("instructionAndDate");
            p.innerHTML = "";
            let timeOfNextInstruction = dataHolder.instructionsAndTime[i].time.toString().split(" ")[4];
            p.innerHTML = "Next Instruction: "+dataHolder.instructionsAndTime[i].instruction+"<br>Time: "+timeOfNextInstruction;
            break;
        }
    }
}

function mealCompleted(){

    if(dataHolder.instructionsAndTime[0].time <= new Date()){
        document.getElementById("mechWar").style.display = "none";
        
        let div = document.getElementById("desmond");
        div.innerHTML = "";
        
        let h1 = document.createElement("h1");
        let button = document.createElement("button");
        
        button.id="goHome";
        button.innerHTML = "HOME";
        button.addEventListener("click",()=>{
            location.href = "./index.html"
        })
        
        h1.innerHTML = "BON APPETIT";
        div.appendChild(h1);
        div.appendChild(button);
    }
}

setInterval(upDateInstruction,2000)

setInterval(checkingTime,2000); 


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

document.getElementById("sound2").addEventListener("click",()=>{
    document.getElementById("myAudio1").src = "./sounds/JumpDown.mp3"
})

document.getElementById("sound1").addEventListener("click",()=>{
    document.getElementById("myAudio1").src = "./sounds/buzzer.mp3"
})

document.getElementById("mute").addEventListener("click",()=>{
    document.getElementById("myAudio1").src = "";
})