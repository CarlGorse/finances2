
function formatCurrency(currency) {
    if (currency == null) {
        return '';
    }
    if (currency === 0) {
        return '';
    }
    return Number(currency).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export { formatCurrency };
