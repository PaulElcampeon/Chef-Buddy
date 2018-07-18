if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    displaySingleMeal(JSON.parse(sessionStorage.getItem("meal")));
    // sessionStorage.removeItem("meal")
}

var Ingredients;

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY A SINGLE MEAL////////////////////////////////////
function displaySingleMeal(data){
    Ingredients = data.ingredient
    let divSingleMeal = document.getElementById("singleMealDisplayer"); 
    divSingleMeal.innerHTML = "";
    let divImg = document.createElement("div")
    // divImg.style.width = "100px";
    // divImg.style.height = "100px";

    // divImg.style.backgroundImage = "url('"+data.img+"')"
    let pTitle = document.createElement("p");
    let acceptBtn = document.createElement("button");
    let breakLine = document.createElement("br")
    let pCookingTime = document.createElement("p");
    let img = document.createElement("img");
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

    for(let i = data.instructionsAndTime.length-1; i>=0; i--){
        let p = document.createElement("p");
        p.innerHTML = count+": "+data.instructionsAndTime[i].instruction;
        divInstructions.appendChild(p);
        count++;
    }

    // }
    // for(let instrucionObj of data.instructionsAndTime){
    //     let p = document.createElement("p");
    //     p.innerHTML = count+": "+instrucionObj.instruction;
    //     divInstructions.appendChild(p);
    //     count++;
    // }
    acceptBtn.className = "btn1"
    pTitle.innerHTML = data.title;
    acceptBtn.innerHTML = "ACCEPT";
    acceptBtn.addEventListener("click",()=>{
        sessionStorage.setItem("meal", JSON.stringify(data))
        location.href = './mealform.html'
    })

    let time = getGreatestTime(data.instructionsAndTime);        
    pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
    img.src = data.img;
    img.style.width = "350px";
    img.style.height = "250px";
    h3Ingredient.innerHTML = "Ingredients";
    h3Instructions.innerHTML = "Instructions";

    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
    divImg.style.marginTop = "50px";
    divImg.appendChild(pTitle);
    divImg.appendChild(img)
    divImg.style.textAlign = "center";
    divImg.style.position = "relative";
    pTitle.style.position = "absolute";
    pTitle.style.top ="40%";
    pTitle.style.left ="50%";
    pTitle.style.transform = "translate(-50%, -50%)";
    pTitle.style.fontSize = "2em";
    pTitle.style.fontWeight = "bold";
    pTitle.style.textShadow = "#474747 3px 5px 2px";



    // divSingleMeal.appendChild(img);
    divSingleMeal.appendChild(divImg);

    divSingleMeal.appendChild(breakLine);
    divSingleMeal.appendChild(acceptBtn);
    divSingleMeal.appendChild(pCookingTime);
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

let productContainer = document.getElementById("productContainer");

var productTotal = 0;

function displayProducts(data){
    let divProduct = document.createElement("div");
    let pName = document.createElement("p");
    let imgProduct = document.createElement("img");
    let pPrice = document.createElement("p");
    let productData = data.uk.ghs.products.results[0];
    pName.innerHTML = "Name: "+productData.name;
    imgProduct.src = productData.image;
    pPrice.innerHTML = "Price: £"+productData.price; 

    divProduct.appendChild(pName);
    divProduct.appendChild(imgProduct);
    divProduct.appendChild(pPrice);
    productContainer.appendChild(divProduct);
    productTotal +=productData.price;

    console.log(productData.price);
    console.log(productTotal);

    displayTotal(productTotal)


    // displayTotal();
}

function displayTotal(price){
    let h2 = document.getElementById("totalPrice");
    h2.innerHTML="";
    let roundedPrice = price.toFixed(2);
    h2.innerHTML = "Total Price: £"+roundedPrice+" <br> Add to shopping basket";
    document.getElementById("orderIngredients").style.visibility = "hidden";
}

document.getElementById("orderIngredients").addEventListener("click",()=>{
    productTotal = 0;
    productContainer.innerHTML = "";
    for(let ingredient of Ingredients){
        getProduct(ingredient);
    }
    // displayTotal();

})

function getProduct(productName){
    fetch("https://dev.tescolabs.com/grocery/products/?query="+productName+"&offset=0&limit=1", {method: 'GET', headers: {"Ocp-Apim-Subscription-Key":"b93943899eee44a5b6dffcf0afc6bc65"}}).then(function (response) {
        response.json().then(function (json){
            // console.log(json);
            displayProducts(json);
            
            // let OrderBt
            ///display a button that says order
        });
    }).catch(function (err) {console.error(err)});
}


