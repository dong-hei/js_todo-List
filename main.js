let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tab div");
let userInput = document.getElementById("task-input")
//여러개를 선택할때는 쿼리셀렉터 올
let taskList = [];
let filterList = [];
let mode = 'all';
addBtn.addEventListener("click", addTask)

userInput.addEventListener("focus",
function(){
    userInput.value=""})

for(let i =1; i < tabs.length;i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

function addTask(){
    let task={
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isDone: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list=[];
    if(mode == "all"){
        list = taskList
    }else if(mode == "ongoing" || mode=="done"){
        list =filterList
    }
    let resultHTML = '';
    for(let i=0; i<list.length;i++){
        if(list[i].isDone ==true){
        resultHTML += `
        <div id="task-board">
        <div class="task">
            <div class="task-done">
            ${list[i].taskContent}
            </div>
            <div class="done-btn">
                <button onclick="ToggleDone('${list[i].id}')" type="button" class="btn btn-dark">check</button>
                <button onclick="deleteTask('${list[i].id}')" type="button" class="btn btn-dark">delete</button>
            </div>
        </div>
    </div>`;}
    else{
        resultHTML += `
        <div id="task-board">
        <div class="task">
            <div>
            ${list[i].taskContent}
            </div>
            <div>
                <button onclick="ToggleDone('${list[i].id}')" type="button" class="btn btn-dark">check</button>
                <button onclick="deleteTask('${list[i].id}')" type="button" class="btn btn-dark">delete</button>
            </div>
        </div>
    </div>`;
    }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
function ToggleDone(id){
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isDone= !taskList[i].isDone;
            // 값의 반대값을 대입해준다. 
            break;
        }
    }
    render();
    console.log(taskList)
}

function deleteTask(id){
    for(let i = 0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
}
render()
}

function filter(event){
    mode=event.target.id;
    filterList=[];

    document.getElementById("under-line").style.width =
    event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left =
    event.target.offsetLeft + "px";
    if(mode == "all"){
        render()
    }else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isDone ==false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isDone == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 16);
}