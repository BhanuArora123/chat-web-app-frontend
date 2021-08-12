const addContactLis = () => {
    let addContact = document.getElementById("addContact");
    addContact.addEventListener("click", AddContact);
}
const displayGrpLis = () => {
    let displayGrp = document.getElementsByClassName("displayGrp");
    for (let i = 0; i < displayGrp.length; i++) {
        const element = displayGrp[i];
        element.addEventListener("click", displayGroupBox);
    }
}

const createGrpLis = () => {
    let createGrp = document.getElementById("createGrp");
    createGrp.addEventListener("click", createGroup);
}

const searchLis = (grp) => {
    let searchIt = document.getElementById("searchBox");
    if (grp) {
        searchIt.setAttribute("data-search", "Grp");
    }
    searchIt.addEventListener("keyup", searchChat);
}

const accBtnLis = () => {
    let accBtn = document.querySelectorAll(".accordion-button")
    accBtn.forEach((element) => {
        element.addEventListener("click", accBtnClick);
    })
}

const displayMsgLis = () => {
    let displayMsg = document.getElementsByClassName("displayMsg");
    for (let i = 0; i < displayMsg.length; i++) {
        const element = displayMsg[i];
        element.addEventListener("click", DisplayMsgBox);
    };
}

const editUserLis = () => {
    let edituser = document.getElementById("editUser");
    edituser.addEventListener("click", editUser);
}

const sendGrpMsgLis = () => {
    let sendMsgGrp = document.getElementsByClassName("sendMsgGrp");
    for (let i = 0; i < sendMsgGrp.length; i++) {
        const element = sendMsgGrp[i];
        element.addEventListener("click", sendMessageGrp);
    }
}

const downloadLis = () => {
    let download = document.getElementsByClassName("down");
    for (let i = 0; i < download.length; i++) {
        const element = download[i];
        console.log("hi");
        element.addEventListener("click", downloadNow);
    }
}
const sendMsgLis = () => {
    let sendMsg = document.getElementsByClassName("sendMsg");
    for (let i = 0; i < sendMsg.length; i++) {
        const element = sendMsg[i];
        element.addEventListener("click", sendMessage);
    }
}