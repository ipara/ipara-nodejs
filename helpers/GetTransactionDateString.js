function GetTransactionDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const montrh =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const secont =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return (
        year +
        "-" +
        montrh +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        secont
    );
}

module.exports = GetTransactionDateString;
