const indexCtrl = {};
const Article = require('../models/Article');

// muestra todos los articulos
indexCtrl.renderIndex = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const article = await Article.paginate({}, {
        limit,
        page,
        lean: true,
        sort: { createdAt: -1 }
    });
    if (article.page > article.totalPages) {
        res.redirect('/')
    }
    res.render('index', { article });

}

// muestra el about page
indexCtrl.renderAbout = (req, res) => {
    res.render('about');
}

module.exports = indexCtrl;