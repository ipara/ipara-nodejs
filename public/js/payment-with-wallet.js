document.getElementById("pay").addEventListener("click", function (e) {
    var userId = document.getElementsByName("userId")[0].value;
    var cardId = document.getElementsByName("cardId")[0].value;
    var installment = document.getElementsByName("installment")[0].value;

    if (!userId || !cardId || !installment) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-with-wallet", true);
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
            userId,
            cardId,
            installment,
        })
    );
});
