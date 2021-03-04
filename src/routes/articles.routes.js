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

router.get('/article/:title', renderArticle);

router.get('/new-article', newArticleForm);

router.post('/new-article', saveNewArticle);

router.get('/edit-article/:id', editArticleForm);

router.put('/edit-article/:id', saveEditArticle);

router.delete('/delete-article/:id', deleteArticle);

module.exports = router;