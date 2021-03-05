const { create } = require('express-handlebars');
const hbs = create({});

hbs.handlebars.registerHelper('compare', (item1, item2) => {
    if (item1 == item2) {
        return true
    } else {
        return false
    }
})

hbs.handlebars.registerHelper('date', (date) => {
    if (date) {
        let dateNow = date.toLocaleDateString();
        return dateNow;
    } else {
        return null;
    }
})

hbs.handlebars.registerHelper('pagination', (article, category) => {
    if (article.totalPages > 1) {
        
        const li = [];
        let i = article.page > 2 ? article.page - 2 : 1;
        let ifcategory = typeof(category) == 'string' ? `category/${category}` : '';
        if (i != 1) {    
            li.push('<li><a href="#">...</a></li>')
        }
        for (; i <= (article.page + 2); i++) {
            if (i == article.page && i !== article.totalPages) {
                li.push(`<li disabled><a href="#">${i}</a></li>`)
            } else if (i !== article.totalPages) {
                li.push(`<li><a href="/${ifcategory}?page=${i}">${i}</a></li>`)
            } else {
                if (i == article.page) {
                    li.push(`<li disabled><a href="#">${i}</a></li>`)
                    break
                }
                li.push(`<li><a href="/${ifcategory}?page=${i}">${i}</a></li>`)
                break
            }
        }
        if (article.page < article.totalPages -2) {
            li.push('<li><a href="#">...</a></li>')
        }
        return li
    } else {
        return null
    }
})

module.exports = hbs