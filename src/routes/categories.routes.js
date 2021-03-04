const { Router } = require('express');
const {
    renderCategories,
    viewCategory,
    newCategoryForm,
    saveCategory,
    editCategoryForm,
    saveEditCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const router = Router();

router.get('/category', renderCategories)

router.get('/category/:category', viewCategory)

router.get('/new-category', newCategoryForm);

router.post('/new-category', saveCategory);

router.get('/edit-category/:id', editCategoryForm);

router.put('/edit-category/:id', saveEditCategory);

router.delete('/delete-category/:id', deleteCategory);

module.exports = router;