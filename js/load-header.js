var isGitHubPages = location.hostname.includes("github.io");
var BASE_PATH = isGitHubPages ? "/home" : "";

fetch(`${BASE_PATH}/partials/header.html`)
    .then(res => {
    if (!res.ok) throw new Error(res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("header").innerHTML = html;
    })
    .catch(err => console.error(err));
