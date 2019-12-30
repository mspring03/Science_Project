const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: String,
    password: String,
    nick: String
})

User.statics.findoneid = function(id) {
    return this.findOne({
        id,
    }).exec();
}

User.statics.create = function(id, password, nick) {
    const user = new this({
        id, 
        password,
        nick
    });

    user.save();
}

module.exports = mongoose.model('User', User);