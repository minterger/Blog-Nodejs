const categoryCtrl = {};
const Article = require('../models/Article');
const Category = require('../models/Category');

// muestra todas las categorias existentes
categoryCtrl.renderCategories = async (req, res) => {
    const category = await Category.find().lean()
    res.render('categories/allCategories', { category });
}

// muestra los articulos dentro de una categoria
categoryCtrl.viewCategory = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    try {
        const category = await Category.findOne({ category: req.params.category }).lean();
        const article = await Article.paginate({ category: category.category }, {
            page,
            limit,
            lean: true,
            sort: { createdAt: -1 }
        });
        res.render('index', { article, category })
    } catch (error) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');
    }
}

// muestra el formulario para crear categorias
categoryCtrl.newCategoryForm = (req, res) => {
    res.render('categories/new-category');
}

// guarda la categoria en la base de datos
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

// muestra el formulario de edicion de categoria si la categoria existe
categoryCtrl.editCategoryForm = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        res.render('categories/edit-category', { category });
    } catch (error) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');
    }
}

/* guarda los datos de la categoria editada y 
les modifica la categoria a los articulos que contienen esa categoria */
categoryCtrl.saveEditCategory = async (req, res) => {
    const { categoryName } = req.body;
    const category = categoryName.replace(/ /g, '-').toLowerCase();
    try {
        const item = await Category.findByIdAndUpdate(req.params.id, { categoryName, category });
        const response = await Article.updateMany({ category: item.category }, {category});
        console.log(response);
        req.flash('success_msg', 'category edited successfully');
        res.redirect('/category');
    } catch (err) {
        // console.error(err);
        let error = "Comprueba que la Categoria no este repetida";
        res.render('categories/edit-category', { error, categoryName, category, _id: req.params.id });
    }
}


// elimina la categoria y los articulos que contiene
categoryCtrl.deleteCategory = async (req, res) => {
    try {
        const item = await Category.findByIdAndDelete(req.params.id);
        const response = await Article.deleteMany({category: item.category});
        console.log(response);
        req.flash('success_msg', 'Category deleted successfully');
        res.redirect('/category');
    } catch (err) {
        req.flash('error_msg', 'This Category does not exist');
        res.redirect('/category');

    }
}

module.exports = categoryCtrl;