

let iocon;
let isActive;
window.onload = () => {
  function connectToNewUser(userId, stream, myPeer) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })

    peers[userId] = call
  }

  function addVideoStream(video, stream, videoGrid) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }

  // creating connection with server 
  let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/init", "GET", undefined, {}, sessionStorage.getItem("token_auth"));
  fetchHandler.fetchData()
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let initUi = new UI();
      let mainBody = document.getElementById("mainBody");
      mainBody.innerHTML = initUi.getInit(data.userData);

      // adding the code to be executed after it
      return data.userData;
    })
    .then((userData) => {
      // add emojis
      $("#msg").emojioneArea({
        pickerPosition: 'top'
      })
      // emit data to websocket
      iocon = io("https://chatappbackend12345.herokuapp.com");
      let encryptedData = sha256(document.getElementById("msgAreaBox").getAttribute("data-email"));
      console.log(encryptedData);
      iocon.on("connection", (socket) => {
        console.log("connect through websockets");
      })
      iocon.emit('join', { encData: encryptedData, currentId: userData._id.toString() });
      iocon.on("new_msg", (data) => {
        try {
          let subMsgBox = document.getElementById("subMsgBox");
          subMsgBox.innerHTML += new UI().getChatOnGo(data.chat, data.chatType, data.chatTime, data.chatId, "purple", "start")
          downloadLis();
          // adding changes to attachments;
          if (data.chatType == "File") {
            try {
              let mediaFile = data.chat.split("-");
              let attachmentsId = document.getElementById("attachments");
              attachmentsId.innerHTML += `<div class="accordion-body bg-theme-color"><div class="container w-100 p-0 m-0 text-start p-3 fs-15 rounded d-flex flex-column justify-content-between pb-0">
      <div class="container d-flex align-items-center h-75 justify-content-between w-100 mb-3">
      <i class="fas fa-download fa-lg cp" id="downloadNow" data-chatId='${data.chatId}' data-image='${mediaFile[mediaFile.length - 1]}'></i>
      <div class="container w-50 text-center">${mediaFile[mediaFile.length - 1]}</div>
      <i class="fas fa-file fa-lg"></i>
    </div>
    </div></div>`;
            } catch (error) {

            }
          }
        } catch (error) {
          console.log(error);
        }
      })
      iocon.on("group_msg", (data) => {
        try {
          let subMsgBox = document.getElementById("subMsgBox");
          let color = "purple";
          let pos = "start";
          if (userData._id.toString() == data.userId.toString()) {
            color = "blue";
            pos = "end";
          }
          subMsgBox.innerHTML += new UI().getChatOnGoGrp(data.chat, data.chatType, data.chatTime, data.chatId, color, pos, data.name, data.email)
          downloadLis();
          // adding changes to attachments;
        } catch (error) {
          console.log(error);
        }
      });
      iocon.on("isActive", (data) => {
        let user1 = document.getElementById(data.userId);
        user1.setAttribute("class", "position-absolute rounded-circle isActive");
      })
      iocon.on("isOffline", (data) => {
        let user1 = document.getElementById(data.userId);
        user1.setAttribute("class", "position-absolute rounded-circle isOffline");
      })

      // 

      // iocon.on("callPerson", (data) => {
      //   console.log(data)
      //   let mainBody = document.getElementById("mainBody");
      //   mainBody.innerHTML += new UI().getCalling(data);
      //   let myVideo = document.createElement("video");
      //   myVideo.muted = true;
      //   peer.on("open", (id) => {
      //     iocon.emit("join-room", id);
      //   })
      //   let videoGrid = document.getElementById("video-grid");
      //   videoGrid.innerHTML = "";
      //   navigator.mediaDevices.getUserMedia({
      //     video: true,
      //     audio: true
      //   })
      //     .then((stream) => {
      //       addVideoStream(myVideo, stream, videoGrid);
      //       // start Call
      //       peer.on('call', call => {
      //         call.answer(stream)
      //         const video = document.createElement('video')
      //         call.on('stream', userVideoStream => {
      //           addVideoStream(video, userVideoStream, videoGrid)
      //         })
      //       })
      //       iocon.on('user-connected', userId => {
      //         connectToNewUser(userId, stream, peer)
      //       })
      //     })
      // })

      // user connection on call
      let previousIndex = 1;
      let menuItems = document.getElementsByClassName("nav-pills")[0].children;
      for (let i = 0; i < menuItems.length - 2; i++) {
        const element = menuItems[i];
        element.addEventListener("click", () => {
          let profileHandler = new Fetching(`https://chatappbackend12345.herokuapp.com/${element.children[0].getAttribute("data-label")}`, "GET", undefined, {}, sessionStorage.getItem("token_auth"));
          console.log(`https://chatappbackend12345.herokuapp.com/${element.children[0].getAttribute("data-label")}`);
          profileHandler.fetchData()
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              let middle = document.getElementsByClassName("middle")[0];
              middle.innerHTML = "";
              let profile = new UI();
              if (i == 0) {
                middle.innerHTML = profile.getProfile(data.userData);
                try {
                  sendMsgLis();
                } catch (error) {

                }
                try {
                  sendGrpMsgLis();
                } catch (error) {

                }
                try {
                  editUserLis();
                } catch (error) {

                }

                // configure acc buttons

                accBtnLis();
              }
              else if (i == 1) {
                middle.innerHTML = profile.getChats(data.userData);
                try {
                  displayMsgLis();
                } catch (error) {

                }

                try {
                  sendMsgLis();
                } catch (error) {

                }
                try {
                  sendGrpMsgLis();
                } catch (error) {

                }
                try {
                  downloadLis()
                } catch (error) {

                }
                searchLis();
              }
              else if (i == 2) {
                middle.innerHTML = profile.getGroups(data.userData);
                createGrpLis();
                try {
                  sendMsgLis();
                } catch (error) {

                }
                try {
                  sendGrpMsgLis();
                } catch (error) {

                }
                try {
                  downloadLis()
                } catch (error) {

                }
                try {
                  displayGrpLis();
                } catch (error) {

                }

                searchLis("grp");
              }
              else if (i == 3) {
                middle.innerHTML = profile.getContact(data.userData);
                addContactLis();
                try {
                  displayMsgLis();

                } catch (error) {

                }
                try {
                  sendMsgLis();
                } catch (error) {

                }
                try {
                  sendGrpMsgLis();
                } catch (error) {

                }
                try {
                  downloadLis()
                } catch (error) {

                }
                searchLis();
              }
              else {
                middle.innerHTML = profile.getSettings(data.userData);
                try {
                  displayMsgLis();
                } catch (error) {

                }
                try {
                  sendMsgLis();
                } catch (error) {

                }
                try {
                  sendGrpMsgLis();
                } catch (error) {

                }
                try {
                  downloadLis()
                } catch (error) {

                }
                editUserLis();
                accBtnLis();
              }
              menuItems[previousIndex].classList.remove("active-item");
              element.classList.add("active-item");
              previousIndex = i;

            })
            .catch((err) => {
              console.log(err);
            })
        })
      }
      return userData;
    })
    .then((userData) => {
      if (userData.contacts.length > 0) {
        let fetchHandler = new Fetching("https://chatappbackend12345.herokuapp.com/displayMessages", "POST", {
          currentId: userData.contacts[0].contactId._id
        }, {
          "Content-Type": "application/json"
        }, sessionStorage.getItem("token_auth"));
        fetchHandler.fetchData()
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            let Ui = new UI();
            let chatBox = document.getElementById("chatBox");
            chatBox.innerHTML = Ui.getChatBox(data.chats, userData.contacts[0].contactId._id);
            let emoji = document.getElementsByClassName("emojionearea-button-open")[0];
            console.log(emoji);
            emoji.innerHTML = `<i class="fas fa-smile-beam float-end fa-lg"></i>`
            // chat page functionalities

            try {
              displayMsgLis();
            } catch (error) {

            }

            try {
              sendMsgLis();
            } catch (error) {

            }
            try {
              downloadLis();
            } catch (error) {

            }
            searchLis();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    .catch((err) => {
      console.log(err);
    })
}