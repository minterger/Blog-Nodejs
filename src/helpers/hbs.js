const { create } = require('express-handlebars');
const hbs = create({});

hbs.handlebars.registerHelper('prueba', () => {
    let hola = 'hola mundo'
    return hola
})

module.exports = hbs