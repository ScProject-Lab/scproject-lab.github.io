fetch("pages/20251231.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("news").innerHTML = html;
    });
