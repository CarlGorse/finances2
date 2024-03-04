
function clickEditItem(itemClass, url) {

    clearUserMessages();

    hideAllSectionsExcept('edit');
    if (isSectionVisible('edit')) {
        showHideSection('edit');
        return;
    }

    let selectedIds = getSelectedItemIds(itemClass);
    if (selectedIds.length == 0) {
        showValidationError('A ' + itemClass.lName + ' must be selected.')
        return;
    }
    if (selectedIds.length > 1) {
        showValidationError('Only one ' + itemClass.lName + ' can be edited at a time.')
        return;
    }

    $.ajax(
        {
            type: 'post',
            url: url,
            data: { ids: selectedIds[0] },
            success: function (data, status, xhr) {
                window['showAddEdit' + itemClass.uName](data.items[0], 'edit');
                showSection('edit');
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}

function clickEditSaveItem(itemClass, url) {
    $.ajax(
        {
            type: 'post',
            url: url,
            data: window['create' + itemClass.uName + 'JsonFromElements']('edit'),
            success: function (data, status, xhr) {
                window['searchAndDisplay' + itemClass.uNamePlural]({
                    callback: function () {

                        let id = data.item[itemClass.lName + 'Id'];

                        clearSelectedItems(itemClass);
                        selectItem(itemClass, id);
                        hideSection('edit')
                        showUserMessage(itemClass.uDescription + ' ' + id + ' edited.', isError=false);
                    }
                });
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}


