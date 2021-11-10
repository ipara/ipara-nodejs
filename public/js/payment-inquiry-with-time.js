document.getElementById("pay").addEventListener("click", function (e) {
    var startDate;
    if (
        document.getElementsByName("startDateYear")[0].value &&
        document.getElementsByName("startDateMonth")[0].value &&
        document.getElementsByName("startDateDay")[0].value
    ) {
        startDate =
            document.getElementsByName("startDateYear")[0].value +
            "-" +
            document.getElementsByName("startDateMonth")[0].value +
            "-" +
            document.getElementsByName("startDateDay")[0].value +
            " 00:00:00";
    }
    var endDate;
    if (
        document.getElementsByName("expireDateYear")[0].value &&
        document.getElementsByName("expireDateMonth")[0].value &&
        document.getElementsByName("expireDateDay")[0].value
    ) {
        endDate =
            document.getElementsByName("expireDateYear")[0].value +
            "-" +
            document.getElementsByName("expireDateMonth")[0].value +
            "-" +
            document.getElementsByName("expireDateDay")[0].value +
            " 00:00:00";
    }

    if (!startDate || !endDate) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-inquiry-with-time", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ödemeleri Listele";
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
            startDate,
            endDate,
        })
    );
});
