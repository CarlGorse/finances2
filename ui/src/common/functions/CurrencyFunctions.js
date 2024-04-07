
function formatCurrency(currency) {
    if (currency == null) {
        return '';
    }
    if (currency === 0) {
        return '';
    }
    return stringToCurrency(currency).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function stringToCurrency(currency) {
    return Number(currency)
}

function isValidCurrency(curency) {
    return /^\d{0,4}(\.\d{0,2})?$/.test(Math.abs(curency));
}

export { formatCurrency, stringToCurrency, isValidCurrency };
