document.getElementById("pay").addEventListener("click", function (e) {
    var cardOwnerName = document.getElementsByName("cardOwnerName")[0].value;
    var cardNumber = document.getElementsByName("cardNumber")[0].value;
    var cardExpireMonth =
        document.getElementsByName("cardExpireMonth")[0].value;
    var cardExpireYear = document.getElementsByName("cardExpireYear")[0].value;
    var cardCvc = document.getElementsByName("cardCvc")[0].value;
    var amount = document.getElementsByName("amount")[0].value;
    var installment = document.getElementsByName("installment")[0].value;

    if (
        !cardOwnerName ||
        !cardNumber ||
        !cardExpireMonth ||
        !cardExpireYear ||
        !cardCvc ||
        !amount
    )
        return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/non-3d-payment", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Non-3D Ödeme";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        const xml_data = vkbeautify.xml(data.data);
        document.getElementById("result").innerText = xml_data;
    };
    ajax.send(
        JSON.stringify({
            cardOwnerName,
            cardNumber,
            cardExpireMonth,
            cardExpireYear,
            cardCvc,
            amount,
            installment,
        })
    );
});
