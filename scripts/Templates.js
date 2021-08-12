class Fetching {
  constructor(url, method = "GET", body = undefined, header = {},tokenVal) {
    this.url = url;
    this.method = method;
    this.body = body;
    this.header = {
      ...header,"Authorization":"Bearer "+tokenVal
    };
  }
  fetchData = async () => {
    let data;
    if (this.body) {
      data = await fetch(this.url, {
        method: this.method,
        headers: this.header,
        body: JSON.stringify(this.body),
        credentials: "include"
      }
      );
    }
    else {
      data = await fetch(this.url, {
        method: this.method,
        headers: this.header,
        body: this.body,
        credentials: "include"
      });
    }
    return data;
  }
};
class UI {
  getInit = (userData) => {
    let msgHandler = "";
    if(userData.contacts.length > 0){
      msgHandler = `<div class="container w-100 msgBars right-sidebar border-bottom d-flex justify-content-evenly align-items-center">
      <div class="container h-100 w-50 d-flex justify-content-evenly align-items-center">
        <img src=${userData.contacts[0].contactId.profilePic} alt="profilePic" width="50px" class="rounded-circle" height="50px">
        <div class="container username text-light text-center d-flex justify-content-start fw-bold fs-6" id="recipient" data-email="${userData.contacts[0].contactId.email}">${userData.contacts[0].contactId.name}
        </div>
      </div>
      <div class="container services w-50 d-flex justify-content-evenly align-items-center">
        <div class="container">
          <i class="fas fa-search fa-lg text-white"></i>
        </div>
        <div class="container">
          <i class="fas fa-user fa-lg text-white"></i>
        </div>
        <div class="container">
          <i class="fas fa-ellipsis-h fa-lg text-white"></i>
        </div>
      </div>
    </div>
    <div class="modal fade" id="xampleModal" tabindex="-1" aria-labelledby="xampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-main">
      <div class="modal-header bg-main">
        <h5 class="modal-title text-light" id="xampleModalLabel"> Calling ${userData.contacts[0].contactId.name}...</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body phoneBox bg-main">
      <div class="container w-75 h-100 d-flex justify-content-evenly flex-column align-items-center" id="video-grid">
          <img class="w-25 h-25 rounded-circle" src='${userData.contacts[0].contactId.profilePic}' alt="image">
          <div class="container d-flex justify-content-center text-light">${userData.contacts[0].contactId.name}</div>
          <div class="container w-100 d-flex justify-content-evenly align-items-center">
            <div class="container phoneCall d-flex justify-content-center align-items-center bg-danger">
              <i class="fas fa-phone fa-lg text-light"></i>
          </div>
          <div class="container phoneCall d-flex justify-content-center align-items-center">
              <i class="fas fa-phone fa-lg text-light"></i>
          </div>
          </div>
      </div>
      </div>
      <div class="modal-footer bg-main">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    <div class="container content msgBox scrollarea" id="chatBox">
    </div>
    <div
      class="container msgBars border-top right-sidebar bottom-0 d-flex justify-content-evenly align-items-center pe-3">
      <form class="d-flex search-bar justify-content-center align-items-center h-100 w-65 ms-3">
        <input class="form-control me-2 h-50 enterMsg" type="search" placeholder="Enter Message" aria-label="Search" id="msg">
      </form>
      <div class="container msgIcon" >
        <i class="fas fa-paperclip text-white" data-bs-toggle="modal" data-bs-target="#uploadFile"></i>
      </div>
      <button type="button" class="btn deliver h-50 w-15 d-flex justify-content-center align-items-center sendMsg">
        <i class="fas fa-caret-square-right fa-lg text-white"></i>
      </button>
    </div>`
    }
    let FriendsChat = "";
    userData.contacts.forEach(element => {
      FriendsChat += `<a
        class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center displayMsg"
        aria-current="true" data-label='${JSON.stringify(element.contactId)}'>
        <div class="userImage w-25 rounded-circle position-relative">
          <img class="rounded-circle" src=${element.contactId.profilePic} alt="user image" width="50px" height="50px">
          <div id='${element.contactId._id.toString()}' class='${element.isActive == true ? "position-absolute rounded-circle isActive":"position-absolute rounded-circle isOffline"}'></div>
        </div>
        <div class="userData w-75">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${element.contactId.name}</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">${element.contactId.status}</div>
        </div>
      </a>`;
    });
    return `<div class="modal fade" id="uploadFile" tabindex="-1" aria-labelledby="uploadFileLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="uploadFileLabel">Upload File</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="chatDocs">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Choose File from Device <br> <br> (Only One File Can Be Uploaded at a time): <br> </label>
              <input type="file" class="form-control" id="upload-file" name="chatfile">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary sendMsg" data-type="file" data-bs-dismiss="modal">Send message</button>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-column flex-shrink-0 left-sidebar" style="width: 4.5rem;">
    <a href="/index" class="d-block p-3 link-dark text-decoration-none" title="Icon-only"
      data-bs-toggle="tooltip" data-bs-placement="right">
      <img src="../images/logo.jpg" alt="logo" height="40px" width="40px">
      <span class="visually-hidden">Icon-only</span>
    </a>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item cp" id="profile">
        <div class="nav-link py-3 cursor-pointer" aria-current="page" title="Profile" data-bs-toggle="tooltip"
          data-bs-placement="right" data-label="profile">
          <i class="fas fa-user fa-lg menu-item "></i>
        </div>
      </li>
      <li class="active-item cp">
        <div class="nav-link py-3 cursor-pointer" title="Chats" data-bs-toggle="tooltip" data-bs-placement="right" data-label="chats">
          <i class="fas fa-comment-dots fa-lg menu-item"></i>
        </div>
      </li>
      <li class="cp">
        <div class="nav-link py-3 cursor-pointer" title="Groups" data-bs-toggle="tooltip" data-bs-placement="right" data-label="groups">
          <i class="fas fa-users fa-lg menu-item"></i>
        </div>
      </li>
      <li class="cp">
        <div class="nav-link py-3 cursor-pointer" title="contacts" data-bs-toggle="tooltip" data-bs-placement="right" data-label="contacts">
          <i class="fas fa-id-card fa-lg menu-item"></i>
        </div>
      </li>
      <li class="cp">
        <div class="nav-link py-3 cursor-pointer" title="settings" data-bs-toggle="tooltip" data-bs-placement="right" data-label="settings">
          <i class="fas fa-cog fa-lg menu-item"></i>
        </div>
      </li>
      <li class="cp">
        <div class="nav-link py-3 cursor-pointer" title="Language" data-bs-toggle="tooltip" data-bs-placement="right" data-label="language">
          <i class="fas fa-globe fa-lg menu-item"></i>
        </div>
      </li>
      <li class="cp">
        <div class="nav-link py-3 cursor-pointer" title="Dark/Light Mode" data-bs-toggle="tooltip"
          data-bs-placement="right" data-label="dark">
          <i class="far fa-lightbulb fa-lg menu-item"></i>
        </div>
      </li>
    </ul>
    <div class="dropdown border-top">
      <a href="#"
        class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
        id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" class="rounded-circle">
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
  <div class="b-example-divider"></div>

  <div class="d-flex flex-column align-items-center flex-shrink-0 middle-sidebar text-light middle"
    style="width: 380px;">
    <a href="/"
      class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom text-light w-100">
      <img src="../images/logo.jpg" alt="logo" height="40px" width="40px">&nbsp;&nbsp;
      <span class="fs-2 fw-semibold">Chats</span>
    </a>
    <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100 h-10">
      <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Users Or Messages"
        aria-label="Search" id="searchBox" id="searchBox">
      <i class="fas fa-search position-absolute"></i>
    </form>
    <div class="list-group list-group-flush border-bottom scrollarea w-100" id="msgBox">
      <h3 class="text-light fs-5 p-2 border-top d-flex align-items-center">Recent Chats</h2>
        ${FriendsChat}
    </div>
  </div>
  <div class="b-example-divider"></div>
  <div class="container right-sidebar p-0 msgArea" id="msgAreaBox" data-email='${userData.email}'>
    ${msgHandler}
  </div>`
  }
  getProfile = (userData) => {
    let Attachments = "";
    userData.attachments.forEach(element => {
      let mediaFile = element.fileId.fileurl.split("-");
      let mediaBox = `<div class="container w-100 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
      <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
      <i class="fas fa-download fa-lg cp down"  data-chatId='${element.fileId.chatId}' data-image='${mediaFile[mediaFile.length - 1]}'></i>
      <div class="container w-50 text-center">${mediaFile[mediaFile.length - 1]}</div>
      <i class="fas fa-file fa-lg"></i>
    </div>
    </div>`
      Attachments += `<div class="accordion-body bg-theme-color">${mediaBox}</div>`;
    });
    return `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
        <h3 class="fw-bold d-flex justify-content-start p-4">Profile</h3>
        <div class="container">
        <div class="dropdown">
        <i class="fas fa-ellipsis-v d-flex justify-content-end p-4" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu bg-blue text-light" aria-labelledby="dropdownMenuButton1">
          <li><div class="dropdown-item btn text-light" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@getbootstrap">Edit</div>
          </li>
        </ul>
        <div class="modal fade text-dark" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="editForm">
                  <div class="mb-3">
                    <label for="Name" class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="Name" name="name" value="${userData.name}">
                  </div>
                  <div class="mb-3">
                    <label for="image" class="col-form-label">ProfilePic:</label>
                    <input type="file" class="form-control" name="image" id="Image">
                  </div>
                  <div class="mb-3">
                    <label for="Status" class="col-form-label">Status:</label>
                    <input type="text" class="form-control" name="status" id="status" value="${userData.status}">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="editUser" data-bs-dismiss="modal">Save Changes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        </div>
        <div class="container d-flex justify-content-evenly align-items-center flex-column h-25 mb-4">
        <img src=${userData.profilePic} ialt="" class="rounded-circle" width="90px" height="90px">
        <div class="container username text-center fw-bold text-capitalize">
          ${userData.name}
        </div>
        <div class="container d-flex justify-content-center align-items-center w-25">
          <i class="fas fa-dot-circle online fa-xs"></i>
          <div class="container">Active</div>
        </div>
        </div>
        <div class="container w-100 h-25 text-center">${userData.status}
        </div>
        <div class="accordion accordion-flush w-75" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed bg-theme-color text-light border-start border-end border-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              About
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body bg-theme-color">${userData.status}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed bg-theme-color text-light border-start border-end border-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Attachments
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse h-200px overflow-scroll bg-main" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="container w-100 h-300 bg-main" id="attachments">
                ${Attachments}
            </div>
          </div>
        </div>
        </div>`;
  }
  getChats = (userData) => {
    let FriendsChat = "";
    userData.contacts.forEach(element => {
      FriendsChat += `<a
        class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center displayMsg"
        aria-current="true" data-label='${JSON.stringify(element.contactId)}'>
        <div class="userImage w-25 rounded-circle position-relative">
          <img class="rounded-circle" src=${element.contactId.profilePic} alt="user image" width="50px" height="50px">
          <div id='${element.contactId._id.toString()}' class='${element.isActive == true ? "position-absolute rounded-circle isActive":"position-absolute rounded-circle isOffline"}'></div>
        </div>
        <div class="userData w-75">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${element.contactId.name}</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">${element.contactId.status}</div>
        </div>
      </a>`;
    });
    return `<a href="/"
        class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom text-light w-100">
        <img src="../images/logo.jpg" alt="logo" height="40px" width="40px">&nbsp;&nbsp;
        <span class="fs-2 fw-semibold">Chats</span>
      </a>
      <form class="d-flex search-bar justify-content-center align-items-center position-relative h-10 w-100">
        <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Users Or Messages"
          aria-label="Search" id="searchBox" id="searchBox">
        <i class="fas fa-search position-absolute"></i>
      </form>
      <div class="list-group list-group-flush border-bottom scrollarea w-100 position-relative" id="msgBox">
        <h3 class="text-light fs-5 p-2 border-top d-flex align-items-center position-sticky">Recent Chats</h2>
          ${FriendsChat}
      </div>`
  }
  getGroups = (userData) => {
    let contacts = "";
    userData.contacts.forEach(element => {
      contacts += `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="" data-label='${element.contactId._id}'>
      <label class="form-check-label" for="flexCheckDefault">
        ${element.contactId.name} &nbsp;&nbsp;(${element.contactId.email})
      </label>
    </div>`
    })
    let groups = ""; 
    userData.groups.forEach(element => {
      groups+= `<a href="#"
      class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center displayGrp"
      aria-current="true" data-id='${userData._id}' data-label='${JSON.stringify(element.groupId)}'>
      <div class="userImage w-25 rounded-circle">
        <img class="rounded-circle" src=${element.groupId.groupIcon} alt="user image" width="50px" height="50px">
      </div>
      <div class="userData w-75">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">${element.groupId.groupName}</strong>
          <small>Wed</small>
        </div>
        <div class="col-10 mb-1 small">${element.groupId.groupDesc}</div>
      </div>
    </a>`
    });
    
    return `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
    <h3 class="fw-bold d-flex justify-content-start p-4">Groups</h3>
    <div class="container">
      <i class="fas fa-users fa-lg d-flex justify-content-end p-4"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></i>
      <div class="modal fade text-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create a Group</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form enctype="multipart/formdata" id="createGroup">
          <div class="mb-3">
            <label for="groupName" class="col-form-label">Group Name:</label>
            <input type="text" class="form-control" id="groupName" name="groupName">
          </div>
          <div class="mb-3">
            <label for="groupIcon" class="col-form-label">Group Icon:</label>
            <input type="file" class="form-control" id="groupIcon" name="groupIcon">
          </div>
          <div class="mb-3">
            <label for="members" class="col-form-label">Members:</label>
            <div class="container" id="members">
              ${contacts}
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="createGrp" data-bs-dismiss="modal">Create Group</button>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
    <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100 h-10">
    <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Groups"
      aria-label="Search" id="searchBox">
    <i class="fas fa-search position-absolute"></i>
    </form>
    <div class="list-group list-group-flush border-bottom scrollarea w-100 position-relative" id="msgBox">
        ${groups}
    </div>`
  }
  getContact = (userData) => {
    let contacts = "";
    userData.contacts.forEach(element => {
      contacts+= `<a href="#"
      class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center displayMsg"
      aria-current="true" data-label='${JSON.stringify(element.contactId)}'>
      <div class="userImage w-25 rounded-circle position-relative">
        <img class="rounded-circle" src=${element.contactId.profilePic} alt="user image" width="50px" height="50px">
        <div id='${element.contactId._id.toString()}' class='${element.isActive == true ? "position-absolute rounded-circle isActive":"position-absolute rounded-circle isOffline"}'></div>
      </div>
      <div class="userData w-75">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">${element.contactId.name}</strong>
          <small>Wed</small>
        </div>
        <div class="col-10 mb-1 small">${element.contactId.status}</div>
      </div>
    </a>`
    });
    return `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
    <h3 class="fw-bold d-flex justify-content-start p-4">Contacts</h3>
    <div class="container">

      <i class="fas fa-user-plus fa-lg d-flex justify-content-end p-4"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></i>
      <div class="modal fade text-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="contactName">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Email:</label>
            <input type="email" class="form-control" id="contactEmail">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="addContact" data-bs-dismiss="modal" id="addContact">Add Contact</button>
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
    <form class="d-flex search-bar justify-content-center align-items-center position-relative w-100 h-10">
    <input class="form-control me-2 h-50 w-75" type="search" placeholder="Search Contacts"
      aria-label="Search" id="searchBox" id="searchBox">
    <i class="fas fa-search position-absolute"></i>
    </form>
    <div class="list-group list-group-flush border-bottom scrollarea w-100 position-relative text-capitalize" id="msgBox">
        ${contacts}
    </div>`
  }
  getSettings = (userData) => {
    return `<div class="container profileHead d-flex justify-content-between align-items-center w-100 p-0">
    <h3 class="fw-bold d-flex justify-content-start p-4">Settings</h3>
    <div class="dropdown">
        <i class="fas fa-ellipsis-v d-flex justify-content-end p-4" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu bg-blue text-light" aria-labelledby="dropdownMenuButton1">
          <li><div class="dropdown-item btn text-light" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@getbootstrap">Edit</div>
          </li>
        </ul>
        <div class="modal fade text-dark" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form id="editForm">
                  <div class="mb-3">
                    <label for="Name" class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="Name" name="name" value="${userData.name}">
                  </div>
                  <div class="mb-3">
                    <label for="image" class="col-form-label">ProfilePic:</label>
                    <input type="file" class="form-control" name="image" id="Image">
                  </div>
                  <div class="mb-3">
                    <label for="Status" class="col-form-label">Status:</label>
                    <input type="text" class="form-control" name="status" id="status" value="${userData.status}">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="editUser" data-page="settings" data-bs-dismiss="modal">Save Changes</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>
    <div class="container d-flex justify-content-evenly align-items-center flex-column h-25 mb-4">
    <img src=${userData.profilePic} alt="" class="rounded-circle" width="90px" height="90px">
    <div class="container username text-center fw-bold">
      ${userData.name}
    </div>
    <div class="container d-flex justify-content-center align-items-center w-25">
      <i class="fas fa-dot-circle online fa-xs"></i>
      <div class="container">Active</div>
    </div>
    </div>
    <div class="accordion accordion-flush w-75" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed bg-theme-color text-light  border-top border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Personal Info
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body bg-theme-color text-light">${userData.status}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button class="accordion-button collapsed bg-theme-color text-light  border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          Privacy
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body bg-theme-color">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button class="accordion-button collapsed bg-theme-color text-light   border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          Security
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body bg-theme-color text-light">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingFour">
        <button class="accordion-button collapsed bg-theme-color text-light  border-bottom border-start border-end" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
          Help
        </button>
      </h2>
      <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body bg-theme-color text-light">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
      </div>
    </div>
    </div>`
  }
  getIndividual = (element) => {
    return `<a href="#"
    class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
    aria-current="true">
    <div class="userImage w-25 rounded-circle">
      <img class="rounded-circle" src=${element.profilePic} alt="user image" width="50px" height="50px">
    </div>
    <div class="userData w-75">
      <div class="d-flex w-100 align-items-center justify-content-between">
        <strong class="mb-1 text-capitalize">${element.name}</strong>
        <small>Wed</small>
      </div>
      <div class="col-10 mb-1 small">${element.status}</div>
    </div>
  </a>`
  }
  getMsgBox = (userData) => {
    return `<div class="container w-100 msgBars right-sidebar border-bottom d-flex justify-content-evenly align-items-center">
    <div class="container h-100 w-50 d-flex justify-content-evenly align-items-center">
      <img src=${userData.profilePic} alt="profilePic" width="50px" class="rounded-circle" height="50px">
      <div class="container username text-light text-center d-flex justify-content-start fw-bold fs-6" id="recipient" data-email="${userData.email}">${userData.name}
      </div>
    </div>
    <div class="container services w-50 d-flex justify-content-evenly align-items-center">
      <div class="container">
        <i class="fas fa-search fa-lg text-white"></i>
      </div>
      <div class="container">
        <i class="fas fa-user fa-lg text-white"></i>
      </div>
      <div class="container">
        <i class="fas fa-ellipsis-h fa-lg text-white"></i>
      </div>
    </div>
  </div>
  <div class="modal fade" id="xampleModal" tabindex="-1" aria-labelledby="xampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content bg-main">
      <div class="modal-header bg-main">
        <h5 class="modal-title text-light" id="xampleModalLabel">Calling ${userData.name} ...</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body phoneBox bg-main">
      <div class="container w-75 h-100 d-flex justify-content-evenly flex-column align-items-center" id="video-grid">
          <img class="w-25 h-25 rounded-circle" src='${userData.profilePic}' alt="image">
          <div class="container d-flex justify-content-center text-light">${userData.name}</div>
          <div class="container w-100 d-flex justify-content-evenly align-items-center">
            <div class="container phoneCall d-flex justify-content-center align-items-center bg-danger">
              <i class="fas fa-phone fa-lg text-light"></i>
          </div>
          <div class="container phoneCall d-flex justify-content-center align-items-center">
              <i class="fas fa-phone fa-lg text-light"></i>
          </div>
          </div>
      </div>
      </div>
      <div class="modal-footer bg-main">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  <div class="container content msgBox scrollarea" id="chatBox">
    </div>
  <div
    class="container msgBars border-top right-sidebar bottom-0 d-flex justify-content-evenly align-items-center pe-3">
    <form class="d-flex search-bar justify-content-center align-items-center h-100 w-65 ms-3 position-relative">
      <input class="form-control me-2 h-50 enterMsg" type="search" placeholder="Enter Message" aria-label="Search" id="msg">
    </form>
    <div class="container msgIcon">
    <i class="fas fa-paperclip text-white" data-bs-toggle="modal" data-bs-target="#uploadFile" data-bs-whatever="@mdo"></i>
    </div>
    <button type="button" class="btn deliver h-50 w-15 d-flex justify-content-center align-items-center sendMsg" >
      <i class="fas fa-caret-square-right fa-lg text-white"></i>
    </button>
  </div>`
  }

  getGroupBox = (groupData) => {
    return `<div class="container w-100 msgBars right-sidebar border-bottom d-flex justify-content-evenly align-items-center">
    <div class="container h-100 w-50 d-flex justify-content-evenly align-items-center">
      <img src=${groupData.groupIcon} alt="profilePic" width="50px" class="rounded-circle" height="50px">
      <div class="container username text-light text-center d-flex justify-content-start fw-bold fs-6" id="recipient" data-group="${groupData.groupName}" data-email="${groupData.creatorId}">${groupData.groupName}
      </div>
    </div>
    <div class="container services w-50 d-flex justify-content-evenly align-items-center">
      <div class="container">
        <i class="fas fa-search fa-lg text-white"></i>
      </div>
      <div class="container">
        <i class="fas fa-user fa-lg text-white"></i>
      </div>
      <div class="container">
        <i class="fas fa-ellipsis-h fa-lg text-white"></i>
      </div>
    </div>
  </div>
  <div class="container content msgBox scrollarea" id="chatBox">
    </div>
  <div
    class="container msgBars border-top right-sidebar bottom-0 d-flex justify-content-evenly align-items-center pe-3">
    <form class="d-flex search-bar justify-content-center align-items-center h-100 w-65 ms-3">
      <input class="form-control me-2 h-50 enterMsg" type="search" placeholder="Enter Message" aria-label="Search" id="msg">
    </form>
    <div class="container msgIcon">
    <i class="fas fa-paperclip text-white" data-bs-toggle="modal" data-bs-target="#grpUploadFile" data-bs-whatever="@mdo"></i>
    </div>
    <button type="button" class="btn deliver h-50 w-15 d-flex justify-content-center align-items-center sendMsgGrp">
      <i class="fas fa-caret-square-right fa-lg text-white"></i>
    </button>
  </div>
  <div class="modal fade" id="grpUploadFile" tabindex="-1" aria-labelledby="grpUploadFileLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="grpUploadFileLabel">Upload File</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="chatDocsGrp">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Choose File from Device <br> <br> (Only One File Can Be Uploaded at a time): <br> </label>
              <input type="file" class="form-control" id="upload-file" name="chatfile">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary sendMsgGrp" data-type="file" data-bs-dismiss="modal">Send message</button>
        </div>
      </div>
    </div>
  </div>`
  }

  getChatBox = (messages,userId) => {
    let chats = "";
    messages.forEach((element) => {
      if(element.sentBy.toString() == userId.toString() && element.chatType == "Text"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-start p-0 mb-2 mt-3"><div class="container bg-purple w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100">${element.chatContent}</div><div class="w-100 text-end fs-13 he-20">${element.chatTime}</div></div></div>`
      }
      else if(element.sentBy.toString() == userId.toString() && element.chatType == "File"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-start p-0 mb-2 mt-3"><div class="container bg-purple w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
        <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
        <i class="fas fa-download fa-lg cp down" data-chatId='${element._id}' data-image='${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}'></i>
        <div class="container w-50 text-center">${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}</div>
        <i class="fas fa-file fa-lg"></i>
      </div>
      <div class="w-100 text-end fs-13 he-20 mb-2">${element.chatTime}</div>
      </div></div>`
      }
      else if(element.sentBy.toString() != userId.toString() && element.chatType == "File"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-end p-0 mb-2 mt-3"><div class="container bg-blue w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
        <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
        <i class="fas fa-download fa-lg cp down" data-chatId='${element._id}' data-image='${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}'></i>
        <div class="container w-50 text-center">${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}</div>
        <i class="fas fa-file fa-lg"></i>
      </div>
      <div class="w-100 text-end fs-13 he-20 mb-2">${element.chatTime}</div>
      </div></div>`
      }
      else{
        chats += `<div class="container h-100 w-100 d-flex justify-content-end p-0 mb-2 mt-3"><div class="container bg-blue w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100">${element.chatContent}</div><div class="w-100 text-end fs-13 he-20">${element.chatTime}</div></div></div>`
      }
    })
    return `<div class="container h-200 w-100 d-flex p-0 m-0 flex-column justify-content-evenly text-white" id="subMsgBox">
      ${chats}
    </div>`;
  }
  getChatOnGo = (message,chatType,chatTime,chatId,color,pos) => {
    return chatType == "Text" ? `<div class="container h-100 w-100 d-flex justify-content-${pos} p-0 mb-2 mt-3"><div class="container bg-${color} w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100">${message}</div><div class="w-100 text-end fs-13 he-20">${chatTime}</div></div></div>`:`<div class="container h-100 w-100 d-flex justify-content-${pos} p-0 mb-2 mt-3"><div class="container bg-${color} w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
    <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
    <i class="fas fa-download fa-lg cp down" data-chatId='${chatId}' data-image='${message.split("-")[message.split("-").length - 1]}'></i>
    <div class="container w-50 text-center">${message.split("-")[message.split("-").length - 1]}</div>
    <i class="fas fa-file fa-lg"></i>
  </div>
  <div class="w-100 text-end fs-13 he-20 mb-2">${chatTime}</div>
  </div></div>`;
  }
  getGrpChatBox = (messages,userId) => {
    let chats = "";
    messages.forEach((element) => {
      if(element.sentBy.toString() == userId.toString() && element.chatType == "Text"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-end p-0 mb-2 mt-3"><div class="container bg-blue w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100 fw-bold text-capitalize">${element.name}</div><hr><div class="w-100">${element.chatContent}</div><div class="w-100 text-end fs-13 he-20">${element.chatTime}</div></div></div>`
      }
      else if(element.sentBy.toString() == userId.toString() && element.chatType == "File"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-end p-0 mb-2 mt-3"><div class="container bg-blue w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
        <div class="w-100 fw-bold text-capitalize">${element.name}</div>
        <hr>
        <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
        <i class="fas fa-download fa-lg cp down" data-chatId='${element._id}' data-image='${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}'></i>
        <div class="container w-50 text-center">${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}</div>
        <i class="fas fa-file fa-lg"></i>
      </div>
      <div class="w-100 text-end fs-13 he-20 mb-2">${element.chatTime}</div>
      </div></div>`
      }
      else if(element.sentBy.toString() != userId.toString() && element.chatType == "File"){
        chats+=`<div class="container h-100 w-100 d-flex justify-content-start p-0 mb-2 mt-3"><div class="container bg-purple w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
        <div class="w-100 fw-bold text-capitalize">${element.name}</div>
        <hr>
        <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
        <i class="fas fa-download fa-lg cp down" data-chatId='${element._id}' data-image='${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}'></i>
        <div class="container w-50 text-center">${element.chatContent.split("-")[element.chatContent.split("-").length - 1]}</div>
        <i class="fas fa-file fa-lg"></i>
      </div>
      <div class="w-100 text-end fs-13 he-20 mb-2">${element.chatTime}</div>
      </div></div>`
      }
      else{
        chats += `<div class="container h-100 w-100 d-flex justify-content-start p-0 mb-2 mt-3"><div class="container bg-purple w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100 fw-bold text-capitalize">${element.name}</div><hr><div class="w-100">${element.chatContent}</div><div class="w-100 text-end fs-13 he-20">${element.chatTime}</div></div></div>`
      }
    })
    return `<div class="container h-200 w-100 d-flex p-0 m-0 flex-column justify-content-evenly text-white" id="subMsgBox">
      ${chats}
    </div>`;
  }
  getChatOnGoGrp = (message,chatType,chatTime,chatId,color,pos,name,email) => {
    return chatType == "Text" ? `<div class="container h-100 w-100 d-flex justify-content-${pos} p-0 mb-2 mt-3"><div class="container bg-${color} w-75 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between"><div class="w-100">${name}</div><hr><div class="w-100">${message}</div><div class="w-100 text-end fs-13 he-20">${chatTime}</div></div></div>`:`<div class="container h-100 w-100 d-flex justify-content-${pos} p-0 mb-2 mt-3"><div class="container bg-${color} w-50 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0"><div class="w-100">${name}</div><hr>
    <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
    <i class="fas fa-download fa-lg cp down" data-chatId='${chatId}' data-image='${message.split("-")[message.split("-").length - 1]}'></i>
    <div class="container w-50 text-center">${message.split("-")[message.split("-").length - 1]}</div>
    <i class="fas fa-file fa-lg"></i>
  </div>
  <div class="w-100 text-end fs-13 he-20 mb-2">${chatTime}</div>
  </div></div>`;
  }
  getChatContacts = (userData) => {
    let FriendsChat = "";
    userData.contacts.forEach(element => {
      FriendsChat += `<a
        class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center displayMsg"
        aria-current="true" data-label='${JSON.stringify(element.contactId)}' >
        <div class="userImage w-25 rounded-circle position-relative">
          <img class="rounded-circle" src=${element.contactId.profilePic} alt="user image" width="50px" height="50px">
          <div id='${element.contactId._id.toString()}' class='${element.isActive == true ? "position-absolute rounded-circle isActive":"position-absolute rounded-circle isOffline"}'></div>
        </div>
        <div class="userData w-75">
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${element.contactId.name}</strong>
            <small>Wed</small>
          </div>
          <div class="col-10 mb-1 small">${element.contactId.status}</div>
        </div>
      </a>`;
    });
    return `<h3 class="text-light fs-5 p-2 border-top d-flex align-items-center position-sticky">Recent Chats</h2>
          ${FriendsChat}`
  }
  getGroupsName = (userData) => {
    let groups = ""; 
    userData.groups.forEach(element => {
      groups+= `<a href="#"
      class="list-group-item list-group-item-action active py-3 lh-tight middle-sidebar text-light d-flex justify-content-evenly align-items-center"
      aria-current="true"  data-id='${userData._id}' data-label='${JSON.stringify(element.groupId)}'>
      <div class="userImage w-25 rounded-circle">
        <img class="rounded-circle" src=${element.groupId.groupIcon} alt="user image" width="50px" height="50px">
      </div>
      <div class="userData w-75">
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">${element.groupId.groupName}</strong>
          <small>Wed</small>
        </div>
        <div class="col-10 mb-1 small">${element.groupId.groupDesc}</div>
      </div>
    </a>`
    });
    return `${groups}`
  }
  getCalling = (userData) => {
    return `<div class="modal fade show" id="xampleModal" tabindex="-1" aria-labelledby="xampleModalLabel" style="padding-right: 1px; display: block;" aria-modal="true" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content bg-main">
        <div class="modal-header bg-main">
          <h5 class="modal-title text-light" id="xampleModalLabel">Calling ${userData.name} ...</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body phoneBox bg-main">
        <div class="container w-75 h-100 d-flex justify-content-evenly flex-column align-items-center" id="video-grid">
            <img class="w-25 h-25 rounded-circle" src='${userData.profilePic}' alt="image">
            <div class="container d-flex justify-content-center text-light">${userData.name}</div>
            <div class="container w-100 d-flex justify-content-evenly align-items-center">
              <div class="container phoneCall d-flex justify-content-center align-items-center bg-danger">
                <i class="fas fa-phone fa-lg text-light"></i>
            </div>
            <div class="container phoneCall d-flex justify-content-center align-items-center">
                <i class="fas fa-phone fa-lg text-light"></i>
            </div>
            </div>
        </div>
        </div>
        <div class="modal-footer bg-main">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
  }
}
