const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

const register = (req, res) => {
    const { id, password, nick } = req.body;

    const create = (user) => {
        if(user){
            throw new Error("회원가입 실패(이미 있는 아이디.)");
        } else{
            return User.create(id, password, nick);
        }
    }

    const respone = () => {
        res.status(200).json({ 
            message: '회원가입 성공',
        }).end();
    }

    const catcherror = (error) => {
        res.status(409).json({
            message: error.message,
        });
    }

    User.findoneid(id)
    .then(create)
    .then(respone)
    .catch(catcherror)
}

const login = (req, res) => {
    const { id, password } = req.body;
    const secret = req.app.get('jwt-secret');

    const cheak = (user) => {
        if(!user){
            throw new Error("로그인 실패1");
        } else{
            if(user.password === password){
                const p = new Promise((resolve, reject) => {
                    jwt.sign({
                        id: user.id,
                        nick: user.nick,
                    },
                    secret,
                    {
                        expiresIn: '12h',
                    }, (err, token) => {
                        if (err) reject(err);
                        resolve(token);
                    });
                });
                return p;
            } else {
                throw new Error('로그인 실패2');
            }
        }
    }

    const respone = (token) => {
        res.status(200).json({
            message: '로그인성공',
            token,
        }).end();
    }

    const catcherror = (error) => {
        res.status(403).json({
            message: error.message,
        }).end();
    }

    User.findoneid(id)
    .then(cheak)
    .then(respone)
    .catch(catcherror)
}

module.exports = {
    register,
    login,
}