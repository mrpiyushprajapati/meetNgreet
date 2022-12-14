const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to monggoDB'));

db.once('open', function(){
    console.log('connected to Database :: MongoDB');
})

module.exports = db;