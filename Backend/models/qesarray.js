const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qesarray = new Schema({
    level: Number,
    questionId: [String]
})

// qesarray.statics.create = function(level, questionId) {
//     retrun 
// }

qesarray.statics.add = function (level) {
    const Qesarray = new this({
        level,
    });

    Qesarray.save();
}

qesarray.statics.findLevelArray = function (level) {
    return this.findOne({
        level,
    }).exec();  
}


module.exports = mongoose.model('qesarray', qesarray);