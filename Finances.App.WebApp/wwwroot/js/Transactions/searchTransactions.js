
function clickSearchAndDisplayTransactions() {

    clearUserMessages();

    searchAndDisplayTransactions({
        callback: function () {
            hideAllSections();
        },
        displayUserMessage: true
    });

}

function searchAndDisplayTransactions(params) {

    $.ajax(
        {
            type: 'post',
            url: getLocationHrefWithoutTrailingSlash() + '/Transactions/Search/',
            data: $('#form-search-criteria').serialize(),
            success: function (data, status, xhr) {
                //$('#accountName').html($('#SearchCriteria_AccountId option:Selected').text());
                $('#transactions').html(getTransactionsHtml(data.searchCriteria, data.transactions));
                if (params) {
                    if (typeof (params.callback) == "function") {
                        params.callback(data);
                    }
                    if (params.displayUserMessage) {
                        var transactionsCount = data.transactions.length;
                        showUserMessage(transactionsCount + ' ' + (transactionsCount == 1 ? transactionClass.lDescription : transactionClass.lDescriptionPlural) + ' listed.', isError=false);
                    }
                }
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );

}

function getTransactionsHtml(searchCriteria, transactions) {

    if (transactions == null) {
        return;
    }

    //var html = $('#addRow').prop('outerHTML');
    let html = '';

    transactions.forEach(function (runningTotal, index) {

        let transaction = runningTotal.transaction;

        let trClass = '';

        /*
        if (Date.parse(transaction.effDate) > currentDate) {
            trClass = "background-color:cornsilk;";
        }

        if (transaction.exclude == true) {
            trClass = "background-color:lightgray;";
        }
        */

        html += '<tr data-toggle="tooltip" title="TransactionId=' + transaction.transactionId + ', Year=' + transaction.year + ', Period=' + transaction.period + ', IsWage?=' + transaction.isWage + (transaction.isWage ? ', WageTotalForEffDate=' + transaction.wageTotalForEffDate : '') + ', Exclude?=' + transaction.exclude + '"';
        if (trClass.length > 0) {
            html += ' style="' + trClass + '"';
        }
        html += ' id="transaction' + transaction.transactionId + '">';
        

        html += '<td>';
        html += '<input type="checkbox" name="transactionSelector" id="transactionSelector' + transaction.transactionId + '" value=' + transaction.transactionId + ' onclick=clickItemSelector(transactionClass, ' + transaction.transactionId + ')>';
        html += '</td>';

        html += '<td class="vertical-border-only align-center">' + formatDateTimeAsDateDDMMYYYY(transaction.effDate) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(transaction.category.group.name) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(transaction.category.name) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(transaction.description) + '</td>';
        //html += '<td class="vertical-border-only align-left">' + setNullToString(transaction.item) + '</td>';
        html += '<td class="vertical-border-only align-right">' + formatCurrency(transaction.credit) + '</td>';
        html += '<td class="vertical-border-only align-right">' + formatCurrency(transaction.debit) + '</td>';

        if (searchCriteria.categoryId == 0) {
            html += '<td class="vertical-border-only align-right">' + formatCurrency(runningTotal.runningTotal) + '</td>';
        }

        html += '</tr>';
    })

    return html;
}