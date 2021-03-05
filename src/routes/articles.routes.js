const { Router } = require('express');
const {
    renderArticle,
    newArticleForm,
    saveNewArticle,
    editArticleForm,
    saveEditArticle,
    deleteArticle
} = require('../controllers/articles.controller');
const router = Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/article/:title', renderArticle);

router.get('/new-article', isAuthenticated, newArticleForm);

router.post('/new-article', isAuthenticated, saveNewArticle);

router.get('/edit-article/:id', isAuthenticated, editArticleForm);

router.put('/edit-article/:id', isAuthenticated, saveEditArticle);

router.delete('/delete-article/:id', isAuthenticated, deleteArticle);

module.exports = router;