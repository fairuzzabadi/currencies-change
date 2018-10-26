export function formatMoney(data) {
    var result = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return result;
}