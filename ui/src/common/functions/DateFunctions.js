import { padStart } from './NumberFunctions'

function getDateAsYYYYMMDD(thisDate) {

    let thisDateAsDate = new Date(thisDate);

    let day = padStart(thisDateAsDate.getDate(), 2, '0');
    let month = padStart((thisDateAsDate.getMonth() + 1), 2, '0');
    let year = padStart(thisDateAsDate.getFullYear(), 2, '0');

    return year + '-' + month + '-' + day;
}

function getDateAsDDMMYYYY(thisDate) {

    let thisDateAsDate = new Date(thisDate);

    let day = padStart(thisDateAsDate.getDate(), 2, '0');
    let month = padStart((thisDateAsDate.getMonth() + 1), 2, '0');
    let year = padStart(thisDateAsDate.getFullYear(), 2, '0');

    return day + '/' + month + '/' + year;
}

export { getDateAsYYYYMMDD, getDateAsDDMMYYYY };