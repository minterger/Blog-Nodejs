const articleCtl = {};
const Article = require('../models/Article')

articleCtl.newArticleForm = (req, res) => {
    res.render('articles/new-article');
}

articleCtl.saveNewArticle = (req, res) => {
    res.send('new article are saved');
}

articleCtl.editArticleForm = (req, res) => {
    res.render('articles/edit-article');
}

articleCtl.saveEditArticle = (req, res) => {
    res.send('save article edited');
}

articleCtl.deleteArticle = (req, res) => {
    Article.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Article Deleted Successfully');
    res.redirect('/');
}

module.exports = articleCtl;