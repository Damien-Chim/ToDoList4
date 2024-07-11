// ********** START ARRAYS INITIALISATION SECTION ********** //

import { getArr, addArr, removeAllArrays } from "./database.js"

async function fetchData(path) {
    let response = await getArr(path)
    return response
}

var arr = await fetchData("Arrays/" + "arr")
var arrStatus = await fetchData("Arrays/" + "arrStatus")
console.log(arr)
console.log(arrStatus)

// ********** END ARRAYS INITIALISATION SECTION ********** //




// ********** START TRANSFER LOCAL STORAGE SECTION ********** //

for (var i = 0; i < arr.length; i++) {
    var tempDiv = document.createElement('div')
    tempDiv.setAttribute("class", "tempDiv")
    tempDiv.setAttribute("id", i)
    createCheckBox(tempDiv, arrStatus[i])
    createTaskList(tempDiv, arr[i])
    createRemoveButton(tempDiv)
    document.getElementById("tasks").appendChild(tempDiv)   

    if (arrStatus[i] == 1) {
        addStrikeThrough(i)
    } 
}

displayNumberOfTasksLeft(computeNumberOfTasksLeft())

// ********** END TRANSFER LOCAL STORAGE SECTION ********** //




// ********** START TASK SUBMISSION SECTION ********** //

var addButton = document.getElementById("addButton")
addButton.addEventListener("click", userSubmitButton)

function userSubmitButton() {
    var currentInput = document.getElementById("userInput").value  
    if (currentInput != "") {
        arr.push(currentInput)
        arrStatus.push(0)
        updateDataBase(arr, arrStatus)
        playSound(addingSound)
        createTempDiv(currentInput, arr)
        clearInputField()
        displayNumberOfTasksLeft(computeNumberOfTasksLeft())
    }
}

addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        userSubmitButton()
    }
})

function createTempDiv(currentInput, arr) {
    var tempDiv = document.createElement('div')
    tempDiv.setAttribute("class", "tempDiv")
    tempDiv.setAttribute("id", arr.length - 1)
    createCheckBox(tempDiv, 0)
    createTaskList(tempDiv, currentInput)
    createRemoveButton(tempDiv)
    document.getElementById("tasks").appendChild(tempDiv)
}

function createCheckBox(tempDiv, statusOneOrZero) {
    var checkBox = document.createElement("input")
    checkBox.setAttribute("type", "checkbox")
    checkBox.setAttribute("class", "checkBox")
    // checkBox.setAttribute("id", arr.length - 1)
    if (statusOneOrZero == 1) {
        checkBox.checked = true
    }
    tempDiv.appendChild(checkBox)
}

function createTaskList(tempDiv, currentInput) {
    var newTask = document.createElement('li')
    newTask.setAttribute("class", "singleTask")
    // newTask.setAttribute("id", arr.length - 1)
    
    //******************************************************

    newTask.innerHTML = currentInput

    // alternative:
    // var textNode = document.createTextNode(currentInput)
    // newTask.appendChild(textNode)

    //******************************************************
    
    tempDiv.appendChild(newTask)
}

function createRemoveButton(tempDiv) {
    var removeButton = document.createElement('button')
    removeButton.setAttribute("class", "removeButton")
    // removeButton.setAttribute("id", arr.length - 1)
    // removeButton.innerHTML = "&#9989"
    removeButton.innerHTML = "delete"
    tempDiv.appendChild(removeButton)
}

function clearInputField() {
    document.getElementById("userInput").value = ""
}

// ********** END TASK SUBMISSION SECTION ********** //




// ********** START STRIKETHROUGH INITIATION OR REMOVAL SECTION ********** //

const wrapperForStrikeThrough = document.getElementById('tasks')
wrapperForStrikeThrough.addEventListener("change", (event) => {
    const isCheckBox = event.target.nodeName === "INPUT"
    if (!isCheckBox) {
        return
    }

    if (event.target.checked) {
        playSound(dingSound)
        addStrikeThrough(event.target.parentElement.id)
        arrStatus[event.target.parentElement.id] = 1
        updateDataBase(arr, arrStatus)
    }

    else {
        removeStrikeThrough(event.target.parentElement.id)
        arrStatus[event.target.parentElement.id] = 0
        updateDataBase(arr, arrStatus)
    }
    
    displayNumberOfTasksLeft(computeNumberOfTasksLeft());
})

function addStrikeThrough(idOfTextTobeStruk) {
    var divToCross = document.getElementById(idOfTextTobeStruk)
    var textToCross = divToCross.children[1]
    textToCross.style.textDecoration = "line-through";
    textToCross.style.opacity = 0.6
}

function removeStrikeThrough(idOfTextToBeUnStruck) {
    var divToUnCross = document.getElementById(idOfTextToBeUnStruck)
    var textToUnCross = divToUnCross.children[1]
    textToUnCross.style.opacity = 1
    textToUnCross.style.textDecoration = "none";
}

// ********** END STRIKETHROUGH INITIATION OR REMOVAL SECTION ********** //




// ********** START CLEAR SINGLE TASK SECTION ********** //

const wrapperForSingleTaskClear = document.getElementById('tasks')
wrapperForSingleTaskClear.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton) {
        return
    }

    playSound(removingSound)
    removeTask(event.target.parentElement.id)
    updateArray(event.target.parentElement.id)
    updateDataBase(arr, arrStatus)
    updateID(event.target.parentElement.id)
    displayNumberOfTasksLeft(computeNumberOfTasksLeft());
})

function removeTask(id) {
    var taskToBeRemoved = document.getElementById(id)
    taskToBeRemoved.remove()
}

function updateArray(id) {
    arr.splice(id, 1)
    arrStatus.splice(id, 1)
}

function updateID(id) {
    var divToUpdate = document.getElementById("outer").getElementsByClassName("tempDiv")
    for (i = id; i < divToUpdate.length; i++) {
        divToUpdate[i].setAttribute("id", i)
    }
}

// ********** END CLEAR SINGLE TASK SECTION ********** //




// ********** START CLEAR ALL TASKS SECTION ********** //

var clearAllTasksButton = document.getElementById("clearAllTasks")
clearAllTasksButton.addEventListener('click', clearAllTasks)

function clearAllTasks() {
    var areaToClear = document.getElementById("tasks")
    // checking if the "tasks" div contains an element, i.e.: another div
    // areaToClear.firstChild will NOT work
    if (!areaToClear.firstElementChild) {
        return
    }

    initiatePopOut(areaToClear)
}

function initiatePopOut(areaToClear) {
    if (confirm("Are you sure you want to clear all tasks?")) {
        playSound(removingSound)
        // clear the arrays
        arr = []
        arrStatus = []
        removeAllArrays()
        areaToClear.innerHTML = ""
        document.getElementById("numberOfTask").innerHTML = "You have no tasks remaining!"
    }
}

// ********** END CLEAR ALL TASKS SECTION ********** //




// ********** START UPDATING LOCAL STORAGE SECTION ********** //

function updateDataBase(arr, arrStatus) {
    addArr(arr, "Arrays/" + "arr")
    addArr(arrStatus, "Arrays/" + "arrStatus")
}

// ********** END UPDATING LOCAL STORAGE SECTION ********** //




// ********** START NUMBER OF TASKS REMAINING COUNT AND DISPLAY ********** //

function computeNumberOfTasksLeft() {
    var numOfTasksRemaining = 0;
    for (i = 0; i < arrStatus.length; i++) {
        if (arrStatus[i] == 0) {
            numOfTasksRemaining = numOfTasksRemaining + 1;
        }
    }

    return numOfTasksRemaining 
}

function displayNumberOfTasksLeft(numOfTasksRemaining) {
    if (numOfTasksRemaining == 0) {
        document.getElementById("numberOfTask").innerHTML = "You have no tasks remaining!";
    }

    else if (numOfTasksRemaining == 1) {
        document.getElementById("numberOfTask").innerHTML = "You have " + numOfTasksRemaining + " task remaining: ";
    }
    
    else {
        document.getElementById("numberOfTask").innerHTML = "You have " + numOfTasksRemaining + " tasks remaining: ";
    }
}

// ********** END NUMBER OF TASKS REMAINING COUNT AND DISPLAY ********** //




// ********** START SOUND PLAYING SECTION ********** //

var addingSound = new Audio("clickingSound.mp3")
var removingSound = new Audio("removingSound.mp3")
var dingSound = new Audio("DingSound.mp3")

function playSound(soundToPlay) {
    soundToPlay.play()
    soundToPlay.currentTime=0
}

// ********** END SOUND PLAYING SECTION ********** //




// ********** START TIME DISPLAY SECTION ********** //

setInterval(() => {
    var now = new Date();
    var time = now.toLocaleTimeString();
    var date = now.toLocaleDateString('en-GB')
    document.getElementById("time").innerHTML = "Time: " + time;
    document.getElementById("date").innerHTML = "Date: " + date;
}, 1000)

// ********** END TIME DISPLAY SECTION ********** //