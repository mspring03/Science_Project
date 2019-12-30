const Question = require('../../../models/question');
const Qesarray = require('../../../models/qesarray');

const uploadFile = (req, res, next) => {
    const { level, qesname, qesContent, qesAnswer } = req.body; 
    var file;

    if( req.file !== undefined) { file = req.file.originalname; }
    
    const create = (question) => {
        if (!question) {
            return Question.create(level, qesname, qesContent, qesAnswer, file);
            
        } else {
            throw new Error('이미 있는 문제 이름');
        }
    }

    const response = () => {
        next();
    }

    const error = (err) => {
        res.status(409).json({ message: err.message });
    }

    Question.findoneqes(qesname)
    .then(create)
    .then(response)
    .catch(error)
}

const saveArray = (req, res) => {
    const { level, qesname } = req.body;

    console.log(level, qesname);
    const pushid = (quesdb) => {
        quesdb.questionId.push(qesname);
        quesdb.save();
    }

    const response = () => {
        res.status(200).json({
            message: '문제 생성 성공',
        }).end();
    }

    const error = (err) => {
        res.status(409).json({
            message: err.message,
        });
    }
    
    Qesarray.findLevelArray(level)
    .then(pushid)
    .then(response)
    .catch(error)
}

const addarray = (req, res) => {
    const level = req.body.level;
    Qesarray.add(level);
    res.status(200).json({
        message: '성공',
    }).end();
}

module.exports = {
    uploadFile,
    saveArray,
    addarray
}