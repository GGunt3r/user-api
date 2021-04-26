var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{
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
}

module.exports = new User();