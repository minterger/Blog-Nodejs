const categoryCtrl = {};

categoryCtrl.newCategoryForm = (req, res) => {
    res.render('categories/new-category');
}

categoryCtrl.saveCategory = (req, res) => {
    res.send('save category');
}

categoryCtrl.editCategoryForm = (req, res) => {
    res.render('categories/edit-category');
}

categoryCtrl.saveEditCategory = (req, res) => {
    res.send('category edited sussccesfully');
}

categoryCtrl.deleteCategory = (req, res) => {
    res.send('deleted category');
}

module.exports = categoryCtrl;