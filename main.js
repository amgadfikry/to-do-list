//add DOM element in variables
const addBtn =document.querySelector(".btn")
const inputField = document.querySelector(".input");
const listFiled = document.querySelector(".list");
const h2List = document.querySelector(".list h2")


//function of whtat happen when add item to list
function addToList (value,count){
    let iconsArray =['<img src="./assests/checkmark.png" alt="" class="done icons-li">',
                    '<img src="./assests/cross.png" alt="" class="undone icons-li icons-li-inactive">',
                    '<img src="./assests/bin.png" alt="" class="delete icons-li">']
    let div = document.createElement("div");
    div.classList.add("task");
    div.dataset.mark = count
    let paragraph = document.createElement("p");
    paragraph.textContent = value;
    div.appendChild(paragraph)
    let ul = document.createElement("div");
    ul.classList.add("icons");
    div.appendChild(ul);
    for (let i = 0; i < iconsArray.length; i++) {
        ul.innerHTML+= iconsArray[i]
    }
    ul.childNodes[2].dataset.count=count;
    listFiled.appendChild(div);
}
let count = 0;
//click on add btn event
addBtn.addEventListener("click",()=>{
    if(inputField.value){
        count++
        addToList(inputField.value,count);
        window.localStorage.setItem(count.toString(),inputField.value)
        inputField.value=""
        listFiled.classList.remove("list-head");
        h2List.style.display="none"
    }
    else{
    }
})

//mark task as done , undone , delete
listFiled.addEventListener("click",(e)=>{
    if(e.target.classList.contains("done")){
        e.target.classList.add("icons-li-inactive");
        e.target.nextSibling.classList.remove("icons-li-inactive")
        e.target.parentNode.previousSibling.classList.add("line");
        localStorage.setItem("t"+e.target.parentNode.parentNode.dataset.mark,"icons-li-inactive")
        //e.target.parentNode.parentNode.dataset.mark="mark"
    }
    else if(e.target.classList.contains("undone")){
        e.target.classList.add("icons-li-inactive");
        e.target.previousSibling.classList.remove("icons-li-inactive")
        e.target.parentNode.previousSibling.classList.remove("line");
        localStorage.removeItem("t"+e.target.parentNode.parentNode.dataset.mark)
        //e.target.parentNode.parentNode.removeAttribute("data-mark")
    }
    else if(e.target.classList.contains("delete")){
        window.localStorage.removeItem(e.target.getAttribute("data-count"))
        e.target.parentNode.parentNode.remove();
        if(listFiled.children.length==1){
            listFiled.classList.add("list-head");
                h2List.style.display="block"
        }
    }
})

//add content of local storage when reload page
window.addEventListener("load",()=>{
    let storageTextArr = [];
    let storageMarkArr = [];
    if(localStorage.length > 0){
        for (let i = 0; i < localStorage.length;i++){
            if(localStorage[localStorage.key(i)]=="icons-li-inactive"){
                storageMarkArr.push(localStorage.key(i).slice(1))
            }
            else{
                storageTextArr.push(localStorage.key(i))
                storageTextArr.sort()
            }
        }
        storageTextArr.forEach(el=>{
            addToList(localStorage.getItem(el),parseInt(el))
            listFiled.classList.remove("list-head");
            h2List.style.display="none"
        })
        storageMarkArr.forEach(el=>{
            for(let i =1 ; i < listFiled.children.length;i++){
                if(el== listFiled.children[i].dataset.mark){
                    listFiled.children[i].children[1].children[0].classList.add("icons-li-inactive");
                    listFiled.children[i].children[1].children[1].classList.remove("icons-li-inactive");
                    listFiled.children[i].children[0].classList.add("line")
                }
            }
        })
        let highNum = storageTextArr.map(el=>{
            return parseInt(el)
        })
        count = Math.max(...highNum)
    }
})