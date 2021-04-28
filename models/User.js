var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{
    async findAll(){
        try{
            var result = await knex.select(["id", "email", "role", "nome"]).table("users")
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id", "email", "role", "nome"]).where({id: id}).table("users");
            if(result.length > 0){
                return result[0]
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err)
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id", "email", "role", "nome"]).where({email: email}).table("users");
            if(result.length > 0){
                return result[0]
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async new(email, password, nome){
        try{
           var hash = await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, nome, role: 0}).table("users")
        }catch(error){
            console.log(error)
        }
    }

    // Pesquisando na tabela de email se já existe um email cadastrado no banco
    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email})
                if(result.length > 0){
                    return true;
                }else{
                    return false;
                }

            }catch(err){
                console.log(err);
                return false;
        }
    }

    async update(id, email, nome, role){

       var user = await this.findById(id);

       if(user != undefined){
            var editUser = {};

            if(email != undefined){
                if(email != user.email){
                    var result = await this.findEmail(email);
                    if(result == false){
                        editUser.email = email;
                    }else{
                        return{status: false, err: "O e-mail já está cadastrado!"}
                    }
                }
            }

            if(nome != undefined){
                editUser.nome = nome;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try{
               await knex.update(editUser).where({id: id}).table("users");
               return {status: true}
            }catch(err){
                return{status: false, err: err}
            }

       }else{
           return{status: false, err: "Usuário não existe!"}
       }
    }

    async delete(id){
        var user = await this.findById(id);
        if(user != undefined){
            try{
                await knex.delete().where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O usuário não existe, impossivel ser deletado."}
        }
    }

    async ChangePassword(newPassword, id, token){
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({password: hash}).where({id: id}).table("users");
    }
}

module.exports = new User();