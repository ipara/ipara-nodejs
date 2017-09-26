document.getElementById("pay").addEventListener("click", function (e) {
    var quary = document.getElementsByName("quary")[0].value;
    if (!quary) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz..."
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/bin-inquiry", true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.onload = function () {
        target.innerHTML = "Sorgula"
        target.disabled = false;
        var data = JSON.parse(ajax.response)
        if (data.error) return alert(data.error)
        document.getElementById("result").innerHTML = JSON.stringify(data).replace(new RegExp(",", 'g'), ',\n')
    }
    ajax.send(JSON.stringify({
        quary : quary
    }))
})