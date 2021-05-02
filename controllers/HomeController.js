class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }

    async validate(req, res){
        res.send('Okay, usuário validado.')
    }
}

module.exports = new HomeController();