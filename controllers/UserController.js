var User = require("../models/User");
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
        console.log(req.body);
        var {email, nome, password} = req.body;

        if(email == undefined){
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
}

module.exports = new UserController();