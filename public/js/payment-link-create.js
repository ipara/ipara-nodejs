document.getElementById("pay").addEventListener("click", function (e) {
    var name = document.getElementsByName("name")[0].value;
    var surname = document.getElementsByName("surname")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var gsm = document.getElementsByName("gsm")[0].value;
    var amount = document.getElementsByName("amount")[0].value;
    var threeD = document.getElementsByName("threeD")[0].value;
    var installment = document.getElementsByName("installment")[0].value;
    var tcCertificate = document.getElementsByName("tcCertificate")[0].value;
    var taxNumber = document.getElementsByName("taxNumber")[0].value;
    var commissionType = document.getElementsByName("commissionType")[0].value;
    var sendEmail = document.getElementsByName("sendEmail")[0].value;

    var expireDate;
    if (
        document.getElementsByName("expireDateYear")[0].value &&
        document.getElementsByName("expireDateMonth")[0].value &&
        document.getElementsByName("expireDateDay")[0].value
    ) {
        expireDate =
            document.getElementsByName("expireDateYear")[0].value +
            "-" +
            document.getElementsByName("expireDateMonth")[0].value +
            "-" +
            document.getElementsByName("expireDateDay")[0].value +
            " 00:00:00";
    }
    if (
        !name ||
        !surname ||
        !email ||
        !gsm ||
        !amount ||
        !threeD ||
        !expireDate
    )
        return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-link-create", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ödeme Linki Oluştur";
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
            name,
            surname,
            email,
            gsm,
            amount,
            threeD,
            installment,
            tcCertificate,
            taxNumber,
            commissionType,
            sendEmail,
            expireDate,
        })
    );
});
