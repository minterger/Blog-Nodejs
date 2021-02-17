const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('database is connected'))
    .catch(err =>console.log(err.reason))