

var count = 2;

document.getElementById("addInstruction").addEventListener("click",()=>{
    addInstructionAndTime(count);
    count++;
})


function addInstructionAndTime(num){
    let form = document.getElementById("mealCreator");
    let h1Instruction = document.createElement("h1");
    let inInstruction = document.createElement("input");
    let h1Time = document.createElement("h1");
    let inputTime = document.createElement("input");
    let break1 = document.createElement("br");
    let break2 = document.createElement("br");
    let break3 = document.createElement("br");
    let break4 = document.createElement("br");



    h1Instruction.innerHTML = "Please Enter Instruction "+num
    inInstruction.type = "text";
    inInstruction.name = "instructions"
    h1Time.innerHTML = "How many mintues after instruction "+(num-=1)
    inputTime.type = "number";
    inputTime.name = "times"
   
    form.appendChild(break1);
    form.appendChild(h1Instruction);
    form.appendChild(inInstruction);
    form.appendChild(break2);
    form.appendChild(h1Time);
    form.appendChild(inputTime);
    form.appendChild(break3);
    form.appendChild(break4);



}