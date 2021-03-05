const { create } = require('express-handlebars');
const hbs = create({});

hbs.handlebars.registerHelper('compare', (item1, item2) => {
    if (item1 == item2) {
        return true
    } else {
        return false
    }
})

hbs.handlebars.registerHelper('username', (user) => {
    return user.name;
})

hbs.handlebars.registerHelper('date', (date) => {
    if (date) {
        let dateNow = date.toLocaleDateString();
        return dateNow
    } else {
        return null
    }
})

module.exports = hbs