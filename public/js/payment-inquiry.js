document.getElementById("pay").addEventListener("click", function (e) {
    var orderId = document.getElementsByName("orderId")[0].value;
    if (!orderId) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-inquiry", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ödeme Sorgula";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        const xml_data = vkbeautify.xml(data.data);
        document.getElementById("result").innerText = xml_data;
    };
    ajax.send(
        JSON.stringify({
            orderId: orderId,
        })
    );
});
