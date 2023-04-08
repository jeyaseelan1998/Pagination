const root = document.getElementById("root")
const root2 = document.getElementById("btns")

const API = "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json"

const USERS = []
let trace = 1
let noOfBtns = 0
let count = 0
const initialRows = 8

const fetching = (api) => {
    fetch(api).then(r => r.json())
    .then(users => {
        USERS.push(...users)

        noOfBtns = users.length / initialRows
        noOfBtns = Math.ceil(noOfBtns)

        createTable(users, trace)
    })
    .catch(err => console.log(err))
}

fetching(API)



//create HTML element in DOM
const createElement = (ele,  attr, content) => {
    let element = document.createElement(ele);
    if (attr) element.className = attr
    if (content) element.innerHTML = content
    return element;
}

//creates TABLE in DOM
var createTable = (users, trace) => {
    const table = createElement("table", "table w-75 m-auto")
    const tHead = createElement("thead", "table-dark")
    const tBody = createElement("tBody")

    let tr = createElement("tr", "text-center m-4")
    const th1 = createElement("th", "", "ID" )
    const th2 = createElement("th", "", "Name" )
    const th3 = createElement("th", "", "Email" )

    table.append(tHead, tBody)
    tHead.append(tr)
    tr.append(th1, th2, th3)

    let end = ( trace * initialRows )
    let start = end - initialRows

    let usersRows = users.slice(start, end).map((user)=>{
        let tr = createElement("tr", "text-center ")
        let id = createElement("td", "", user.id)
        let name = createElement("td", "", user.name)
        let email = createElement("td", "", user.email)
        tr.append(id, name, email)
        return tr
    })

    tBody.append(...usersRows)

    root.innerHTML = ""

    root.appendChild(table)

    if(count < 1) {
        createButtons(noOfBtns)
        count++;
    }
}


//Event handler
var onClickHandler = (i) =>{
    trace = i
    createTable(USERS, trace)
    createButtons(noOfBtns)
}

//Buttons group
var createButtons = (noOfBtns) => {
    let btnContainer = createElement("div", "d-flex flex-row justify-content-center mt-5")

    let first = createElement("button", "btn btn-secondary m-1", "First")
    first.addEventListener("click", () => onClickHandler(1))
    let last = createElement("button", "btn btn-secondary m-1", "Last")
    last.addEventListener("click", () => onClickHandler(noOfBtns))
    
    btnContainer.append(first)

    for (let i = 1; i <= noOfBtns; i++ ) {

        if (trace+3 > i && trace-3 < i ){
            let btn = createElement("button", "btn btn-secondary m-2", i)
            btn.addEventListener("click", () => onClickHandler(i))
            
            btnContainer.append(btn)
        }
    }
    btnContainer.append(last)

    root2.innerHTML = ""
    root2.append(btnContainer)
}