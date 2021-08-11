/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

function AddContact() {
  let contactName = document.getElementById("contactName");
  let contactEmail = document.getElementById("contactEmail");
  let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/addContact", "POST", {
    name: contactName.value,
    email: contactEmail.value
  },
    {
      "Content-Type": "application/json"
    }
  );
  fetchHandler.fetchData()
    .then((res) => {
      if (res.status != 200 && res.status != 201) {
        throw new Error("there is some err");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let element = data.userData.contact;
      let msgBox = document.getElementById("msgBox");
      let ui = new UI();
      msgBox.innerHTML += ui.getIndividual(element);
    })
    .catch((err) => {
      console.log(err);
    })
}
async function createGroup() {
  let members = [];
  let memberBox = document.getElementById("members");
  for (let i = 0; i < memberBox.children.length; i++) {
    const element = memberBox.children[i];
    console.log(element.children[0].getAttribute("data-label"))
    if (element.children[0].checked) {
      members.push({
        memberId: element.children[0].getAttribute("data-label")
      })
    }
  }
  console.log(members);
  console.log(document.getElementById("groupName").value)
  let formData = new FormData(document.getElementById("createGroup"));
  formData.append("members", JSON.stringify(members));
  let res = await fetch("https://chatappbackend12345.herokuapp.com/createGroup", {
    method: "POST",
    body: formData,
    credentials: "include"
  })
  let data = await res.json();
  console.log(data);
  document.getElementById("msgBox").innerHTML += `<a href="#"
  class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
  aria-current="true">
  <div class="userImage w-25 rounded-circle">
    <img class="rounded-circle" src=${data.groupDoc.groupIcon} alt="user image" width="50px" height="50px">
  </div>
  <div class="userData w-75">
    <div class="d-flex w-100 align-items-center justify-content-between">
      <strong class="mb-1">${data.groupDoc.groupName}</strong>
      <small>Wed</small>
    </div>
    <div class="col-10 mb-1 small">${data.groupDoc.groupDesc}</div>
  </div>
</a>`
}

function sendMessageGrp() {
  let msg;
  let chattype = this.getAttribute("data-type");
  msg = document.getElementById("msg").value;
  let creatorId = document.getElementById("recipient").getAttribute("data-email")
  let groupName = document.getElementById("recipient").getAttribute("data-group");
  let formdata = new FormData();
  console.log(document.getElementById("upload-file"));
  if (chattype == "file") {
    msg = "dummy data";
    formdata = new FormData(document.getElementById("chatDocsGrp"));
  }
  else {
    formdata.append("msg", msg);
  }
  formdata.append("creatorId", creatorId);
  formdata.append("groupName", groupName);
  if (!msg) {
    return alert("you have to enter a msg , you can't send a null msg");
  }
  fetch("https://chatappbackend12345.herokuapp.com/sendGrpMessage", {
    method: "POST",
    body: formdata,
    credentials: "include",
    headers: {}
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      // let chatBox = document.getElementById("chatBox");
      // chatBox.innerHTML = new UI().getChatOnGoGrp(data.msg,data.chatType,data.chatTime,data.chatId,"blue","end");
    })
    .catch((err) => {
      console.log(err);
    })
}

function displayGroupBox() {
  let btn = this;
  console.log(btn.getAttribute("data-label"));
  let groupData = JSON.parse(btn.getAttribute("data-label"));
  let Ui = new UI();
  let msgBox = document.getElementById("msgAreaBox");
  msgBox.innerHTML = Ui.getGroupBox(groupData);
  let sendMsgGrp = document.getElementsByClassName("sendMsgGrp");
  for (let i = 0; i < sendMsgGrp.length; i++) {
    const element = sendMsgGrp[i];
    element.addEventListener("click", sendMessageGrp);
  }
  $("#msg").emojioneArea({
    pickerPosition: 'top'
  })
  let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/displayGrpMessages", "POST", {
    groupName: groupData.groupName,
    creatorId: groupData.creatorId
  }, {
    "Content-Type": "application/json"
  });
  fetchHandler.fetchData()
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let chatData = data.chats.map((chat) => {
        chat = chat.chatId;
        return chat;
      })
      let chatBox = document.getElementById("chatBox");
      chatBox.innerHTML = Ui.getGrpChatBox(chatData, btn.getAttribute("data-id"));
      let emoji = document.getElementsByClassName("emojionearea-button-open")[0];
      console.log(emoji);
      emoji.innerHTML = `<i class="fas fa-smile-beam float-end fa-lg"></i>`
      let download = document.getElementsByClassName("down");
        for (let i = 0; i < download.length; i++) {
          const element = download[i];
          element.addEventListener("click",downloadNow);
        }
    })
    .catch((err) => {
      console.log(err);
    })
}

function DisplayMsgBox() {
  let btn = this;
  console.log(btn.getAttribute("data-label"));
  let userData = JSON.parse(btn.getAttribute("data-label"));
  let Ui = new UI();
  let msgBox = document.getElementById("msgAreaBox");
  msgBox.innerHTML = Ui.getMsgBox(userData);
  $("#msg").emojioneArea({
    pickerPosition: 'top'
  })
  let emoji = document.getElementsByClassName("emojionearea-button-open")[0];
  emoji.innerHTML = `<i class="fas fa-smile-beam float-end fa-lg position-absolute end-1"></i>`
  let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/displayMessages", "POST", {
    currentId: userData._id
  }, {
    "Content-Type": "application/json"
  });
  fetchHandler.fetchData()
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let chatBox = document.getElementById("chatBox");
      chatBox.innerHTML = Ui.getChatBox(data.chats, userData._id);
      let download = document.getElementsByClassName("down");
      for (let i = 0; i < download.length; i++) {
        const element = download[i];
        console.log("hi");
        element.addEventListener("click", downloadNow);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function sendMessage() {
  console.log("hi i am in there")
  let chattype = this.getAttribute("data-type");
  let msg;
  msg = document.getElementById("msg").value;
  let recipient = document.getElementById("recipient").getAttribute("data-email");
  let formdata = new FormData();
  console.log(document.getElementById("upload-file"));
  if (chattype == "file") {
    msg = "dummy data";
    formdata = new FormData(document.getElementById("chatDocs"));
  }
  else {
    formdata.append("msg", msg);
  }
  formdata.append("recipientEmail", recipient);
  if (!msg) {
    return alert("you have to enter a msg , you can't send a null msg");
  }
  fetch("https://chatappbackend12345.herokuapp.com/sendMessage", {
    method: "POST",
    body: formdata,
    credentials: "include",
    headers: {}
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let subMsgBox = document.getElementById("subMsgBox");
      subMsgBox.innerHTML += new UI().getChatOnGo(data.chat, data.chatType, data.chatTime, data.chatId, "blue", "end");
      // add media to attachments
      let download = document.getElementsByClassName("down");
      for (let i = 0; i < download.length; i++) {
        const element = download[i];
        console.log("hi");
        element.addEventListener("click", downloadNow);
      }
      try {
        if (data.chatType == "File") {
          let mediaFile = data.chat.split("-");
          let attachmentsId = document.getElementById("attachments");
          attachmentsId.innerHTML += `<div class="accordion-body bg-theme-color"><div class="container w-100 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
    <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
    <i class="fas fa-download fa-lg cp down" data-chatId='${data.chatId}' data-image='${mediaFile[mediaFile.length - 1]}'></i>
    <div class="container w-50 text-center">${mediaFile[mediaFile.length - 1]}</div>
    <i class="fas fa-file fa-lg"></i>
  </div>
  </div></div>`;
        }
      } catch (error) {

      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function downloadNow() {
  let btn = this;
  console.log("i am in there!");
  let chatId = btn.getAttribute("data-chatId");
  console.log(chatId);
  // let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/downloadNow","POST",{
  //   chatId:chatId
  // },{
  //   "Content-Type":"application/json"
  // })
  // fetchHandler.fetchData()
  fetch("https://chatappbackend12345.herokuapp.com/downloadNow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatId: chatId
    }),
    credentials: "include"
  })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = new Date(Date.now()).toISOString() + btn.getAttribute("data-image");
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    })
    .catch((err) => {
      console.log(err);
    })
}

// function connectToNewUser(userId, stream,myPeer) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }

// function addVideoStream(video, stream, videoGrid) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   videoGrid.append(video)
// }


// function makeCall(btn) {
//   let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/makeCall", "POST", {
//     callTo: btn.getAttribute("data-email")
//   }, {
//     "Content-Type": "application/json"
//   })
//   fetchHandler.fetchData()
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       let myVideo = document.createElement("video");
//       myVideo.muted = true;
//       let videoGrid = document.getElementById("video-grid");
//       videoGrid.innerHTML = "";
//       navigator.mediaDevices.getUserMedia({
//         video:true,
//         audio:true
//     })
//     .then((stream) => {
//       addVideoStream(myVideo,stream,videoGrid);
//       // start Call
//       peer.on('call', call => {
//         call.answer(stream)
//         const video = document.createElement('video')
//         call.on('stream', userVideoStream => {
//           addVideoStream(video, userVideoStream,videoGrid)
//         })
//       })
//       iocon.on('user-connected', userId => {
//         connectToNewUser(userId, stream,peer)
//       })
//     })
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

//search functionality

function searchChat() {
  let inp = this;
  let searchChat = this.getAttribute("data-search");
  let searchField = inp.value;
  let url = "https://chatappbackend12345.herokuapp.com/searchChat";
  if (searchType) {
    url = "https://chatappbackend12345.herokuapp.com/searchGrp"
  }
  let fetchHandler = new Fetching(url, "POST", {
    searchField: searchField
  }, {
    "Content-Type": "application/json"
  })
  fetchHandler.fetchData()
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let middle = document.getElementById("msgBox");
      if (searchType) {
        middle.innerHTML = new UI().getGroupsName(data.userData);
      }
      else {
        middle.innerHTML = new UI().getChatContacts(data.userData);
      }
    })
}

function editUser() {
  let pagename = this.getAttribute("data-page");
  // let formData = {
  //   name:"hello",
  //   status:"i am busy!"
  // };
  // let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/editUser", "POST", formData,{
  //   "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"
  // });
  // fetchHandler.fetchData()
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     let ui = new UI();
  //     let middle = document.getElementsByClassName("middle")[0];
  //     middle.innerHTML = ui.getProfile(data.userData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  let editForm = document.getElementById("editForm");
  let form_data = new FormData(editForm);
  fetch("https://chatappbackend12345.herokuapp.com/editUser", {
    method: "POST",
    body: form_data,
    credentials: "include",
    headers: {}
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let ui = new UI();
      let middle = document.getElementsByClassName("middle")[0];

      if (pagename == "settings") {
        middle.innerHTML = ui.getSettings(data.userData);
      }
      else {
        middle.innerHTML = ui.getProfile(data.userData);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function accBtnClick(index) {
  let element = this;
  element.style.backgroundColor = "rgb(0,48,90)";
  element.style.boxShadow = "none";
}
// let UIs = [`<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
// <h3 class="fw-bold d-flex justify-content-start p-4">Profile</h3>
// <div class="container">
//   <i class="fas fa-ellipsis-v d-flex justify-content-end p-4"></i>
// </div>
// </div>
// <div class="container d-flex justify-content-evenly align-items-center flex-column h-25 mb-4">
// <img src="../images/cricketBat.jfif" alt="" class="rounded-circle" width="90px" height="90px">
// <div class="container username text-center fw-bold">
//   UserName
// </div>
// <div class="container d-flex justify-content-center align-items-center w-25">
//   <i class="fas fa-dot-circle online fa-xs"></i>
//   <div class="container">Active</div>
// </div>
// </div>
// <div class="container h-25">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eum inventore modi magni animi qui. Repellendus, vitae molestias labore voluptas voluptates magnam unde rem
// </div>
// <div class="accordion accordion-flush w-75" id="accordionFlushExample">
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingOne">
//     <button onclick="accBtnClick(1)" class="accordion-button collapsed bg-theme-color text-light border-start border-end border-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//       About
//     </button>
//   </h2>
//   <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
//   </div>
// </div>
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingTwo">
//     <button onclick="accBtnClick(2)" class="accordion-button collapsed bg-theme-color text-light border-start border-end border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
//       Attachments
//     </button>
//   </h2>
//   <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
//   </div>
// </div>
// </div>`,
//   `<a href="/"
//   class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom text-light w-100">
//   <img src="../images/logo.jpg" alt="logo" height="40px" width="40px">&nbsp;&nbsp;
//   <span class="fs-2 fw-semibold">Chats</span>
// </a>
// <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100">
//   <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Users Or Messages"
//     aria-label="Search">
//   <i class="fas fa-search position-absolute"></i>
// </form>
// <div class="list-group list-group-flush border-bottom scrollarea w-100 position-relative" id="msgBox">
//   <h3 class="text-light fs-5 p-2 border-top d-flex align-items-center position-sticky">Recent Chats</h2>
//     <a href="#"
//       class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
//     <a href="#"
//       class="list-group-item list-group-item-action py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
//       aria-current="true">
//       <div class="userImage w-25 rounded-circle">
//         <img class="rounded-circle" src="../images/cricketBat.jfif" alt="user image" width="50px" height="50px">
//       </div>
//       <div class="userData w-75">
//         <div class="d-flex w-100 align-items-center justify-content-between">
//           <strong class="mb-1">Dummy User</strong>
//           <small>Wed</small>
//         </div>
//         <div class="col-10 mb-1 small">Lorem ipsum dolor sit amet.</div>
//       </div>
//     </a>
// </div>`,
//   `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
// <h3 class="fw-bold d-flex justify-content-start p-4">Groups</h3>
// <div class="container">
//   <i class="fas fa-users fa-lg d-flex justify-content-end p-4"></i>
// </div>
// </div>
// <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100 h-10">
// <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Groups"
//   aria-label="Search">
// <i class="fas fa-search position-absolute"></i>
// </form>`,
//   `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
// <h3 class="fw-bold d-flex justify-content-start p-4">Contacts</h3>
// <div class="container">
//   <i class="fas fa-user-plus fa-lg d-flex justify-content-end p-4"></i>
// </div>
// </div>
// <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100 h-10">
// <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Groups"
//   aria-label="Search">
// <i class="fas fa-search position-absolute"></i>
// </form>`
//   ,
//   `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
// <h3 class="fw-bold d-flex justify-content-start p-4">Settings</h3>
// <div class="container">
//   <i class="fas fa-ellipsis-v d-flex justify-content-end p-4"></i>
// </div>
// </div>
// <div class="container d-flex justify-content-evenly align-items-center flex-column h-25 mb-4">
// <img src="../images/cricketBat.jfif" alt="" class="rounded-circle" width="90px" height="90px">
// <div class="container username text-center fw-bold">
//   UserName
// </div>
// <div class="container d-flex justify-content-center align-items-center w-25">
//   <i class="fas fa-dot-circle online fa-xs"></i>
//   <div class="container">Active</div>
// </div>
// </div>
// <div class="accordion accordion-flush w-75" id="accordionFlushExample">
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingOne">
//     <button onclick="accBtnClick(1)" class="accordion-button collapsed bg-theme-color text-light  border-top border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
//         Personal Info
//     </button>
//   </h2>
//   <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color text-light">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
//   </div>
// </div>
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingTwo">
//     <button onclick="accBtnClick(2)" class="accordion-button collapsed bg-theme-color text-light  border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
//       Privacy
//     </button>
//   </h2>
//   <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
//   </div>
// </div>
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingThree">
//     <button onclick="accBtnClick(3)" class="accordion-button collapsed bg-theme-color text-light   border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
//       Security
//     </button>
//   </h2>
//   <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color text-light">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
//   </div>
// </div>
// <div class="accordion-item">
//   <h2 class="accordion-header" id="flush-headingFour">
//     <button onclick="accBtnClick(4)" class="accordion-button collapsed bg-theme-color text-light  border-bottom border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
//       Help
//     </button>
//   </h2>
//   <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
//     <div class="accordion-body bg-theme-color text-light">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
//   </div>
// </div>
// </div>`
// ]