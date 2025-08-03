const usersend = document.getElementById("input-user");
const passsend = document.getElementById("input-pass");

function inputsend() {
    const formData = new URLSearchParams();
    formData.append("user", usersend.value);
    formData.append("pass", passsend.value);

    fetch("https://script.google.com/macros/s/AKfycbxcM1lytERc9yneZUSAqPannItn20uMxwfUm1vNsquDbpTx1uLDQpUOzrq1XKNdnTHA/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"  // ← プリフライト回避できる
        },
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        console.log("GASの返事:", data);
        alert("送信成功！");
    })
    .catch(err => {
        console.error("エラー:", err);
        alert("送信失敗！");
    });
}
