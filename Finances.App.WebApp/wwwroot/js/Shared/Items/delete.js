
function clickDeleteItem(itemClass, url, searchFunctionName) {

    hideAllSections();
    clearUserMessages();

    let selectedIds = getSelectedItemIds(itemClass);

    if (selectedIds.length == 0) {
        showValidationError('A ' + itemClass.lName + ' must be selected.')
        return;
    }

    $.ajax(
        {
            type: 'post',
            url: url,
            data: {
                ids: selectedIds
            },
            traditional: true,
            success: function (data, status, xhr) {
                let itemCount = data['ids'].length;
                window['searchAndDisplay' + itemClass.uNamePlural]({
                    callback: function (data) {
                        clearSelectedItems(itemClass.lName);
                        showUserMessage(itemCount + ' ' + ((itemCount == 1) ? itemClass.lDescription : itemClass.lDescriptionPlural) + ' deleted.', isError=false);
                    }
                });
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}



