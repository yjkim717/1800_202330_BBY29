function loadScript(url, integrity = '', crossorigin = 'anonymous') {
    var script = document.createElement('script');
    script.src = url;
    if (integrity) {
        script.integrity = integrity;
    }
    if (crossorigin) {
        script.crossOrigin = crossorigin;
    }
    document.head.appendChild(script);
}
function loadCSS(url, rel = '', integrity = '', crossorigin = 'anonymous') {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.href = url;
    if (rel) {
        link.rel = rel;
    }
    if (integrity) {
        link.integrity = integrity;
    }
    if (crossorigin) {
        link.crossOrigin = crossorigin;
    }
    document.head.appendChild(link);
}


loadCSS("https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css");
loadCSS("https://fonts.googleapis.com/css2?family=Pacifico&family=Pixelify+Sans&display=swap");
loadCSS("./styles/global/global.css");
loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
, "stylesheet"
, "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
, "anonymous"
);
loadCSS("https://fonts.googleapis.com", "preconnect");
loadCSS("https://fonts.gstatic.com", "preconnect");
loadCSS("./styles/global/global.css", "stylesheet");
loadCSS("./styles/pages/index.css", "stylesheet");

