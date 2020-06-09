function HTMLtoPDF() {
    var idCliente = document.getElementById("idd").value;

    var today = new Date();
    var dd = ('0' + today.getDate()).slice(-2);
    var mm = ('0' + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yy = today.getFullYear().toString().substr(2, 2);
    var hh = ('0' + today.getHours()).slice(-2) + "" + ('0' + today.getMinutes()).slice(-2);
    dia = dd + '-' + mm + '-' + yy + '-' + hh;


    var pdf = new jsPDF('p', 'pt', 'a4');
    source = $('#HTMLtoPDF')[0];
    specialElementHandlers = {
        '#bypassme': function(element, renderer) {
            return true
        }
    }
    margins = {
        top: 50,
        left: 35,
        right: 35,
        width: 545
    };
    pdf.fromHTML(
        source // HTML string or DOM elem ref.
        , margins.left // x coord
        , margins.top // y coord
        , {
            'width': margins.width // max width of content on PDF
                ,
            'elementHandlers': specialElementHandlers
        },
        function(dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save("Fatura_" + idCliente + "_" + dia + ".pdf");
        }
    )
}