let socket = io({ "autoconnect":false});

let nickname = "";
let room = "";



window.addEventListener("load", () => {
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
    welcomeButton.addEventListener("click", () => {
        if(nickname != "") {
            console.log(nickname);
        }
    })

    document.body.append(container);
    container.append(welcomeHeader, nameInput, welcomeButton)
})