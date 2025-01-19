
function sortCategories(categories) {

    return categories?.sort(function (a, b) {
        if ((a.Group.Name < b.Group.Name)) {
            return -1;
        }
        else if (a.Group.Name === b.Group.Name) {
            if (a.Name < b.Name) {
                return -1;
            }
            else if (a.Name > b.Name) {
                return 1;
            }
            else {
                return 0;
            }
        }
        else {
            return 1;
        }
    })
};

export { sortCategories };