const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../config');
const autoIncrement = require('mongoose-auto-increment');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const connection = mongoose.createConnection(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

autoIncrement.initialize(connection);

const question = new Schema({
    level: Number,
    qesname: String,
    qesContent: String,
    qesAnswer: String,
    qesimg: String
});

question.plugin(autoIncrement.plugin,{ 
    model : 'question',
    field : 'qesnum',
    startAt : 1, 
    increment : 1
});

const Question = connection.model('question',question);

question.statics.findoneqes = function (qesname) {
    return this.findOne({
        qesname,
    }).exec();
}

question.statics.create = function (level, qesname, qesContent, qesAnswer, qesimg) {
    if(qesimg) {
        const question = new this({
            level, 
            qesname,
            qesContent,
            qesAnswer,
            qesimg
        });

        return question.save();
    } else {
        const question = new this({
            level, 
            qesname,
            qesContent,
            qesAnswer
        });

        return question.save();
    }

    
}

module.exports = mongoose.model('question', question);