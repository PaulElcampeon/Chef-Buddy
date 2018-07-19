if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////MAKING CALL TO GET MEAL DATA FROM SERVER////////////////////////////////////////
function ready () {
    fetch("/meals", {method: 'GET'}).then(function (response) {
        response.json().then(function (json){
            displayMeals(json);
        });
    }).catch(function (err) {console.error(err)});
}


//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY ALL MEALS///////////////////////////////////////
function displayMeals(data){
    document.getElementById("allMealDisplayer").innerHTML = "";
    
    let div = document.getElementById("allMealDisplayer");
    for(let meal of data){
        let tempDiv = document.createElement("div");
        let pTitle = document.createElement("h2");
        let pCookingTime = document.createElement("p");
        let btnDetails = document.createElement("button");
        let img = document.createElement("img");

        let break2 = document.createElement('br');
        img.className = 'mealImage';
        img.src=meal.img;
        

        let time = getGreatestTime(meal.instructionsAndTime);
        
        pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
        
        pTitle.innerHTML = meal.title;
        
        btnDetails.innerHTML = "Details";
        btnDetails.addEventListener("click",()=>{
            sessionStorage.setItem("meal", JSON.stringify(meal));
            location.href = './mealdisplay.html'
        })
        btnDetails.className = 'mealButton'
        tempDiv.className = 'mealDivs' 
        //////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
        tempDiv.appendChild(pTitle);
        tempDiv.appendChild(pCookingTime);
        tempDiv.appendChild(img);
        tempDiv.appendChild(break2)
        tempDiv.appendChild(btnDetails);
        div.appendChild(tempDiv);
    }

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

// document.getElementById("search").style.cssFloat = "right";


function runScript(e) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        var tb = document.getElementById("searchInput");
        document.getElementById("noResultsDiv").innerHTML = "";
        getMealsByTag(tb.value)
        // console.log("enter was hit")
        // eval(tb.value);
        return false;
    }
}

function getMealsByTag(tag){
    fetch("/search/?tag="+tag, {method: 'POST'}).then(function (response) {
        response.json().then(function (json){
            if(json == "sorry"){
                displaySorry();
            }else{
            displayMeals(json);
            }
        });
    }).catch(function (err) {console.error(err)});

}

function displaySorry(){
    document.getElementById("noResultsDiv").innerHTML = "";
    let div = document.getElementById("noResultsDiv");
    div.style.padding ="0px";
    div.style.margin = "0px";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Sorry no results found";
    div.appendChild(h2);
}