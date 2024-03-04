
function onClickRunReport() {

    $.ajax(
        {
            type: 'post',
            url: location.href + '/Search/',
            data: $('#form-search-criteria').serialize(),
            success: function (data, status, xhr) {
                let reportTotalType = readReportTotalType();
                let reportValueType = readReportValueType();
                showReportResults(data, reportTotalType, reportValueType);
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );

}

function readReportTotalType() {
    if ($('#reportTotalType_accumulated').prop('checked')) {
        return 'accumulated';
    }
    else if ($('#reportTotalType_period').prop('checked')) {
        return 'period';
    }
}

function readReportValueType() {
    if ($('#reportValueType_total').prop('checked')) {
        return 'total';
    }
    else if ($('#reportValueType_debit').prop('checked')) {
        return 'debit';
    }
    else if ($('#reportValueType_credit').prop('checked')) {
        return 'credit';
    }
}

function showReportResults(data, reportTotalType, reportValueType) {

    if (data.categoryTotals == null) {
        return;
    }

    let headersHtml = '';

    headersHtml += '<table width="100%">';

    headersHtml += '<tr>';

    headersHtml += '<thead>';

    headersHtml += '<tr>';
    headersHtml += '<th width="15%"></th>';
    headersHtml += '<th width="15%"></th>';
    data.yearsAndPeriods.forEach(function (yearAndPeriod, index) {
        headersHtml += '<th';
        if ((yearAndPeriod.year == data.currentYearAndPeriod.year) && (yearAndPeriod.period == data.currentYearAndPeriod.period)) {
            headersHtml += ' style=background-color:cornsilk';
        }
        headersHtml += '>' + yearAndPeriod.year + '.' + formatMonth2Digits(yearAndPeriod.period) + '</th>';
    });
    headersHtml += '</tr>';
    headersHtml += '</thead>';

    $('#reportHeaders').html(headersHtml);

    let html = '';

    html += '<table width="100%">';

    html += '<tr>';

    html += '<thead>';

    html += '<tr>';
    html += '<th width="15%"></th>';
    html += '<th width="15%"></th>';
    data.yearsAndPeriods.forEach(function (yearAndPeriod, index) {
        html += '<th></th>';
    });
    html += '</tr>';
    html += '</thead>';

    let isFirstGroup = true;

    data.categoryGroups.forEach(function (group, index) {

        html += '<thead>';

        html += '<tr style="' + (!isFirstGroup ? 'border-top: solid 1px #000' : '') + '">';

        html += '<td>'
        html += '</td>';

        html += '<td>'
        html += '</td>';

        data.categoryGroupTotals.filter(x => x.groupId == group.categoryGroupId);

        html += printYearsAndPeriodsValues(reportValueType, reportTotalType, data.categoryGroupTotals, group.categoryGroupId, data, 'th');

        html += '</tr>';

        html += '</thead>';

        let isFirstCategoryForGroup = true;

        data.categories.filter(x => x.groupId == group.categoryGroupId && !x.doNotDisplay).forEach(function (category, index) {

            html += '<tr>';

            html += '<td>'
            if (isFirstCategoryForGroup == true) {
                html += group.name;
            }
            html += '</td>';

            html += '<td>';
            html += category.name;
            html += '</td>';

            html += printYearsAndPeriodsValues(reportValueType, reportTotalType, data.categoryTotals, category.categoryId, data, 'td');

            html += '<tr>';
            html += '<td>'
            html += '</td>';
            html += '</tr>';

            isFirstCategoryForGroup = false;

        });

        html += '</tr>';

        isFirstGroup = false;
    })

    html += '</table>';

    $('#reportResults').html(html);
}

function printYearsAndPeriodsValues(reportValueType, reportTotalType, totals, itemId, data, columnElementType) {

    let html = '';

    data.yearsAndPeriods.forEach(function (yearAndPeriod, index) {

        totals.filter(x =>
            x.itemId == itemId
            && x.year == yearAndPeriod.year
            && x.period == yearAndPeriod.period).forEach(function (searchResult, index) {

                html += '<' + columnElementType;
                if ((yearAndPeriod.year == data.currentYearAndPeriod.year) && (yearAndPeriod.period == data.currentYearAndPeriod.period)) {
                    html += ' style=background-color:cornsilk';
                }
                html += '>';

                let value = 0;

                switch (reportTotalType) {
                    case 'accumulated':
                        switch (reportValueType) {
                            case 'total':
                                value = searchResult.accumulatedTotalByPeriod;
                                break;
                            case 'debit':
                                value = searchResult.accumulatedDebitByPeriod;
                                break;
                            case 'credit':
                                value = searchResult.accumulatedCreditByPeriod;
                                break;
                        }
                        break;
                    case 'period':
                        switch (reportValueType) {
                            case 'total':
                                value = searchResult.totalByPeriod;
                                break;
                            case 'debit':
                                value = searchResult.debitByPeriod;
                                break;
                            case 'credit':
                                value = searchResult.creditByPeriod;
                                break;
                        }
                        break;
                }

                html += formatCurrency(value);
                html += '</' + columnElementType + '>';
            })
    });

    return html;
}