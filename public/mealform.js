if (document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
var data = JSON.parse(sessionStorage.getItem("meal"));

function ready (){
    displaySingleMeal(JSON.parse(sessionStorage.getItem("meal")));
    // sessionStorage.removeItem("meal")
}

function displaySingleMeal(data){
    document.getElementById("header").innerHTML = data.title;
}

document.getElementById("mealFormImg").addEventListener("click",()=>{
    let time = document.getElementById("mTime").value;
    let date = document.getElementById("mDate").value;
    let dateTime = date+"T"+time;
    sessionStorage.setItem("date", dateTime);
    sessionStorage.setItem("data",JSON.stringify(data));
    location.href = "./mealtracking.html"
})