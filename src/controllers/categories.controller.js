const categoryCtrl = {};
const Article = require('../models/Article');
const Category = require('../models/Category');

categoryCtrl.renderCategories = async (req, res) => {
    const category = await Category.find().lean()
    res.render('categories/allCategories', {category});
}

categoryCtrl.viewCategory = async (req, res) => {
    try {
        const category = await Category.findOne({category:req.params.category});
        const article = await Article.find({category: category.category}).lean();
        res.render('index', {article})
    } catch (error) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');
    } 
}

categoryCtrl.newCategoryForm = (req, res) => {
    res.render('categories/new-category');
}

categoryCtrl.saveCategory = async (req, res) => {
    console.log(req.body);
    const { categoryName } = req.body
    const category = new Category({ categoryName });
    category.category = categoryName.replace(/ /g, '-').toLowerCase();
    try {
        await category.save()
        req.flash('success_msg', 'Category added successfully');
        res.redirect('/category');
    } catch (err) {
        // console.error(err);
        let error = "Comprueba que la Categoria no este repetida";
        res.render('categories/new-category', { error, categoryName });    
    }
}

categoryCtrl.editCategoryForm = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        res.render('categories/edit-category', {category});
    } catch (error) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');
    }
}

categoryCtrl.saveEditCategory = async (req, res) => {
    const {categoryName} = req.body;
    const category = categoryName.replace(/ /g, '-').toLowerCase();
    try {
        const item = await Category.findByIdAndUpdate(req.params.id, {categoryName, category})
        const article = await Article.find({category: item.category}) 
        if (article[0] != category) {
            article.forEach(async element => {
                await Article.findByIdAndUpdate(element._id, {category});
            })
        }
        req.flash('success_msg', 'category edited successfully');
        res.redirect('/category');
    } catch (err) {
        // console.error(err);
        let error = "Comprueba que la Categoria no este repetida";
        res.render('categories/edit-category', {error, categoryName, category, _id: req.params.id});
    }
}

categoryCtrl.deleteCategory = async (req, res) => {
    try {
        const item = await Category.findByIdAndDelete(req.params.id);
        const articles = await Article.find({category: item.category});
        articles.forEach( async element => {
            await Article.findByIdAndDelete(element._id);
        });
        req.flash('success_msg', 'Category deleted successfully');
        res.redirect('/category');
    } catch (err) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');
        
    }
}

module.exports = categoryCtrl;