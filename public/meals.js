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
        let pTitle = document.createElement("p");
        let pCookingTime = document.createElement("p");
        let btnDetails = document.createElement("button");
        let img = document.createElement("img");
        
        img.src=meal.img;
        img.style.width="100px";
        img.style.height="100px";


        let time = getGreatestTime(meal.instructionsAndTime);
        
        pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
        
        pTitle.innerHTML = "Title: "+meal.title;
        
        btnDetails.innerHTML = "Details";
        btnDetails.addEventListener("click",()=>{
            sessionStorage.setItem("meal", JSON.stringify(meal));
            location.href = './mealdisplay.html'
        })

        //////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
        tempDiv.appendChild(pTitle);
        tempDiv.appendChild(pCookingTime);
        tempDiv.appendChild(img);
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