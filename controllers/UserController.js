var User = require("../models/User");
class UserController{

    async index(req, res){
        // Esta vazio por hora
    }

    async create(req, res){
        console.log(req.body);
        var {email, nome, password} = req.body;

        if(email == undefined){
            res.status(400);
            res.json({err: "O e-mail é inválido ou não foi encontrado, tente novamente."})
            return;
        }

        if(nome == undefined){
            res.status(400);
            res.json({err: "Nome indefinido ou não foi preenchido, tente novamente."})
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406)
            res.json({err: "O e-mail já foi cadastrado!"})
        }

        
        await User.new(email, password, nome);

        res.status(200);
        res.send('Tudo ok, cadastro realizado com sucesso!');
    }
}

module.exports = new UserController();