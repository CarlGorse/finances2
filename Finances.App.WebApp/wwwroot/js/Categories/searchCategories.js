
function searchAndDisplayCategories(params) {

    $.ajax(
        {
            type: 'post',
            url: getLocationHrefWithoutTrailingSlash() + '/Search/',
            success: function (data, status, xhr) {
                $('#categories').html(getCategoriesHtml(data.categories));
                if (params) {
                    if (typeof (params.callback) == "function") {
                        params.callback(data);
                    }
                    if (params.displayUserMessage) {
                        let categoriesCount = data.categories.length;
                        showUserMessage(categoriesCount + ' ' + (categoriesCount == 1 ? categoryClass.lDescription : categoryClass.lDescriptionPlural) + ' listed.', isError = false);
                    }
                }
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );

}

function getCategoriesHtml(categories) {

    if (categories == null) {
        return;
    }

    //let html = $('#addRow').prop('outerHTML');
    let html = '';

    categories.forEach(function (category, index) {

        let trClass = '';

        html += '<tr data-toggle="tooltip" title="CategoryId=' + category.categoryId + '"';
        if (trClass.length > 0) {
            html += ' style="' + trClass + '"';
        }
        html += ' id="category' + category.categoryId + '">';
        

        html += '<td>';
        html += '<input type="checkbox" name="categorySelector" id="categorySelector' + category.categoryId + '" value=' + category.categoryId + ' onclick=clickItemSelector(categoryClass, ' + category.categoryId + ')>';
        html += '</td>';

        html += '<td class="vertical-border-only align-left">' + setNullToString(category.group.name) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(category.name) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(category.groupDisplayOrder) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(category.doNotDisplay) + '</td>';

        html += '</tr>';
    })

    return html;
}