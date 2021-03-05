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
const { isAuthenticated } = require('../helpers/auth');

router.get('/category', renderCategories)

router.get('/category/:category', viewCategory)

router.get('/new-category', isAuthenticated, newCategoryForm);

router.post('/new-category', isAuthenticated, saveCategory);

router.get('/edit-category/:id', isAuthenticated, editCategoryForm);

router.put('/edit-category/:id', isAuthenticated, saveEditCategory);

router.delete('/delete-category/:id', isAuthenticated, deleteCategory);

module.exports = router;