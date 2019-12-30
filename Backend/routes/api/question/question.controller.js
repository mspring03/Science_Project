const question = require('../../../models/question');
const qesarray = require('../../../models/qesarray');
var chooseArray = new Array();

const callarray = (req, res) => {
    const level = req.body.level;
    
    const sufflerandom = (quesarray) => {
        var ar = new Array();
        var temp;
        var rnum;
        
        for(var i=0; i<quesarray.questionId.length; i++){
            ar.push(i);
        }
 
        for(var i=0; i< ar.length ; i++)
        {
            rnum = Math.floor(Math.random() *quesarray.questionId.length);
            temp = ar[i];
            ar[i] = ar[rnum];
            ar[rnum] = temp;
        }

        for(var i=0; i<10; i++){
            const inputTmp = question.findoneqes(quesarray.questionId[ar[i]])
            inputTmp.then((input) => {
                chooseArray.push({
                    "level": input.level,
                    "qesname": input.qesname,
                    "qesContent": input.qesContent,
                    "qesAnswer": input.qesAnswer
                });
            });
        }
    }

    const response = () => {
        res.status(200).json({
            message: '문제 전송',
            chooseArray
        });
    }

    const error = (err) => {
        res.status(409).json({ message: err.message });
    }

    qesarray.findLevelArray(level)
    .then(sufflerandom)
    .then(response)
    .catch(error)
}

module.exports = {
    callarray,
}