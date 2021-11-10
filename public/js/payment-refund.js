document.getElementById("pay").addEventListener("click", function (e) {
    var orderId = document.getElementsByName("orderId")[0].value;
    var refundHash = document.getElementsByName("refundHash")[0].value;
    var amount = document.getElementsByName("amount")[0].value;

    if (!orderId || !refundHash || !amount) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-refund", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "İade Et";
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
            orderId,
            refundHash,
            amount,
        })
    );
});
