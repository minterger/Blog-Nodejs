const articleCtl = {};
const Article = require('../models/Article');
const Category = require('../models/Category');
const Comment = require('../models/Comment');
const marked = require('marked');
const md5 = require('md5');

// renderiza el contenido del un articulo
articleCtl.renderArticle = async (req, res) => {
    try {
        const article = await Article.findOne({ titleUrl: req.params.title }).lean();
        const comments = await Comment.find({ postId: article._id }).sort({ createdAt: -1 }).lean();
        if (article) {
            res.render('articles/render-article', { article, comments });
        } else {
            throw new Error('This article does not exist');
        }
    } catch (error) {
        req.flash('error_msg', error.message);
        res.redirect('/');
    }
}

articleCtl.postComment = async (req, res) => {
    const { name, email, comment } = req.body;
    if (name != 'Minterger' && name != 'minterger' || req.user) {
        const commentary = new Comment({ name, email, comment });
        commentary.gravatar = md5(commentary.email);
        commentary.postId = req.params.postId;
        try {
            await commentary.save();
            req.flash('success_msg', 'Commentary added');
            res.redirect('/article/' + req.params.titleUrl)
        } catch (error) {
            console.log(error);
            req.flash('error_msg', 'error');
            res.redirect('/article/' + req.params.titleUrl)
        }
    } else {
        req.flash('error_msg', 'Name Of Admin');
        res.redirect('/article/' + req.params.titleUrl)
    }
}

// muetra el formulario para crear un nuevo articulo
articleCtl.newArticleForm = async (req, res) => {
    try {
        const category = await Category.find().lean();
        res.render('articles/new-article', { category });
    } catch (error) {
        res.render('articles/new-article');
    }
}

// guarda el articulo
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

// muetra el formulario de edicion de articulos
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

// guarda el articulo editado
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

// elimina el articulo
articleCtl.deleteArticle = async (req, res) => {
    try {
        const item = await Article.findByIdAndDelete(req.params.id);
        const response = await Comment.deleteMany({ postId: item._id });
        console.log(response);
        req.flash('success_msg', 'Article Deleted Successfully');
    } catch (error) {
        req.flash('error_msg', 'This article does not exist');

    }
    res.redirect('/');
}

module.exports = articleCtl;