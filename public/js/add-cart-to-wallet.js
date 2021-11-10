document.getElementById("pay").addEventListener("click", function (e) {
    var userId = document.getElementsByName("userId")[0].value;
    var cardOwnerName = document.getElementsByName("cardOwnerName")[0].value;
    var cardNumber = document.getElementsByName("cardNumber")[0].value;
    var cardExpireMonth =
        document.getElementsByName("cardExpireMonth")[0].value;
    var cardExpireYear = document.getElementsByName("cardExpireYear")[0].value;
    var cardAlias = document.getElementsByName("cardAlias")[0].value;
    if (
        !userId ||
        !cardOwnerName ||
        !cardNumber ||
        !cardExpireMonth ||
        !cardExpireYear ||
        !cardAlias
    )
        return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/add-cart-to-wallet", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Kartı Ekle";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        document.getElementById("result").innerHTML = JSON.stringify(
            data,
            null,
            4
        );
    };
    ajax.send(
        JSON.stringify({
            cardOwnerName: cardOwnerName,
            cardNumber: cardNumber,
            cardExpireMonth: cardExpireMonth,
            cardExpireYear: cardExpireYear,
            cardAlias: cardAlias,
            userId: userId,
        })
    );
});
