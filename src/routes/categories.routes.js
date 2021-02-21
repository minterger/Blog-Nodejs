const {Router} = require('express');
const { model } = require('mongoose');
const {
    newCategoryForm,
    saveCategory,
    editCategoryForm,
    saveEditCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const router = Router();

router.get('/new-category', newCategoryForm);

router.post('/new-category', saveCategory);

router.get('/edit-category/:id', editCategoryForm);

router.put('/edit-category/:id', saveEditCategory);

router.delete('/delete-category/:id', deleteCategory);

module.exports = router;