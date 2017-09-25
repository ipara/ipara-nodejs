document.getElementById("pay").addEventListener("click", function (e) {
    var quary = document.getElementsByName("quary")[0].value;
    if (!quary) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz..."
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/payment-inquiry", true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.onload = function () {
        target.innerHTML = "API PAYMENT ILE ODE"
        target.disabled = false;
        var data = JSON.parse(ajax.response).inquiryResponse
        console.log(data)
        if (data.error) return alert(data.error)
        document.getElementById("result").innerHTML = "{\n" +
            '"amount": "' + undefined2Null(data.amount) + '"\n' +
            '"orderId": "' + undefined2Null(data.orderId) + '"\n' +
            '"result": "' + undefined2Null(data.result) + '"\n' +
            '"errorCode": "' + undefined2Null(data.errorCode) + '"\n' +
            '"errorMessage": "' + undefined2Null(data.errorMessage) + '"\n' +
            '"responseMessage": "' + undefined2Null(data.responseMessage) + '"\n' +
            '"mode": "' + undefined2Null(data.mode) + '"\n' +
            '"echo": "' + undefined2Null(data.echo) + '"\n' +
            '"hash": "' + undefined2Null(data.hash) + '"\n' +
            '"transactionDate": "' + undefined2Null(data.transactionDate) + '"\n' +
            '}';
    }
    ajax.send(JSON.stringify({
        quary : quary
    }))
})