if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready () {
    displaySingleMeal(JSON.parse(sessionStorage.getItem("meal")));
    sessionStorage.removeItem("meal")
}

var Ingredients;

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCTION TO DISPLAY A SINGLE MEAL////////////////////////////////////
function displaySingleMeal(data){
    Ingredients = data.ingredient
    let divSingleMeal = document.getElementById("singleMealDisplayer"); 
    divSingleMeal.innerHTML = "";
    let pTitle = document.createElement("p");
    let acceptBtn = document.createElement("button");
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
    for(let instrucionObj of data.instructionsAndTime){
        let p = document.createElement("p");
        p.innerHTML = count+": "+instrucionObj.instruction;
        divInstructions.appendChild(p);
        count++;
    }
    pTitle.innerHTML = data.title;
    acceptBtn.innerHTML = "ACCEPT";
    acceptBtn.addEventListener("click",()=>{
        sessionStorage.setItem("meal", JSON.stringify(data))
        location.href = './mealform.html'
    })

    let time = getGreatestTime(data.instructionsAndTime);        
    pCookingTime.innerHTML = "Cooking Time: "+time+" minutes";
    img.src = data.img;
    img.style.width = "100px";
    img.style.height = "100px";
    h3Ingredient.innerHTML = "Ingredients";
    h3Instructions.innerHTML = "Instructions";

    //////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////APPENDING ELEMENTS TO THE DIV////////////////////////////////////////
    divSingleMeal.appendChild(pTitle);
    divSingleMeal.appendChild(img);
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

    // productContainer.removeChild("h2")
    // let h2 = document.createElement("h2");
    let h2 = document.getElementById("totalPrice");
    h2.innerHTML="";
    h2.innerHTML = "Total Price: "+price+" <br> Your Order will be with you shortly";
    // productContainer.appendChild(h2);
}

document.getElementById("orderIngredients").addEventListener("click",()=>{
    productTotal = 0;
    productContainer.innerHTML = "";
    for(let ingredient of Ingredients){
        getProduct(ingredient);
    }
    displayTotal();

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


