
var currentItemClass;

const transactionClass = {
    lName: 'transaction',
    lNamePlural: 'transactions',
    uName: 'Transaction',
    uNamePlural: 'Transactions',
    lDescription: 'transaction',
    lDescriptionPlural: 'transactions',
    uDescription: 'Transaction'
}

const categoryClass = {
    lName: 'category',
    lNamePlural: 'categories',
    uName: 'Category',
    uNamePlural: 'Categories',
    lDescription: 'category',
    lDescriptionPlural: 'categories',
    uDescription: 'Category'
}

const categoryGroupClass = {
    lName: 'categoryGroup',
    lNamePlural: 'categoryGroups',
    uName: 'CategoryGroup',
    uNamePlural: 'CategoryGroups',
    lDescription: 'category group',
    lDescriptionPlural: 'category groups',
    uDescription: 'Category group'
}

function setCurrentItemClass(itemClass) {
    currentItemClass = itemClass;
}