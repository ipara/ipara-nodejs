document.getElementById("pay").addEventListener("click", function (e) {
    var linkId = document.getElementsByName("linkId")[0].value;

    if (!linkId) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-link-delete", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ödeme Linkini Sil";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        document.getElementById("result").innerHTML = JSON.stringify(
            data.data,
            null,
            4
        );
    };
    ajax.send(
        JSON.stringify({
            linkId,
        })
    );
});
