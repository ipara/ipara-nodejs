document.getElementById("pay").addEventListener("click", function (e) {
    var cardOwnerName = document.getElementsByName("cardOwnerName")[0].value;
    var cardNumber = document.getElementsByName("cardNumber")[0].value;;
    var cardExpireMonth = document.getElementsByName("cardExpireMonth")[0].value;;
    var cardExpireYear = document.getElementsByName("cardExpireYear")[0].value;;
    var cardCvc = document.getElementsByName("cardCvc")[0].value;;
    var installment = document.getElementsByName("installment")[0].value;;

    if (!cardOwnerName || !cardNumber || !cardExpireMonth ||  !cardExpireYear || !cardCvc || !installment) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz..."
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/non-3d-payment", true);
    ajax.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    ajax.onload = function () {
        target.innerHTML = "API Payment ile Ödeme"
        target.disabled = false;
        var data = JSON.parse(ajax.response).authResponse
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
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        installment: installment
    }))
})