let socket = io({"autoConnect": false});

let nickname = "";
let room = "";

const welcomePage = () => {
    let container = document.createElement("div");
    container.classList.add("welcomeBox");

    let welcomeHeader = document.createElement("h2");
    welcomeHeader.innerText = "Welcome";

    let nameInput = document.createElement("input");
    nameInput.placeholder = "input nickname here...";
    nameInput.addEventListener("input", (e) => {
        nickname = e.target.value;
    });

    let welcomeButton = document.createElement("button");
    welcomeButton.innerText = "Continue"
    welcomeButton.classList.add("welcomeButton");
    welcomeButton.addEventListener("click", welcomePageButton)

    document.body.append(container);
    container.append(welcomeHeader, nameInput, welcomeButton)
};

const welcomePageButton = () => {
    if(nickname === "") return

    socket.connect();

    socket.emit("nickname", nickname);

    document.body.innerHTML = "";

    let mainContainer = document.createElement("div");
    mainContainer.classList.add("mainContainer");

    let leftContainer = document.createElement("div");
    leftContainer.classList.add("leftContainer");

    let rightContainer = document.createElement("div");
    rightContainer.classList.add("rightContainer");

    let welcomeUserText = document.createElement("h2");
    welcomeUserText.classList.add("welcomeUserText");
    welcomeUserText.innerHTML = `Welcome </br> ${nickname}`

    let roomInputBox = document.createElement("input");
    roomInputBox.addEventListener("input", (e) => {
        room = e.target.value;
    });
    
    let roomButton = document.createElement("button");
    roomButton.innerText = "Join room";
    roomButton.addEventListener("click", () => {
        if(room != ""){
            let currentRoom = document.createElement("h4");
            currentRoom.classList.add("currentRoom");
            currentRoom.innerText = `Current room: ${room}`;
            
            document.getElementsByClassName("chatMsgBox")[0].append(currentRoom);

            socket.emit("room", room);
        }
    })

    let chatMsgBox = document.createElement("div");
    chatMsgBox.classList.add("chatMsgBox");

    let chatInputBox = document.createElement("div");
    chatInputBox.classList.add("chatInputBox");

    let chatInput = document.createElement("input");
    chatInput.classList.add("chatinput");

    let chatButton = document.createElement("button");
    chatButton.innerText = "Send";
    chatButton.addEventListener("click", () => {
        if(document.getElementsByClassName("chatinput")[0].value != ""){
            let senderMsgdiv = document.createElement("div");
            senderMsgdiv.classList.add("senderMsgdiv");

            let senderMsgName = document.createElement("h5");
            senderMsgName.classList.add("senderMsgName");
            senderMsgName.innerText = nickname;

            let senderMsg = document.createElement("p")
            senderMsg.classList.add("senderMsg");
            senderMsg.innerText = document.getElementsByClassName("chatinput")[0].value;

            chatMsgBox.append(senderMsgdiv);
            senderMsgdiv.append(senderMsgName, senderMsg);

            socket.emit("chatMsg", document.getElementsByClassName("chatInput")[0].value, nickname, room);
        }
    });

    

    document.body.append(mainContainer);
    mainContainer.append(leftContainer, rightContainer);
    leftContainer.append(welcomeUserText, roomInputBox, roomButton);
    rightContainer.append(chatMsgBox, chatInputBox)
    chatInputBox.append(chatInput, chatButton);
}

socket.on("chatMsg", (msg, sender) => {
    console.log(msg, sender);

    let chatMsgdiv = document.createElement("div");

    let chatMsgSender = document.createElement("h5");
    chatMsgSender.innerText = sender;

    let chatMsg = document.createElement("p");
    chatMsg.classList.add("chatMsg");
    chatMsg.innerText = msg;

    document.getElementsByClassName("chatMsgBox")[0].append(chatMsgdiv);
    chatMsgdiv.append(chatMsgSender, chatMsg); 
})

window.addEventListener("load", welcomePage);


/*
if(chatInput.value != ""){
    let chatMsgdiv = document.createElement("div");

    let chatMsgSender = document.createElement("h5");
    chatMsgSender.innerText = nickname;

    let chatMsg = document.createElement("p");
    chatMsg.classList.add("chatMsg");
    chatMsg.innerText = chatInput.value

    chatMsgBox.append(chatMsgdiv);
    chatMsgdiv.append(chatMsgSender, chatMsg); 
}
*/