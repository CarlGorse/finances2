
function clickAddEditSave(addOrEdit) {

    if (addOrEdit == 'add') {
        let url = getLocationHrefWithoutTrailingSlash() + '/Add/';
        clickAddSaveItem(categoryGroupClass, url);
    }
    else {
        let url = getLocationHrefWithoutTrailingSlash() + '/Edit/';
        clickEditSaveItem(categoryGroupClass, url);
    }
}

function clickDelete() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Delete/';
    clickDeleteItem(categoryGroupClass, url);
}

function clickEdit() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Get/';
    clickEditItem(categoryGroupClass, url);
}

function showAddEditCategoryGroup(categoryGroup, addEdit) {
    $('#' + addEdit + 'CategoryGroup_categoryGroupId').prop('value', categoryGroup.categoryGroupId);
    $('#' + addEdit + 'CategoryGroup_name').prop('value', categoryGroup.name);
    $('#' + addEdit + 'CategoryGroup_displayOrder').prop('value', categoryGroup.displayOrder);
}

function createCategoryGroupJsonFromElements(addEdit) {
    return {
        categoryGroup: {
            categoryGroupId: $('#' + addEdit + 'CategoryGroup_categoryGroupId').prop('value'),
            name: $('#' + addEdit + 'CategoryGroup_name').prop('value'),
            displayOrder: $('#' + addEdit + 'CategoryGroup_displayOrder').prop('value')
        }
    }
}