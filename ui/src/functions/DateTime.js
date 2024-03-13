
function formatDateDDMMYYYY(thisDate) {
    let day = thisDate.getDate();
    let month = thisDate.getMonth() + 1;
    let year = thisDate.getFullYear();
    let result =
        formatDay2Digits(day) + '/'
        + formatMonth2Digits(month) + '/'
        + year
    return result;
}

function formatStringAsDateDDMMYYYY(dateString) {
    let thisDate = convertStringToDate(dateString);
    return formatDateDDMMYYYY(thisDate);
}

function formatDateTimeAsDateDDMMYYYY(dateTimeString) {
    return formatStringAsDateDDMMYYYY(convertDateToString(new Date(dateTimeString)));
}

function convertStringToDate(dateString) {
    let dateArray = dateString.toString().split("/");
    let day = dateArray[0];
    let month = dateArray[1];
    let year = dateArray[2];
    return new Date(year, month - 1, day);
}

function convertDateToString(thisDate) {
    let day = thisDate.getDate();
    let month = thisDate.getMonth() + 1;
    let year = thisDate.getFullYear();
    return formatStringAsDateDDMMYYYY(day + '/' + month + '/' + year);
}

function formatMonth2Digits(month) {
    return ("0" + month).slice(-2);
}

function formatDay2Digits(day) {
    return ("0" + day).slice(-2);
}


export {
    convertDateToString,
    convertStringToDate,
    formatDateDDMMYYYY,
    formatDateTimeAsDateDDMMYYYY,
};
