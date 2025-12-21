var isGitHubPages = location.hostname.includes("github.io");
var BASE_PATH = isGitHubPages ? "/home" : "";

fetch(`${BASE_PATH}/partials/footer.html`)
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;
    })
    .catch(err => console.error(err));