
function clickAddEditSave(addOrEdit) {

    if (addOrEdit == 'add') {
        let url = getLocationHrefWithoutTrailingSlash() + '/Transactions/Add/';
        clickAddSaveItem(transactionClass, url);
    }
    else {
        let url = getLocationHrefWithoutTrailingSlash() + '/Transactions/Edit/';
        clickEditSaveItem(transactionClass, url);
    }
}

function clickDelete() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Transactions/Delete/';
    clickDeleteItem(transactionClass, url);
}

function clickEdit() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Transactions/Get/';
    clickEditItem(transactionClass, url);
}

function showAddEditTransaction(transaction, addEdit) {
    $('#' + addEdit + 'Transaction_transactionId').prop('value', transaction.transactionId);
    $('#' + addEdit + 'Transaction_effDate').prop('value', formatDateTimeAsDateDDMMYYYY(transaction.effDate));
    $('#' + addEdit + 'Transaction_accountId').prop('value', transaction.accountId);
    $('#' + addEdit + 'Transaction_categoryId').prop('value', transaction.categoryId);
    $('#' + addEdit + 'Transaction_description').prop('value', transaction.description);
    $('#' + addEdit + 'Transaction_item').prop('value', transaction.item);
    $('#' + addEdit + 'Transaction_debit').prop('value', formatCurrency(transaction.debit));
    $('#' + addEdit + 'Transaction_credit').prop('value', formatCurrency(transaction.credit));
    $('#' + addEdit + 'Transaction_isWage').prop('value', transaction.isWage.toString());
    $('#' + addEdit + 'Transaction_exclude').prop('value', transaction.exclude.toString());
}

function createTransactionJsonFromElements(addEdit) {
    let transaction = {
            transactionId: $('#' + addEdit + 'Transaction_transactionId').prop('value'),
            AccountId: $('#accountId option:Selected').val(),
            effDate: $('#' + addEdit + 'Transaction_effDate').prop('value'),
            categoryId: $('#' + addEdit + 'Transaction_categoryId').prop('value'),
            description: $('#' + addEdit + 'Transaction_description').prop('value'),
            item: $('#' + addEdit + 'Transaction_item').prop('value'),
            Debit: $('#' + addEdit + 'Transaction_debit').prop('value'),
            Credit: $('#' + addEdit + 'Transaction_credit').prop('value'),
            exclude: $('#' + addEdit + 'Transaction_exclude').prop('value'),
            isWage: $('#' + addEdit + 'Transaction_isWage').prop('value')
    };

    if (addEdit == 'add') {
        return {
            model: {
                CategoryIdToDeductWageFrom: $('#' + addEdit + 'Transaction_categoryIdToDeductWageFrom').prop('value'),
                Transaction: transaction
            }
        }
    }
    else {
        return { transaction }
    }
}