const indexCtrl = {};
const Article = require('../models/Article');

indexCtrl.renderIndex = async (req, res) => {
    const article = await Article.find().sort({ createdAt: -1 }).lean()
    res.render('index', { article });
}

indexCtrl.renderAbout = (req, res) => {
    res.render('about');
}

module.exports = indexCtrl;