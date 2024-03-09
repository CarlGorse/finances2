
function formatCurrency(currency) {
    if (currency == null) {
        return '';
    }
    if (currency == 0) {
        return '';
    }
    return Number(currency).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatBool(bool) {
    if (bool == null) {
        return '';
    }
    if (!bool) {
        return 'No';
    }
    else {
        return 'Yes';
    }
}

function setNullToString(thisString) {
    return (thisString == null) ? '' : thisString;
}

function getLocationHrefWithoutTrailingSlash(location) {
    if (location.href.substring(location.href.length - 1, location.href.length) == "/") {
        return location.href.substring(0, location.href.length - 1);
    }
    else {
        return location.href;
    }
}

function isValidMoney(money) {
    return /^\d{0,4}(\.\d{0,2})?$/.test(Math.abs(money));
}

export { formatCurrency };
