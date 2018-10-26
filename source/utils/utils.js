export function formatMoney(data) {
    console.log(data)
    let arr = data.toString().split("."),
        result = `${arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${arr[1].substr(0, 4)}`;
    return result;
}