
function loadScript(url, integrity = "", crossorigin = "") {
    var script = document.createElement('script');
    script.src = url;
    script.integrity = integrity;
    script.crossorigin = crossorigin;
    document.head.appendChild(script);
}
function loadCSS(url, integrity = "", crossorigin = "", rel = "") {
    var link = document.createElement('link');
    link.rel = rel === "" ? 'stylesheet' : rel;
    link.type = 'text/css';
    link.integrity = integrity;
    link.crossorigin = crossorigin;
    link.href = url;
    document.head.appendChild(link);
}

loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js");
loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js");
loadScript("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js");
loadScript("https://code.jquery.com/jquery-3.7.1.js", "sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=", "anonymous");

loadCSS("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css");
loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css", "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN", "anonymous")
loadCSS("https://fonts.googleapis.com", "", "", "preconnect");
loadCSS("https://fonts.gstatic.com", "", "", "preconnect");
loadCSS("https://fonts.googleapis.com/css2?family=Pacifico&family=Pixelify+Sans&display=swap")
loadCSS("./styles/global/global.css");]