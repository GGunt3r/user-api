var bodyParser = require('body-parser')
var express = require("express")
var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/",router);

/*process.on('unhandledRejection', (reason, promise) => {{
    console.log(reason);
}});*/

app.listen(3000,() => {
    console.log("Servidor rodando")
});
