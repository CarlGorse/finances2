
var transactionFrom;
var transactionTo;

function clickMoveWages() {

    $('#creditToMove').val('');

    clearUserMessages();

    hideAllSectionsExcept('moveWages');
    if (isSectionVisible('moveWages')) {
        showHideSection('moveWages');
        return;
    }

    let count = getSelectedItemsCount(transactionClass);
    if (count < 2) {
        showValidationError('Two transactions must be selected.')
        return;
    }
    else if (count > 2) {
        showValidationError('Only two transactions can be selected.')
        return;
    }

    let transactionIds = getSelectedItemIds(transactionClass);

    $.ajax(
        {
            type: 'post',
            url: getLocationHrefWithoutTrailingSlash() + '/Transactions/GetTransactionsToMoveWages/',
            data: {
                transactionIdFrom: transactionIds[0],
                transactionIdTo: transactionIds[1]
            },
            success: function (data, status, xhr) {
                transactionFrom = data.transactionFrom;
                transactionTo = data.transactionTo;
                showMoveTransactions();
                showSection('moveWages');
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}

function showMoveTransactions() {
    showMoveTransaction(transactionFrom, 'moveTransactionFrom');
    showMoveTransaction(transactionTo, 'moveTransactionTo');
}

function onchangeCreditToMove() {

    clearUserMessages();

    let creditToMove = readCreditToMove();

    if (!isValidMoney(creditToMove)) {
        showValidationError('\'' + creditToMove + '\' is not a valid amount');
        return;
    }

    let newCredit_transactionFrom = Math.round((Number(transactionFrom.credit) - Number(creditToMove)) * 100) / 100;
    let newCredit_transactionTo = Math.round((Number(transactionTo.credit) + Number(creditToMove)) * 100) / 100;
    $('#moveTransactionFrom_credit').html(newCredit_transactionFrom);
    $('#moveTransactionTo_credit').html(newCredit_transactionTo);
}

function readCreditToMove() {
    return $('#creditToMove').prop('value');
}

function clickMoveSave() {

    let creditToMove = readCreditToMove();
    if (!((creditToMove > 0) || (creditToMove < 0))) {
        showUserMessage('\'Credit to move\' must have a value less than 0 or greater than 0' , isError = true);
        return;
    }

    $.ajax(
        {
            type: 'post',
            url: getLocationHrefWithoutTrailingSlash() + '/Transactions/MoveWages/',
            data: {
                transactionIdFrom: transactionFrom.transactionId,
                transactionIdTo: transactionTo.transactionId,
                creditToMove: creditToMove
            },
            success: function (data, status, xhr) {
                showMoveTransactions();
                showUserMessage('Credit ' + data.creditToMove + ' moved from transaction ' + data.transactionIdFrom + ' to ' + data.transactionIdTo + '.', isError=false);
                searchAndDisplayTransactions({
                    callback: function () {
                        selectItems(transactionClass, [transactionFrom.transactionId, transactionTo.transactionId]);
                    }
                });
                selectItems(transactionClass, [data.transactionIdFrom, data.transactionIdTo]);
                hideSection('moveWages');
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}

function showMoveTransaction(transaction, elementIdPrefix) {
    $('#' + elementIdPrefix + '_id').html(transaction.transactionId);
    $('#' + elementIdPrefix + '_yearPeriodDesc').html(transaction.yearPeriodDesc);
    $('#' + elementIdPrefix + '_effDate').html(formatDateTimeAsDateDDMMYYYY(transaction.effDate));
    $('#' + elementIdPrefix + '_categoryName').html(transaction.category.name);
    $('#' + elementIdPrefix + '_description').html(transaction.description);
    $('#' + elementIdPrefix + '_debit').html(formatCurrency(transaction.debit));
    $('#' + elementIdPrefix + '_credit').html(formatCurrency(transaction.credit));
    $('#' + elementIdPrefix + '_isWage').html(getIsWageDesc(transaction));
}

function getIsWageDesc(transaction) {
    let isWageDesc = transaction.isWage ? 'Y' : '';
    if (transaction.isWage) {
        if (transaction.wageTotalForEffDate > 0) {
            isWageDesc += ' (' + formatCurrency(transaction.wageTotalForEffDate) + ')';
        }
    }
    return isWageDesc;
}

