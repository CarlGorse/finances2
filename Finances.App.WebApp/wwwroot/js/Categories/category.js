
function clickAddEditSave(addOrEdit) {

    if (addOrEdit == 'add') {
        let url = getLocationHrefWithoutTrailingSlash() + '/Add/';
        clickAddSaveItem(categoryClass, url);
    }
    else {
        let url = getLocationHrefWithoutTrailingSlash() + '/Edit/';
        clickEditSaveItem(categoryClass, url);
    }
}

function clickDelete() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Delete/';
    clickDeleteItem(categoryClass, url);
}

function clickEdit() {
    let url = getLocationHrefWithoutTrailingSlash() + '/Get/';
    clickEditItem(categoryClass, url);
}

function showAddEditCategory(category, addEdit) {
    $('#' + addEdit + 'Category_categoryId').prop('value', category.categoryId);
    $('#' + addEdit + 'Category_name').prop('value', category.name);
    $('#' + addEdit + 'Category_groupId').prop('value', category.groupId);
    $('#' + addEdit + 'Category_groupDisplayOrder').prop('value', category.groupDisplayOrder);
}

function createCategoryJsonFromElements(addEdit) {
    return {
        category: {
            categoryId: $('#' + addEdit + 'Category_categoryId').prop('value'),
            name: $('#' + addEdit + 'Category_name').prop('value'),
            groupId: $('#' + addEdit + 'Category_groupId').prop('value'),
            groupDisplayOrder: $('#' + addEdit + 'Category_groupDisplayOrder').prop('value'),
        }
    }
}