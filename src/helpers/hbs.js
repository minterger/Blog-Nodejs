const { create } = require('express-handlebars');
const hbs = create({});

// compara dos items
hbs.handlebars.registerHelper('compare', (item1, item2) => {
    if (item1 == item2) {
        return true
    } else {
        return false
    }
})

// muestra la fecha según el lugar
hbs.handlebars.registerHelper('date', (date) => {
    if (date) {
        let dateNow = date.toLocaleDateString();
        return dateNow;
    } else {
        return null;
    }
})

// renderiza la paginacion
hbs.handlebars.registerHelper('pagination', (article, category) => {
    if (article.totalPages > 1) {
        
        const li = [];
        let i = article.page > 2 ? article.page - 2 : 1;
        let ifcategory = typeof(category) == 'string' ? `category/${category}` : '';
        if (i != 1) {    
            li.push('<li><a class="link disabled" href="#">...</a></li>')
        }
        for (; i <= (article.page + 2); i++) {
            if (i == article.page && i !== article.totalPages) {
                li.push(`<li><a class="link selected disabled" href="#">${i}</a></li>`)
            } else if (i !== article.totalPages) {
                li.push(`<li><a class="link" href="/${ifcategory}?page=${i}">${i}</a></li>`)
            } else {
                if (i == article.page) {
                    li.push(`<li><a class="link selected disabled" href="#">${i}</a></li>`)
                    break
                }
                li.push(`<li><a class="link" href="/${ifcategory}?page=${i}">${i}</a></li>`)
                break
            }
        }
        if (article.page < article.totalPages -2) {
            li.push('<li><a class="link disabled" href="#">...</a></li>')
        }
        return li
    } else {
        return null
    }
})

module.exports = hbs