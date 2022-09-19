//VALIDATING EMP DETAILS
var addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', (e) => {
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var mobile = document.getElementById('mobile').value;

    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (fname == "") {
        alert("Please enter your first name at least 3 characters long")

        e.preventDefault()
        return false
    }

    if (email == "" || email.match(pattern) == null) {
        alert("This is not a valid email address")

        e.preventDefault()
        return false
    }
    if (mobile.length < 10) {
        alert("Please enter 10 digits of mobile number")
        e.preventDefault()
        return false
    }
    else {
        var empData = {}
        empData["fname"] = fname
        empData["lname"] = lname
        empData["email"] = email
        empData["gender"] = gender
        empData["mobile"] = mobile

        createEmp(empData)
        alert("Employee added Successfully")
        
        emptyForm()
    }

    e.preventDefault()
});

// CREATING EMP
function createEmp(empData) {
    var newEmp = document.createElement("tr")
    newEmp.innerHTML = `
    <tr>
        <td class="fname">${empData.fname}</td>
        <td class="lname">${empData.lname}</td>
        <td class="email">${empData.email}</td>
        <td class="gender">${empData.gender}</td>
        <td class="mobile">${empData.mobile}</td>
        <td class="text-center">
            <img class="actions"src="img/edit.png" alt="edit" onclick="editEmp(this)"> <img class="actions" src="img/bin.png" alt="delete" onclick="deleteEmp(this)">
        </td>
    </tr>
    `
    //SAVING TO LOCAL STORAGE
    saveToLocal(empData)
    document.getElementById("table-body").append(newEmp)
}
var empInChange = ""
//SAVE EMP CHANGES
var saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", (e) => {
    var fname = document.getElementById('fname').value
    var lname = document.getElementById('lname').value
    var email = document.getElementById('email').value
    var gender = document.getElementById('gender').value
    var mobile = document.getElementById('mobile').value

    empInChange.classList.remove("bg-danger")
    empInChange.querySelector('.fname').innerHTML = fname
    empInChange.querySelector('.lname').innerHTML = lname
    empInChange.querySelector('.email').innerHTML = email
    empInChange.querySelector('.gender').innerHTML = gender
    empInChange.querySelector('.mobile').innerHTML = mobile

    document.getElementById('add-btn').classList.remove('hide')
    document.getElementById('save-btn').classList.add('hide')

    alert("Employee details changed")
    //HANDLING SAVE BUTTON IN LOCAL_STORAGE
    var empData = {}
    empData["fname"] = fname
    empData["lname"] = lname
    empData["email"] = email
    empData["gender"] = gender
    empData["mobile"] = mobile

    saveToLocal(empData)

    emptyForm()
    e.preventDefault()
})
//EMPTY FORM
function emptyForm() {
    document.getElementById('fname').value = ""
    document.getElementById('lname').value = ""
    document.getElementById('email').value = ""
    document.getElementById('gender').value = ""
    document.getElementById('mobile').value = ""
}
//EDIT EMP 
function editEmp(ele) {
    var empToEdit = ele.parentElement.parentElement
    empInChange = empToEdit
    empToEdit.classList.add("bg-danger")
    var fname = empToEdit.querySelector('.fname').innerHTML
    var lname = empToEdit.querySelector('.lname').innerHTML
    var email = empToEdit.querySelector('.email').innerHTML
    var gender = empToEdit.querySelector('.gender').innerHTML
    var mobile = empToEdit.querySelector('.mobile').innerHTML
    document.getElementById('fname').value = fname
    document.getElementById('lname').value = lname
    document.getElementById('email').value = email
    document.getElementById('gender').value = gender
    document.getElementById('mobile').value = mobile

    document.getElementById('fname').focus()
    document.getElementById('add-btn').classList.add('hide')
    document.getElementById('save-btn').classList.remove('hide')
    //HANDLING EMP DETAILS IN LOCAL
    localStorage.removeItem(email)
}
//DELETE EMP
function deleteEmp(ele) {
    var empToDelete = ele.parentElement.parentElement
    var uid = empToDelete.querySelector(".email").innerHTML
    deleteInLocal(uid)
    empToDelete.remove()
    alert("Employee deteted")
}

//HANDLING EMP DETAILS IN LOCAL

//LOADING DETAILS FROM LOCAL ON PAGE LOAD
loadFromLocal()
function loadFromLocal() {
    for(key in localStorage) {
        createEmp(JSON.parse(localStorage.getItem(key)))
    }
}
//ADDING EMP DETAILS IN LOCAL
function saveToLocal(empData) {    
    var uid = empData.email
    var dataToAdd = {}
    dataToAdd[uid] = empData
    localStorage.setItem(uid, JSON.stringify(empData))
}
//DFELETE IN LOCAL
function deleteInLocal(uid) {
    localStorage.removeItem(uid)
}