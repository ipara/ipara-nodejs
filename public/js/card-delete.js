document.getElementById("pay").addEventListener("click", function (e) {
    var userId = document.getElementsByName("userId")[0].value;
    var cardId = document.getElementsByName("cardId")[0].value;

    if (!userId) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/card-delete", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Sorgula";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        document.getElementById("result").innerHTML = JSON.stringify(
            data,
            null,
            4
        );
    };
    ajax.send(
        JSON.stringify({
            userId,
            cardId,
        })
    );
});
