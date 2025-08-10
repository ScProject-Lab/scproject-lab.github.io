window.addEventListener('load', function(){
    const window = document.querySelector(".window-contents");
    window.style.display = "none";
});

const usersend = document.getElementById("input-user");
const passsend = document.getElementById("input-pass");

function inputsend() {
    const window = document.querySelector(".window-contents");
    window.style.display = "";
}

function agree() {
    fetch("192.168.0.1")
        .then((data) => data.text())
        .then((res) => console.log(res));

    const window = document.querySelector(".window-contents");
    window.style.display = "none";
}

function cancel() {
    const window = document.querySelector(".window-contents");
    window.style.display = "none";
}

function backclick() {
    const window = document.querySelector(".window-contents");
    window.style.display = "none";
}