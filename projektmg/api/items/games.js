const mongoose = require('mongoose');
 
const gamesSchema = mongoose.Schema({
    title: String,
    genre: String,
    platforms: String,
    year: Number,
});
 
module.exports = mongoose.model('Games', gamesSchema);