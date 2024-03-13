
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

export { formatCurrency, stringToCurrency };
