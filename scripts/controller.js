function onPageLoad() {
    // //Wire up all the event handlers
    document.getElementById("createBtn").onclick = onCreateBtnClicked;
    document.getElementById("cancelBtn").onclick = onCancelBtnClicked;
    document.getElementById("newBtn").onclick = onNewBtnClicked;
    document.getElementById("reRoll").onclick = onReRollBtnClicked;
    //document.getElementById("editBtn").onclick = onEditBtnClicked;
    

    //Populate the Table
    var items = modelGetAllCharacters();
    for (var i = 0; i < items.length; i++) {
        addTableItem(items[i]);
    }

    //Resets input form 
    clearInputForm();
}

function onReRollBtnClicked() {
    document.getElementById("reRoll").value = "reRoll"
    document.getElementById("reRoll").innerHTML = "Re-Roll"
    document.getElementById("confirmBtnError").innerText = "";
    document.getElementById("level").value = getRandomArbitrary(3, 10)
    document.getElementById("strength").value = getRandomArbitrary(3, 10)
    document.getElementById("dexterity").value = getRandomArbitrary(3, 10)
    document.getElementById("intelligence").value = getRandomArbitrary(3, 10)
    document.getElementById("luck").value = getRandomArbitrary(3, 10) 

}

function onCreateBtnClicked() {
    if (!validateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var newCharacter = modelCreateCharacter(
        form.userName.value,
        form.userRace.value,
        form.userClass.value,
        form.genderMaleRadio.checked,
        form.rightHanded.checked,
        form.level.value,
        form.strength.value,
        form.dexterity.value,
        form.intelligence.value,
        form.luck.value
    );

    addTableItem(newCharacter);

    clearInputForm();
}

function onCancelBtnClicked() {
    clearInputForm();
}

function onNewBtnClicked() {
    document.getElementById("formTitle").innerText = "Create New Character";

    document.getElementById("characterEditArea").style.display = "block";
    document.getElementById("characterListArea").style.display = "none";
    document.getElementById("createBtn").style.display = "inline";
    document.getElementById("updateBtn").style.display = "none"
}

function onUpdateBtnClicked(id) {
    if (!editValidateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var character = modelUpdatecharacter(
        id,
        form.userName.value,
        form.userRace.value,
        form.userClass.value,
        form.genderMaleRadio.checked,
        form.rightHanded.checked,
        form.level.value,
        form.strength.value,
        form.dexterity.value,
        form.intelligence.value,
        form.luck.value
    );

    if (!character) {
        alert("Unable to update character ID=" + id);
        return;
    }
    //Updates the row
    var tr = document.getElementById("row" + id);
    tr.childNodes[0].innerText = character.charName
    tr.childNodes[1].innerText = character.charRace
    tr.childNodes[2].innerText = character.charClass
    tr.childNodes[3].innerText = character.male? "Male" : "Female"
    tr.childNodes[4].innerText = character.level

    clearInputForm();
}

function onEditBtnClicked(id) {
    //Fetches the character from the id list.
    var character = modelGetCharacter(id);
    if (!character) {
        alert("Unable to find ID = " + id)
    }
    //Sets the form's Title.
    document.getElementById("formTitle").innerText = "Edit New Character";

    //Populates the form controls.
    var form = document.forms["editForm"]
    form.firstNameEdit.value = character.charName


    if (character.male) {
        form.gender[0].checked = true;
    } else {
        form.gender[1].checked = true;
    }

    for (var race in form.userRace.options) {
        var option = form.userRace.options[race];
        if (option.value === character.charRace) {
            option.selected = true;
        }
    }

    for (var editClass in form.userClass.options) {
        var option = form.userClass.options[editClass];
        if (option.value === character.charClass) {
            option.selected = true;
        }
    }

    form.rightHanded.checked = character.rightHanded;
    form.level.value = character.level
    form.strength.value = character.strength
    form.dexterity.value = character.dexterity
    form.intelligence.value = character.intelligence
    form.luck.value = character.luck

    //Show the form, hide the contact list
    document.getElementById("characterEditArea").style.display = "block";
    document.getElementById("characterListArea").style.display = "none";
    document.getElementById("createBtn").style.display = "none";

    var updateBtn = document.getElementById("updateBtn");
    updateBtn.style.display = 'inline';
    updateBtn.onclick = function() {
        onUpdateBtnClicked(character.id);
    }
}

function onDeleteBtnClicked(id) {
    var character = modelGetCharacter(id);
    if (!character) {
        alert("Unable to find character ID= " + id)
        return;
    }

    if (!confirm("Are you sure you want to delete " +
        character.charName + "?")) {
            return;
    }

    modelDeletecharacter(id);

    var tr = document.getElementById("row" + id);
    tr.remove();
}



function addTableItem(character) {
    var table = document.getElementById("characterTable")

    var row = table.insertRow(table.rows.length);
    row.id ="row" + character.id;

    var cell = row.insertCell(0);
    cell.innerText = character.charName;

    var cell = row.insertCell(1);
    cell.innerText = character.charRace;

    var cell = row.insertCell(2);
    cell.innerText = character.charClass;

    var cell = row.insertCell(3);
    cell.innerText = character.male? "Male" : "Female";

    var cell = row.insertCell(4);
    cell.innerText = character.level;
    
    var editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.id = "editBtn"
    editBtn.innerText = "Edit";
    editBtn.onclick = function() {
        onEditBtnClicked(character.id);
    }

    var cell = row.insertCell(5);
    cell.appendChild(editBtn)

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function() {
        onDeleteBtnClicked(character.id);
    }

    var cell = row.insertCell(6);
    cell.appendChild(deleteBtn)
    
}

function validateControls() {
    var form = document.forms["editForm"];
    var isValidated = true;

    if (form.userName.value === "") {
        document.getElementById("userNameError").innerText = "*Character name is required.";
        isValidated = false;

    } else {
        document.getElementById("userNameError").innerText = "";
    }

    if (!form.genderMaleRadio.checked && !form.genderFemaleRadio.checked) {
        document.getElementById("genderError").innerText = "*Gender not given.";
        isValidated = false;
    } else {
        document.getElementById("genderError").innerText = "";
    }

    if (document.getElementById("reRoll").innerHTML !== "Re-Roll") {
        document.getElementById("confirmBtnError").innerText = "*Please roll your stats.";
        isValidated = false;
    }
    else if (!form.confirmBtn.checked) {
        document.getElementById("confirmBtnError").innerText = "*Please confirm your stats.";
        isValidated = false;
    } else {
        document.getElementById("confirmBtnError").innerText = "";
    }

    return isValidated;
}

function clearInputForm() {
    //Hide the form, show the contact list.
    document.getElementById("characterEditArea").style.display = "none";
    document.getElementById("characterListArea").style.display = "block";

    //Clear out all the controls on the form.
    var form = document.forms["editForm"];

    form.userName.value = "";
    document.getElementById("userNameError").innerText = "";

    form.genderMaleRadio.checked = false;
    form.genderFemaleRadio.checked = false;
    document.getElementById("genderError").innerText = "";

    form.rightHanded.checked = false;

    //Clears out stat area
    form.level.value = ""
    document.getElementById("level").innerText = "";

    form.strength.value = ""
    document.getElementById("strength").innerText = "";

    form.dexterity.value = ""
    document.getElementById("dexterity").innerText = "";

    form.intelligence.value = ""
    document.getElementById("intelligence").innerText = "";

    form.luck.value = ""
    document.getElementById("luck").innerText = "";

    document.getElementById("confirmBtn").checked = false;

    document.getElementById("reRoll").innerHTML = "Roll"

    document.getElementById("confirmBtnError").innerText = "";
}

//Generates random number for the stats
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function editValidateControls() {
    var form = document.forms["editForm"];
    var isValidated = true;

    if (form.userName.value === "") {
        document.getElementById("userNameError").innerText = "*Character name is required.";
        isValidated = false;

    } else {
        document.getElementById("userNameError").innerText = "";
    }

    if (!form.genderMaleRadio.checked && !form.genderFemaleRadio.checked) {
        document.getElementById("genderError").innerText = "*Gender not given.";
        isValidated = false;
    } else {
        document.getElementById("genderError").innerText = "";
    }

    if (!form.confirmBtn.checked) {
        document.getElementById("confirmBtnError").innerText = "*Please confirm your stats.";
        isValidated = false;
    } else {
        document.getElementById("confirmBtnError").innerText = "";
    }

    return isValidated;
}