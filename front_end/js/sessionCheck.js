function checka() {
    fetch('http://localhost:8080/sessionCheck')
        .then(response => { return response.json(); })
        .then(sessao => checkz(sessao));


    function checkz(sess) {
        var s = sess.sessao;
        console.log(s); //nada, cli ou admin
        console.log(window.location.pathname); // /xxxxx.html
    }

    function addOnloadEvent(fnc) {
        if (typeof window.addEventListener != "undefined")
            window.addEventListener("load", fnc, false);
        else if (typeof window.attachEvent != "undefined") {
            window.attachEvent("onload", fnc);
        } else {
            if (window.onload != null) {
                var oldOnload = window.onload;
                window.onload = function(e) {
                    oldOnload(e);
                    window[fnc]();
                };
            } else
                window.onload = fnc;
        }
    }
    addOnloadEvent(funcao);



}