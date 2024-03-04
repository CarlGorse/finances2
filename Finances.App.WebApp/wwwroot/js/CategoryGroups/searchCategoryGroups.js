
function searchAndDisplayCategoryGroups(params) {

    $.ajax(
        {
            type: 'post',
            url: getLocationHrefWithoutTrailingSlash() + '/Search/',
            success: function (data, status, xhr) {
                $('#categoryGroups').html(getCategoryGroupsHtml(data.categoryGroups));
                if (params) {
                    if (typeof (params.callback) == "function") {
                        params.callback(data);
                    }
                    if (params.displayUserMessage) {
                        let categoryGroupsCount = data.categoryGroups.length;
                        showUserMessage(categoryGroupsCount + ' ' + (categoryGroupsCount == 1 ? categoryGroupClass.lDescription : categoryGroupClass.lDescriptionPlural) + ' listed.', isError = false);
                    }
                }
            },
            error: function (data, status, xhr) {
                showValidationErrors(JSON.parse(data.responseText).validationErrors);
            }
        }
    );

}

function getCategoryGroupsHtml(categoryGroups) {

    if (categoryGroups == null) {
        return;
    }

    //let html = $('#addRow').prop('outerHTML');
    let html = '';

    categoryGroups.forEach(function (categoryGroup, index) {

        let trClass = '';

        html += '<tr data-toggle="tooltip" title="CategoryGroupId=' + categoryGroup.categoryGroupId + '"';
        if (trClass.length > 0) {
            html += ' style="' + trClass + '"';
        }
        html += ' id="categoryGroup' + categoryGroup.categoryGroupId + '">';
        

        html += '<td>';
        html += '<input type="checkbox" name="categoryGroupSelector" id="categoryGroupSelector' + categoryGroup.categoryGroupId + '" value=' + categoryGroup.categoryGroupId + ' onclick=clickItemSelector(categoryGroupClass, ' + categoryGroup.categoryGroupId + ')>';
        html += '</td>';

        html += '<td class="vertical-border-only align-left">' + setNullToString(categoryGroup.name) + '</td>';
        html += '<td class="vertical-border-only align-left">' + setNullToString(categoryGroup.displayOrder) + '</td>';

        html += '</tr>';
    })

    return html;
}