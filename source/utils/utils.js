export function formatMoney(data) {
    let arr = data.toString().split("."),
        result = `${arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${arr[1].substr(0, 2)}`;
    return result;
}