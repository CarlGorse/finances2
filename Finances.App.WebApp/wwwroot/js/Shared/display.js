
function showUserMessage(message, isError) {

    $('#user-messages').html('<span>' + message + '</spam>');

    if (isError == true) {
        $('#user-messages').css("color", "red");
    }
    else {
        $('#user-messages').css("color", "blue");
    }

    if (message == '') {
        $('#user-messages').hide();
    }
    else {
        $('#user-messages').show();
    }

}

function showValidationError(message) {
    showUserMessage(message, isError=true);
}

function showValidationErrors(validationErrors) {
    let message = '';
    $.each(validationErrors, function (index, error) { message += error + '<br/>' });
    showUserMessage(message, isError=true);
}

function clearUserMessages() {
    showUserMessage(message='', isError=false);
}

function getSectionElement(sectionName) {
    return $('#' + sectionName + '-section');
}

function getSectionButton(sectionName) {
    return $('#' + sectionName + '-button');
}

function isSectionVisible(sectionName) {
    let sectionElement = getSectionElement(sectionName);
    return sectionElement.hasClass('visible');
}

function getHiddenElement(sectionName) {
    return $('[name="show-' + sectionName + '"]');
}

function showSection(sectionName) {

    let sectionElement = getSectionElement(sectionName);

    sectionElement.addClass('visible');
    sectionElement.removeClass('hidden');

    sectionNames.forEach(function (otherSectionName) {
        if (otherSectionName != sectionName) {
            hideSection(otherSectionName);
        }
    })

    let button = getSectionButton(sectionName);
    button.removeClass('unselectedButton');
    button.addClass('selectedButton');
}

function hideSection(sectionName) {

    let sectionElement = getSectionElement(sectionName);

    sectionElement.removeClass('visible');
    sectionElement.addClass('hidden');

    let button = getSectionButton(sectionName);
    button.removeClass('selectedButton');
    button.addClass('unselectedButton');
}

function showHideSection(sectionName) {
    if (isSectionVisible(sectionName)) {
        hideSection(sectionName);
    }
    else {
        showSection(sectionName);
    }
}

function hideAllSections() {
    sectionNames.forEach(function (item) {
        hideSection(item)
    })
}

function hideAllSectionsExcept(sectionName) {
    sectionNames.forEach(function (item) {
        if (item != sectionName) {
            hideSection(item)
        }
    })
}

function getSelectedItemIds(itemClass) {
    let selectedIds = [];
    let ptr = -1;
    getItemSelectors(itemClass).forEach(function (item) {
        if (item.checked) {
            ptr++;
            selectedIds[ptr] = $(item).prop('value');
        }
    })
    return selectedIds;
}

function getSelectedItemId(itemClass) {
    return getSelectedItemIds(itemClass)[0];
}

function getSelectedItemsCount(itemClass) {
    return getSelectedItemIds(itemClass).length;
}

function getItemById(itemClass, id, callback) {
    return $.ajax({
        type: 'get',
        url: getLocationHrefWithoutTrailingSlash() + '/Get' + itemClass.uName + 'ById/?' + itemClass.uName + 'Id=' + id,
        success: function (data, status, xhr) {
            callback(data);
        }
    });
}

function getItemsByIds(itemClass, ids, callback) {
    return $.ajax({
        type: 'get',
        url: getLocationHrefWithoutTrailingSlash() + '/Get' + itemClass.uNameName + 'ByIds/?' + itemClass.uName + 'Ids=' + ids,
        success: function (data, status, xhr) {
            callback(data);
        }
    });
}

function selectItem(itemClass, id) {
    $('#' + itemClass.lName + 'Selector' + id).prop('checked', true);
    $('#' + itemClass.lName + id).css('background-color', 'cornsilk');
}

function clickItemSelector(itemClass, id) {
    if ($('#' + itemClass.lName + 'Selector' + id).prop('checked') == false) {
        deselectItem(itemClass, id);
    }
    else {
        selectItem(id);
    }
}

function selectItems(itemClass, ids) {
    ids.forEach(id => selectItem(itemClass, id));
}

function resetItemDisplay(itemClass) {
    hideAllSections();
    clearSelectedItems(itemClass);
    clearUserMessages();
}

function clearSelectedItems(itemClass) {
    getItemSelectors(itemClass).forEach(function (item) {
        deselectItem(itemClass, item.value);
    })
    $('#Selected' + itemClass.uName + 'Ids').prop('value', '');
}

function deselectItem(itemClass, id) {
    $('#' + itemClass.lName + 'Selector' + id).prop('checked', false);
    $('#' + itemClass.lName + id).css('background-color', '');
}

function getItemSelectors(itemClass) {
    return document.getElementsByName(itemClass.lName + 'Selector');
}