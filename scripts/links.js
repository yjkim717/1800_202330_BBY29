
function loadScript(url) {
    
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
    console.log("Script Loaded");
}
function loadCSS(url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.href = url;
    document.head.appendChild(link);
}

loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js");
loadScript("https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js");
loadScript("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js");

loadCSS("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css");
loadCSS("https://fonts.googleapis.com/css2?family=Pacifico&family=Pixelify+Sans&display=swap");
loadCSS("./styles/global/global.css");