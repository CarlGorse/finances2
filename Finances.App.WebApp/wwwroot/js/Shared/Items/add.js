
function clickAdd() {

    clearUserMessages();

    hideAllSectionsExcept('add');
    if (isSectionVisible('add')) {
        showHideSection('add');
        return;
    }

    showSection('add');
}

function clickAddSaveItem(itemClass, url) {
    $.ajax(
        {
            type: 'post',
            url: url,
            data: window['create' + itemClass.uName + 'JsonFromElements']('add'),
            success: function (data, status, xhr) {
                window['searchAndDisplay' + itemClass.uNamePlural]({
                    callback: function () {
                        clickAddSaveCallback(itemClass, data);
                    }
                });
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );
}

function clickAddSaveCallback(itemClass, id) {
    clearSelectedItems(itemClass);
    selectItem(itemClass, id);
    showUserMessage(itemClass.uDescription + ' ' + id + ' added.', isError = false);
}