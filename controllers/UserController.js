var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "Pk{lswUw~B2wK$VxUZjdk:NMCG<x6TiB.%YS=ha-mIrA?kIZ{G]&"

class UserController{

    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
       var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res){
        
        var {email, nome, password} = req.body;
        if(email == undefined || email == '' || email == ' '){
            res.status(400);
            res.json({err: "O e-mail é inválido ou não foi encontrado, tente novamente."});
            return;
        }

        if(nome == undefined){
            res.status(400);
            res.json({err: "Nome indefinido ou não foi preenchido, tente novamente."});
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já foi cadastrado!"});
        }

        
        await User.new(email, password, nome);

        res.status(200);
        res.send("Tudo ok, cadastro realizado com sucesso!");
    }

    async edit(req, res){
        var {id, nome, role, email} = req.body;
        var result = await User.update(id, email, nome, role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send('Tudo ok!');
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send('Ocorreu um erro no servidor!');
        }
    }

    async remove(req, res){
        var id = req.params.id;

        var result = await User.delete(id);
        if(result.status){
            res.status(200);
            res.send('Usuário deletado com sucesso!');
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);
        if(result.status){
            res.status(200);
            res.send("" + result.token);
        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async ChangePassword(req, res){
        var token = req.body.token;
        var password = req.body.password;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
           await User.ChangePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
            res.status(200);
            res.send('Senha alterada com sucesso!')
        }else{
            res.status(406);
            res.send('Token inválido ou já utilizado!');
        }
    }

    async login(req, res){
        var {email, password} = req.body;

        var user = await User.findByEmail(email);
        if(user != undefined){
           var resultado = await bcrypt.compare(password, user.password);
        
            if(resultado){
                var token = jwt.sign({email: user.email, role: user.role}, secret);
                res.status(200);
                res.json({token: token});
            }else{
                res.status(406);
                res.json({err: 'Senha incorreta!'});
            }
        }else{
            res.status(406);
            res.json({status: false, err: 'Usuário inexistente.'});
        }
    }
}

module.exports = new UserController();