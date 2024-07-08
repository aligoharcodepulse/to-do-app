const inputBox = document.getElementById("input-box");
const itemsList = document.getElementById("list-items");
const addTask = () => {
    let trimmedValue = inputBox.value.trim();

    if (trimmedValue === '') {
        alert('You Must Enter Something!');
    } else {
        let li = document.createElement("li");//create element to add the task in it
        li.innerHTML = trimmedValue;

        let editButton = document.createElement("button");//create button element foe edit functionality
        editButton.innerHTML = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editTask(editButton);

        let span = document.createElement("span");//span for deleting the task
        span.innerHTML = "\u00d7";
        span.className = "task-text";
        li.appendChild(editButton);
        li.appendChild(span);

        itemsList.appendChild(li);
       
    }
    inputBox.value = "";
    saveData();
}

itemsList.addEventListener("click",function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.className==="edit-btn") {
        e.target.parentElement.editTask();
    }
},false);

const editTask = (editButton) => {
    let li = editButton.parentElement;
    let originalText = li.childNodes[0].nodeValue.trim(); // Get the original text of the list item

    let newTask = prompt("Edit your task:", originalText);
    if (newTask !== null && newTask.trim() !== "") {
        li.childNodes[0].nodeValue = newTask.trim();
        saveData();
    }
};
        
const saveData = () => {
    localStorage.setItem("data",itemsList.innerHTML);
}
const showTask = () => {
    itemsList.innerHTML = localStorage.getItem("data");
}
showTask(); 
const RemoveTasks = () => {
    itemsList.innerHTML = "";
}