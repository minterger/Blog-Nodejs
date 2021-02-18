const mongoose = require('mongoose');

const {MONGODB_IP, MONGODB_DB} = process.env;
const CONNECT = `mongodb://${MONGODB_IP}/${MONGODB_DB}`;

mongoose.connect(CONNECT, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('database is connected'))
    .catch(err =>console.log(err.reason))