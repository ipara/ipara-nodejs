document.getElementById("pay").addEventListener("click", function (e) {
    var email = document.getElementsByName("email")[0].value;
    var gsm = document.getElementsByName("gsm")[0].value;
    var linkId = document.getElementsByName("linkId")[0].value;
    var linkState = document.getElementsByName("linkState")[0].value;

    var startDate = "";
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

    var endDate = "";
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
    var pageSize = document.getElementsByName("pageSize")[0].value;
    var pageIndex = document.getElementsByName("pageIndex")[0].value;

    if (!pageSize || !pageIndex) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-link-inquiry", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Listele";
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
            email,
            gsm,
            linkId,
            linkState,
            startDate,
            endDate,
            pageSize,
            pageIndex,
        })
    );
});
