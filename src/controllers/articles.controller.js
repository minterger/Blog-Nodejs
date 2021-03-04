const articleCtl = {};
const Article = require('../models/Article');
const Category = require('../models/Category');
const marked = require('marked');

articleCtl.renderArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ titleUrl: req.params.title }).lean();
        if (article) {
            res.render('articles/render-article', { article });
        } else {
            throw new Error('This article does not exist');
        }
    } catch (error) {
        req.flash('error_msg', error.message);
        res.redirect('/');
    }
}

articleCtl.newArticleForm = async (req, res) => {
    try {
        const category = await Category.find().lean();
        res.render('articles/new-article', { category });
    } catch (error) {
        res.render('articles/new-article');
    }
}

articleCtl.saveNewArticle = async (req, res) => {
    const { title, image, author, description, contentMd, category } = req.body;
    const article = new Article({ title, image, author, description, contentMd, content: marked(contentMd), category });
    article.titleUrl = title.replace(/ /g, '-').toLowerCase();
    try {
        await article.save();
        req.flash('success_msg', 'Article Added Successfully');
        res.redirect('/');
    } catch (err) {
        let error = "Comprueba que esten todos los campos llenos y que el Titulo no este repetido";
        const category = await Category.find().lean()
        res.render('articles/new-article', { error, article: req.body, category });

    }
}

articleCtl.editArticleForm = async (req, res) => {
    try {
        const results = await Promise.all([
            Article.findById(req.params.id).lean(),
            Category.find().lean()
        ])
        res.render('articles/edit-article', { article: results[0], category: results[1] });
    } catch (error) {
        req.flash('error_msg', 'This article does not exist');
        res.redirect('/');
    }
}

articleCtl.saveEditArticle = async (req, res) => {
    const { title, image, description, contentMd, category } = req.body
    req.body._id = req.params.id
    let titleUrl = title.replace(/ /g, '-').toLowerCase();
    try {
        await Article.findByIdAndUpdate(req.params.id, { title, titleUrl, image, description, contentMd, content: marked(contentMd), category })
        req.flash('success_msg', 'Article Edited Successfully');
        res.redirect('/');

    } catch (err) {
        let error = "Comprueba que esten todos los campos llenos y que el Titulo no este repetido";
        const category = await Category.find().lean();
        res.render('articles/edit-article', { error, article: req.body, category });
    }
}

articleCtl.deleteArticle = async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id)
        req.flash('success_msg', 'Article Deleted Successfully');
    } catch (error) {
        req.flash('error_msg', 'This article does not exist')

    }
    res.redirect('/');
}

module.exports = articleCtl;