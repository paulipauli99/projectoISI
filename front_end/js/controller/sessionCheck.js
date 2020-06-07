function checkAdmin() {
    fetch('http://localhost:8080/sessionCheck')
        .then(response => { return response.json(); })
        .then(sessao => checkz(sessao));

    function checkz(sess) {
        var s = sess.sessao; //nada, cli ou admin

        if (s == "nada") {
            window.location.replace("/index.html");
        } else {
            if (s == "cli") {
                window.location.replace("/services.html");
            } else {
                if (s == "admin") {

                }
            }
        }
    }
}

function checkCliente() {
    fetch('http://localhost:8080/sessionCheck')
        .then(response => { return response.json(); })
        .then(sessao => checkz(sessao));

    function checkz(sess) {
        var s = sess.sessao; //nada, cli ou admin

        if (s == "nada") {
            window.location.replace("/index.html");
        } else {
            if (s == "cli") {

            } else {
                if (s == "admin") {
                    window.location.replace("/tabelacliente.html");
                }
            }
        }
    }
}

function checkNada() {
    fetch('http://localhost:8080/sessionCheck')
        .then(response => { return response.json(); })
        .then(sessao => checkz(sessao));

    function checkz(sess) {
        var s = sess.sessao; //nada, cli ou admin

        if (s == "nada") {

        } else {
            if (s == "cli") {
                window.location.replace("/services.html");
            } else {
                if (s == "admin") {
                    window.location.replace("/tabelacliente.html");
                }
            }
        }
    }
}